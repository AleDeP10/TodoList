loadAppConfig()
  .then(() => {
    console.log("[APP]", "✔️ Config inizializzata:", window.AppConfig);

    // Assicurati che ENV venga passato (es. in configureStore)
    window.store = configureStore(window.AppConfig.ENV);

    // Bootstrap manuale AngularJS solo ora
    angular.bootstrap(document, ["todoApp"]); // sostituisci con il tuo modulo root
  })
  .catch((err) => {
    console.error(
      "❌ Errore nel caricamento della configurazione:",
      err
    );
    document.body.innerHTML = `
    <div class="alert alert-danger m-5" role="alert">
      Errore durante il caricamento delle configurazioni. Controlla <code>config.json</code>.
    </div>
  `;
  });
