import { call, put,all,takeLatest } from "redux-saga/effects";
import {loginMiddleware,loginGoogleMiddleware} from "../middleware/loginMiddleware";
import * as types from "../actions";
import { setAuthToken } from "../utils/localstorage";
function* loginSaga(payload) {
  try {
    const response = yield call(loginMiddleware, payload);
    setAuthToken(response.data.token);
    yield put({
      type: types.LOGIN_USER_SUCCESS,
      user: response.data
    });
  } catch (error) {
    yield put({
      type: types.LOGIN_USER_ERROR,
      error: error.response.data
    });
  }
}
function* loginGoogleSaga(payload) {
  try {
    const response = yield call(loginGoogleMiddleware, payload);
    setAuthToken(response.data.token);
    yield put({
      type: types.LOGIN_USER_SUCCESS,
      user: response.data
    });
  } catch (error) {
    yield put({
      type: types.LOGIN_USER_ERROR,
      error: error.response.data
    });
  }
}
export default all([
  takeLatest(types.LOGIN_USER, loginSaga),
  //takeLatest(types.LOGIN_USER_GOOGLE, loginGoogleSaga),
]);
