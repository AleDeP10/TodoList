fetch("config.json")
  .then((res) => res.json())
  .then((config) => {
    console.log("📦 Config loaded:", config);

    const app = angular
      .module("todoApp", ["ngRedux"])
      .constant("AppConfig", config)
      .config(function ($ngReduxProvider) {
        const rootReducer = window.Redux.combineReducers({
          tasks: window.taskReducer,
        });

        const middleware = [window.loggerMiddleware];
        const enhancers = [];

        if (window.__REDUX_DEVTOOLS_EXTENSION__) {
          enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
        }

        $ngReduxProvider.createStoreWith(rootReducer, middleware, enhancers);
      });

    window.registerTaskService(app);
    window.registerUserService(app);
    window.registerI18nService(app);
    window.registerI18nFilter(app);
    window.registerTaskController(app);
    window.registerModalContainerDirective(app);

    const injector = angular.injector(["ng", "todoApp"]);

    injector.invoke([
      "$rootScope",
      "I18nService",
      function ($rootScope, I18nService) {
        $rootScope.labels = {};

        console.log("🌐 Loading language file...");
        I18nService.load()
          .then(() => {
            console.log("✅ Language loaded");

            // ✅ Bootstrap only after the DOM is ready
            const bootstrapApp = () => {
              //const appRoot = document.getElementById("appRoot");
              console.log("🚀 Bootstrapping Angular on #appRoot");
              //angular.bootstrap(appRoot, ["todoApp"]);
              angular.bootstrap(document.body, ["todoApp"]);
              console.log("✅ Bootstrap complete");
            };

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", bootstrapApp);
            } else {
              bootstrapApp();
            }
          })
          .catch((err) => {
            console.error("❌ Error loading language file:", err);
            document.body.innerHTML = `
              <div class="alert alert-danger m-5" role="alert">
                Failed to load language labels. Check <code>assets/i18n/</code>.
              </div>
            `;
          });
      },
    ]);
  })
  .catch((err) => {
    console.error("❌ Error loading config.json:", err);
    document.body.innerHTML = `
      <div class="alert alert-danger m-5" role="alert">
        Failed to load configuration. Check <code>config.json</code>.
      </div>
    `;
  });