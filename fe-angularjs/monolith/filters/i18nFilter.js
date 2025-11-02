window.registerI18nFilter = function (app) {
  app.filter("t", function (I18nService) {
    return function (key) {
      return I18nService.t(key);
    };
  });
};