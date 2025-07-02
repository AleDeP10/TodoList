window.configureStore = function (env = 'production') {
  const middleware = [];

  if (env === 'development') {
    middleware.push(window.reduxLogger); // supponendo logger globale
  }

  const rootReducer = Redux.combineReducers({
    tasks: window.taskReducer
  });

  return Redux.createStore(
    rootReducer,
    Redux.applyMiddleware(...middleware)
  );
};
