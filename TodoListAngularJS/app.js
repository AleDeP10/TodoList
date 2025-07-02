fetch("config.json")
  .then((res) => res.json())
  .then((config) => {
    // 1. Definizione modulo AngularJS
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

    // 2. Servizi
    window.registerTaskService(app);
    window.registerUserService(app);

    // 3. Registra il controller separato
    window.registerTaskController(app);

    // 4. Avvio manuale dell’app
    angular.bootstrap(document, ["todoApp"]);
  })
  .catch((err) => {
    console.error("❌ Errore nel caricamento di config.json:", err);
    document.body.innerHTML = `
      <div class="alert alert-danger m-5" role="alert">
        Errore durante il caricamento delle configurazioni. Controlla <code>config.json</code>.
      </div>
    `;
  });
