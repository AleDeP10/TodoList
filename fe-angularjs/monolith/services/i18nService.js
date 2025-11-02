window.registerI18nService = function (app) {
  app.service("I18nService", [
    "$http",
    function ($http) {
      const labels = {};
      let currentLang = null;

      function detectLang() {
        const saved = localStorage.getItem("lang");
        if (saved) return saved;

        const lang = navigator.language || navigator.userLanguage || "en";
        return lang.startsWith("it") ? "it" : "en";
      }

      function load(lang) {
        const langToLoad = lang || detectLang();
        currentLang = langToLoad;

        const langFile = "assets/i18n/" + langToLoad + ".json";
        console.log("🌐 Loading:", langFile);

        return $http.get(langFile).then((res) => {
          Object.keys(labels).forEach((k) => delete labels[k]);
          Object.assign(labels, res.data);
          console.log("✅ Labels reloaded:", labels);
        });
      }

      function getLabels() {
        return labels;
      }

      function t(key) {
        return labels[key] || key;
      }

      function getCurrentLang() {
        return currentLang;
      }

      return {
        load,
        getLabels,
        getCurrentLang,
        t,
      };
    },
  ]);
};
