window.registerUserService = function (app) {
  app.service("UserService", function ($http, AppConfig) {
    const API_URL = AppConfig.API_BASE_URL + "/user"; // Assicurati che API_URL sia definito in config.json

    this.getAll = function () {
      return $http.post(`${API_URL}/filter`, {});
    };
  });
};
