import { takeLatest, put } from "redux-saga/effects";
import * as constants from "./constants";
import * as actions from "./actions";

// sagas
function* onToggleToResumeModal(action) {
  try {
    yield put(actions.toggleToResumeModalSuccess(action.status));
  } catch (err) {}
}

export default function* saga() {
  yield takeLatest(constants.TOGGLE_TO_RESUME_MODAL, onToggleToResumeModal);
}
