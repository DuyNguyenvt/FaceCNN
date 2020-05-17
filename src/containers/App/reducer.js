// reducers
import * as constants from "./constants";

const initState = {
  accessToken: undefined,
};

//! notice that reducer is only a function that return new state object
const appReducer = (state = initState, action) => {
  return produce(state, (newState) => {
    switch (action.type) {
      case constants.LOGIN:
        break;
      case constants.LOGIN_SUCCESS:
        newState.accessToken = action.payload;
        break;
      default:
        break;
    }
  });
};

const produce = (state, setState) => {
  const newState = { ...state };
  setState(newState);
  return {
    ...state,
    ...newState,
  };
};

export default appReducer;
