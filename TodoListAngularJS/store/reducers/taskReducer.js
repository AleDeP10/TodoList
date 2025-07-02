/*
const initialState = {
  list: [],
  loading: false,
  error: null
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
*/
window.taskReducer = function (state = { list: [] }, action) {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
};

