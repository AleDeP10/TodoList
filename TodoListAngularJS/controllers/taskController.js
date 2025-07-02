window.registerTaskController = function (app) {
  app.controller(
    "TaskController",
    function ($scope, $ngRedux, TaskService, UserService) {
      $scope.filterMode = "api"; // default mode
      $scope.filterModeToggle = false;

      const disconnect = $ngRedux.connect(
        (state) => ({ tasksCache: state.tasks.list }),
        { setTasks: (list) => ({ type: "SET_TASKS", payload: list }) }
      )($scope);

      $scope.$on("$destroy", disconnect);

      // Caricamento iniziale sempre! Serve in entrambi i casi
      TaskService.getAll()
        .then((response) => {
          $scope.setTasks(response.data); // Aggiorna Redux comunque

          if ($scope.filterMode === "api") {
            $scope.tasks = response.data; // popola anche la variabile locale
          }
        })
        .catch((error) => {
          console.error("Errore nel recupero dei task:", error);
        });

      // Funzione per aggiornare i task in Redux
      $scope.getVisibleTasks = () =>
        $scope.filterMode === "api" ? $scope.tasks : $scope.tasksCache;

      // Funzione per cambiare la modalità di filtro
      $scope.switchMode = function () {
        $scope.filterMode = $scope.filterModeToggle ? "client" : "api";
        $scope.activeFilters =
          $scope.filterMode === "api"
            ? $scope.apiFilters
            : $scope.clientFilters;
      };

      // Inizializza i filtri
      $scope.apiFilters = {};
      $scope.clientFilters = {};
      $scope.showFilterModal = false;

      // Inizializza activeFilters in base alla modalità di filtro
      $scope.activeFilters =
        $scope.filterMode === "api" ? $scope.apiFilters : $scope.clientFilters;

      // Funzione per gestire la modalità dei filtri
      $scope.toggleFilterMode = function () {
        $scope.filterModeToggle = !$scope.filterModeToggle;
        $scope.switchMode();
        // Risincronizza activeFilters con la modalità attuale
        $scope.activeFilters =
          $scope.filterMode === "api"
            ? $scope.apiFilters
            : $scope.clientFilters;
      };

      // Funzioni per gestire il pannello dei filtri
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
          // Siamo in modalità client: aggiorniamo i filtri locali
          $scope.clientFilters.stateFilter = selectedStatuses;
          // I task vengono filtrati tramite la funzione clientSideFilter
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
        return task.status === 'IN PROGRESS' ? 'in-progress' : task.status.toLowerCase();
      }

      $scope.modalTask = {
        status: "TODO",
      }; // task in editing

      $scope.openTaskModal = function (task) {
        // Disattiva il resto della pagina
        document.body
          .querySelectorAll("body > *:not(#taskModal):not(script)")
          .forEach((el) => {
            if (!el.hasAttribute("inert")) el.setAttribute("inert", "");
          });

        $scope.modalTask = task
          ? angular.copy(task) // ✏️ EDIT
          : { status: "TODO" }; // 🆕 CREA

        openModal("taskModal");
      };

      $scope.deleteTask = function (task) {
        if (!confirm(`Eliminare il task "${task.description}"?`)) return;

        TaskService.delete(task.id)
          .then(() => {
            const i = $scope.tasks.findIndex((t) => t.id === task.id);
            if (i !== -1) $scope.tasks.splice(i, 1);
            showToast("🗑 Task eliminato con successo!", "success");
          })
          .catch((err) => {
            console.error("Errore durante l'eliminazione:", err);
            showToast("Impossibile eliminare il task.", "danger");
          });
      };

      $scope.saveTask = function () {
        const task = angular.copy($scope.modalTask);

        if (task.id) {
          // 🔁 MODIFICA
          TaskService.update(task).then(() => {
            const i = $scope.tasks.findIndex((t) => t.id === task.id);
            if (i !== -1) {
              Object.assign($scope.tasks[i], {
                description: task.description,
                assigneeId: task.assigneeId,
                status: task.status,
              });
            }
            closeModal("taskModal");
            showToast("✅ Task aggiornato con successo");
          });
        } else {
          // 🆕 CREAZIONE
          TaskService.create(task).then((res) => {
            $scope.tasks.push(res.data);
            closeModal("taskModal"); // ✅ chiusura DOPO il salvataggio
            showToast("🆕 Task creato correttamente");
          });
        }
      };

      $scope.nextStatus = function (task) {
        const statusCycle = ["TODO", "IN PROGRESS", "DONE"];
        const currentIndex = statusCycle.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusCycle.length;

        const updatedStatus = statusCycle[nextIndex];

        // 🔁 Crea nuova copia solo per la chiamata API
        const updatedTask = angular.copy(task);
        updatedTask.status = updatedStatus;

        TaskService.update(updatedTask).then(() => {
          // ✅ Applica direttamente la modifica sul task nella lista
          task.status = updatedStatus;

          showToast(`📌 Stato aggiornato a ${updatedStatus}`, "info");
        });
      };

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
        true // deep watch! 👈 fondamentale per oggetti
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

      $scope.userMap = {}; // 👈 mappa utenti ID → nome

      UserService.getAll().then((res) => {
        $scope.assigneeList = res.data.map((u) => ({
          id: u.id,
          fullName: u.fullName,
        }));

        // Popoliamo la mappa lookup
        res.data.forEach((user) => {
          $scope.userMap[user.id] = user.fullName;
        });
      });
    }
  );
};
