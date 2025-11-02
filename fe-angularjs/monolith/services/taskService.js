window.registerTaskService = function (app) {
  app.service("TaskService", function ($http, AppConfig) {
    const API_URL = AppConfig.API_BASE_URL + "/task"; 

    this.getAll = function () {
      return $http.post(API_URL + "/filter", {});
    };

    this.filter = function (filters) {
      return $http.post(API_URL + "/filter", filters);
    };

    this.create = function (task) {
      return $http.post(API_URL, task);
    };

    this.update = function (task) {
      return $http.put(`${API_URL}/${task.id}`, task);
    };

    this.delete = function (id) {
      return $http.delete(`${API_URL}/${id}`);
    };
  });
};
