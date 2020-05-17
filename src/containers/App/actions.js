import * as constants from "./constants";

export function login(requestData) {
  return {
    type: constants.LOGIN,
    requestData,
  };
}

export function loginSuccess(payload) {
  return {
    type: constants.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailed() {
  return {
    type: constants.LOGIN_FAILED,
  };
}
