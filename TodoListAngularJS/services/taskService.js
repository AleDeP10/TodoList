window.registerTaskService = function (app) {
  app.service("TaskService", function ($http, AppConfig) {
    const API_BASE_URL = AppConfig.API_BASE_URL + "/task"; 

    this.getAll = function () {
      return $http.post(API_BASE_URL + "/filter", {});
    };

    this.filter = function (filters) {
      return $http.post(API_BASE_URL + "/filter", filters);
    };

    this.create = function (task) {
      return $http.post(API_BASE_URL, task); // POST puro all'endpoint /task
    };

    this.update = function (task) {
      return $http.put(`${API_BASE_URL}/${task.id}`, task);
    };

    this.delete = function (id) {
      return $http.delete(`${API_BASE_URL}/${id}`);
    };
  });
};
