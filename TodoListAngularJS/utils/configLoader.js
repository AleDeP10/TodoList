window.loadAppConfig = async function () {
  const response = await fetch('./config.json');
  if (!response.ok) {
    throw new Error(`Impossibile caricare config.json: ${response.statusText}`);
  }
  const config = await response.json();
  window.AppConfig = config;
};

