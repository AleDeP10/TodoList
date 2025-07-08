const initialState = {
  list: []
};

window.taskReducer = function (state = initialState, action) {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
};

