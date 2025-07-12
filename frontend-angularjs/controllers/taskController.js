window.registerTaskController = function (app) {
  app.controller(
    "TaskController",
    function ($scope, $ngRedux, TaskService, UserService, I18nService) {
      console.log("🎯 inizio controller");
      $scope.labels = {}; // live binding
      $scope.selectedLang = "en"; // default UI

      I18nService.load().then(() => {
        Object.assign($scope.labels, I18nService.getLabels());
        $scope.selectedLang = I18nService.getCurrentLang();
      });

      // ⚡ Dynamic language switch
      $scope.switchLang = function (lang) {
        I18nService.load(lang).then(() => {
          Object.assign($scope.labels, I18nService.getLabels());
          $scope.selectedLang = lang;
          localStorage.setItem("lang", lang);
          console.log("🌍 Language switched to", lang);
        });
      };

      $scope.debugAppTitle = I18nService.t("appTitle");

      $scope.filterMode = "api"; // default mode
      $scope.filterModeToggle = false;

      const disconnect = $ngRedux.connect(
        (state) => ({ tasksCache: state.tasks.list }),
        { setTasks: (list) => ({ type: "SET_TASKS", payload: list }) }
      )($scope);

      $scope.$on("$destroy", disconnect);

      // Initial load always! Needed in both cases
      TaskService.getAll()
        .then((response) => {
          $scope.setTasks(response.data); // Always update Redux

          if ($scope.filterMode === "api") {
            $scope.tasks = response.data; // also populate local variable
          }
        })
        .catch((error) => {
          console.error("Error retrieving tasks:", error);
        });

      // Function to get current tasks from Redux or API
      $scope.getVisibleTasks = () =>
        $scope.filterMode === "api" ? $scope.tasks : $scope.tasksCache;

      // Toggle filtering mode
      $scope.switchMode = function () {
        $scope.filterMode = $scope.filterModeToggle ? "client" : "api";
        $scope.activeFilters =
          $scope.filterMode === "api"
            ? $scope.apiFilters
            : $scope.clientFilters;
      };

      // Initialize filters
      $scope.apiFilters = {};
      $scope.clientFilters = {};
      $scope.showFilterModal = false;

      // Initialize activeFilters based on current mode
      $scope.activeFilters =
        $scope.filterMode === "api" ? $scope.apiFilters : $scope.clientFilters;

      // Toggle filter mode
      $scope.toggleFilterMode = function () {
        $scope.filterModeToggle = !$scope.filterModeToggle;
        $scope.switchMode();
        // Re-sync activeFilters with current mode
        $scope.activeFilters =
          $scope.filterMode === "api"
            ? $scope.apiFilters
            : $scope.clientFilters;
      };

      // Show/hide filter panel
      $scope.toggleFilterPanel = function () {
        $scope.activeFilters =
          $scope.filterMode === "api"
            ? $scope.apiFilters
            : $scope.clientFilters;

        $scope.showFilterPanel = !$scope.showFilterPanel;
      };

      $scope.openFilterPanel = function () {
        $scope.activeFilters =
          $scope.filterMode === "api"
            ? $scope.apiFilters
            : $scope.clientFilters;
        $scope.showFilterPanel = true;
      };

      $scope.applyFilters = function () {
        const map = $scope.activeFilters.statusMap || {};
        const selectedStatuses = Object.keys(map).filter((k) => map[k]);

        if ($scope.filterMode === "api") {
          $scope.apiFilters.stateFilter = selectedStatuses;

          TaskService.filter($scope.apiFilters).then((res) => {
            $scope.tasks = res.data;
          });
        } else {
          // Client-side mode: update local filters
          $scope.clientFilters.stateFilter = selectedStatuses;
          // Tasks will be filtered via clientSideFilter()
        }
      };

      $scope.clientSideFilter = function (task) {
        const f = $scope.clientFilters || {};

        const matchDesc =
          !f.description ||
          task.description.toLowerCase().includes(f.description.toLowerCase());
        const matchAssignee = !f.assigneeId || task.assigneeId == f.assigneeId;
        const matchStatus =
          !f.stateFilter ||
          f.stateFilter.length === 0 ||
          f.stateFilter.includes(task.status);

        return matchDesc && matchAssignee && matchStatus;
      };

      $scope.getFilteredTasks = function () {
        const tasks = $scope.getVisibleTasks();
        return $scope.filterMode === "client"
          ? tasks.filter($scope.clientSideFilter)
          : tasks;
      };

      $scope.cssStatus = function (task) {
        return task.status === "IN PROGRESS"
          ? "in-progress"
          : task.status.toLowerCase();
      };

      $scope.showTaskModal = false;
      $scope.showConfirmModal = false;

      $scope.modalTask = {
        status: "TODO",
      }; // current task in editing

      $scope.openTaskModal = function (task) {
        $scope.modalTask = task
          ? angular.copy(task) // ✏️ EDIT
          : { status: "TODO" }; // 🆕 CREATE
        $scope.showTaskModal = true;
      };

      $scope.clearTaskModal = function () {
        $scope.modalTask = { status: "TODO" };
        $scope.showTaskModal = false;
      };

      $scope.openConfirmModal = function (task) {
        $scope.modalTask = angular.copy(task);
        $scope.showConfirmModal = true;
      };

      $scope.cancelDelete = function () {
        $scope.showConfirmModal = false;
      };

      $scope.deleteTask = function () {
        TaskService.delete($scope.modalTask.id)
          .then(() => {
            const i = $scope.tasks.findIndex(
              (t) => t.id === $scope.modalTask.id
            );
            if (i !== -1) $scope.tasks.splice(i, 1);
            showToast(
              "🗑 " + $scope.labels["task.toast.delete.success"],
              "success"
            );
          })
          .catch((err) => {
            console.error("Error deleting task:", err);
            showToast($scope.labels["task.toast.delete.error"], "danger");
          });
        $scope.showConfirmModal = false;
      };

      $scope.saveTask = function () {
        const task = angular.copy($scope.modalTask);

        if (task.id) {
          // 🔁 UPDATE
          TaskService.update(task).then(() => {
            const i = $scope.tasks.findIndex((t) => t.id === task.id);
            if (i !== -1) {
              Object.assign($scope.tasks[i], {
                description: task.description,
                assigneeId: task.assigneeId,
                status: task.status,
              });
            }
            $scope.showTaskModal = false;
            showToast("✅ " + $scope.labels["task.toast.update.success"]);
          });
        } else {
          // 🆕 CREATE
          TaskService.create(task).then((res) => {
            $scope.tasks.push(res.data);
            $scope.showTaskModal = false;
            showToast("🆕 " + $scope.labels["task.toast.create.success"]);
          });
        }
      };

      $scope.nextStatus = function (task) {
        const statusCycle = ["TODO", "IN PROGRESS", "DONE"];
        const currentIndex = statusCycle.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusCycle.length;

        const updatedStatus = statusCycle[nextIndex];

        // 🔁 Create a copy only for API call
        const updatedTask = angular.copy(task);
        updatedTask.status = updatedStatus;

        TaskService.update(updatedTask).then(() => {
          // ✅ Apply change directly in task list
          task.status = updatedStatus;

          showToast(`📌 ${$scope.labels["task.toast.nextStatus.success"]} ${updatedStatus}`, "info");
        });
      };

      $scope.userMap = {}; // 👈 user ID → name lookup map

      UserService.getAll().then((res) => {
        $scope.assigneeList = res.data.map((u) => ({
          id: u.id,
          fullName: u.fullName,
        }));

        // Populate lookup map
        res.data.forEach((user) => {
          $scope.userMap[user.id] = user.fullName;
        });
      });
      console.log("🎯 fine controller");

      $scope.$watch(
        () => $scope.activeFilters.statusMap,
        function (map) {
          if (!map) return;

          const selectedStatuses = Object.keys(map).filter((k) => map[k]);

          if ($scope.filterMode === "api") {
            $scope.apiFilters.stateFilter = selectedStatuses;
          } else {
            $scope.clientFilters.stateFilter = selectedStatuses;
          }
        },
        true // deep watch! 👈 essential for objects
      );

      $scope.$watchGroup(
        ["activeFilters.description", "activeFilters.assigneeId"],
        function ([newDescription, newAssigneeId]) {
          if ($scope.filterMode === "api") {
            $scope.apiFilters.description = newDescription;
            $scope.apiFilters.assigneeId = newAssigneeId;
          } else {
            $scope.clientFilters.description = newDescription;
            $scope.clientFilters.assigneeId = newAssigneeId;
          }
        }
      );

      $scope.$watchGroup(
        [
          "activeFilters.description",
          "activeFilters.assigneeId",
          "activeFilters.stateFilter",
        ],
        function ([desc, assignee, stateFilter]) {
          if (desc || assignee || (stateFilter && stateFilter.length)) {
            console.log("Filter changed →", desc, assignee, stateFilter);
          }
        }
      );
    }
  );
};
