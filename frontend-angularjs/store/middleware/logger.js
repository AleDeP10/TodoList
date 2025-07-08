window.loggerMiddleware = (store) => (next) => (action) => {
  const env = window.AppConfig?.ENV;
  const devMode = env === "development";

  if (devMode) {
    console.group(
      `📦 Action: %c${action.type}`,
      "color: steelblue; font-weight: bold;"
    );
    console.log("Prev state:", store.getState());
    console.log("Payload:", action.payload);
  }

  const result = next(action);

  if (devMode) {
    console.log("Next state:", store.getState());
    console.groupEnd();
  }

  return result;
};
