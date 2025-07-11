window.configureStore = function () {

  const rootReducer = Redux.combineReducers({
    tasks: window.taskReducer
  });

  return Redux.createStore(
    rootReducer,
    Redux.applyMiddleware([window.reduxLogger])
  );
};
