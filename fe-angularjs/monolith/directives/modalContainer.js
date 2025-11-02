window.registerModalContainerDirective = function (app) {
  app.directive("modalContainer", function () {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        isVisible: "=",
        onConfirm: "&?",
        onCancel: "&?",
        autoFocus: "@?",
      },
      template: `
        <div class="modal-shell" ng-if="isVisible">
          <div class="modal-overlay" ng-click="cancel()"></div>
          <div class="modal-body" ng-transclude tabindex="-1"></div>
        </div>
      `,
      link: function (scope, element) {
        console.log("[modalContainer] Link initialized");

        try {
          const modalBody = element[0].querySelector(".modal-body");

          function escListener(e) {
            if (e.key === "Escape") {
              console.log("[modalContainer] ESC pressed, closing modal");
              scope.$apply(scope.cancel);
            }
          }

          scope.cancel = function () {
            console.log("[modalContainer] Cancel invoked");
            if (scope.onCancel) scope.onCancel();
            scope.isVisible = false;
          };

          scope.confirm = function () {
            console.log("[modalContainer] Confirm invoked");
            if (scope.onConfirm) scope.onConfirm();
            scope.isVisible = false;
          };

          scope.$watch("isVisible", function (visible) {
            console.log("[modalContainer] isVisible =", visible);

            if (visible) {
              if (scope.autoFocus === "true" && modalBody) {
                setTimeout(() => {
                  console.log("[modalContainer] Automatic focus");
                  modalBody.focus();
                }, 0);
              }
              document.addEventListener("keydown", escListener);
            } else {
              document.removeEventListener("keydown", escListener);
            }
          });
        } catch (err) {
          console.error("[modalContainer] Error in link function:", err);
        }
      },
    };
  });
};
