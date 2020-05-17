import * as constants from "./constants";

export function toggleToResumeModal(status) {
  return {
    type: constants.TOGGLE_TO_RESUME_MODAL,
    status,
  };
}

export function toggleToResumeModalSuccess(status) {
  return {
    type: constants.TOGGLE_TO_RESUME_MODAL_SUCCESS,
    status,
  };
}
