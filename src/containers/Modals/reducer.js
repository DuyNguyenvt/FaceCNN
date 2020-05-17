// reducers
import * as constants from "./constants";

const initState = {
  isToResumeModalOpen: false,
};

//! notice that reducer is only a function that return new state object
const modalReducer = (state = initState, action) => {
  return produce(state, (newState) => {
    switch (action.type) {
      case constants.TOGGLE_TO_RESUME_MODAL_SUCCESS:
        newState.isToResumeModalOpen = action.status;
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

export default modalReducer;
