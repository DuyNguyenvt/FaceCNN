import { takeLatest, put } from "redux-saga/effects";
import * as constants from "./constants";
import * as actions from "./actions";

// sagas
function* onLogin(action) {
  try {
    const accessToken = "abcdef123456";
    yield put(actions.loginSuccess(accessToken));
  } catch (err) {
    throw err;
  }
}

export default function* saga() {
  yield takeLatest(constants.LOGIN, onLogin);
}
