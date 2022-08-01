import { takeEvery,takeLatest,all } from "redux-saga/effects";
import registerSaga from "./registerSaga";
import loginSaga from "./loginSaga";
import CartSaga from "./cartSaga";
import OrderSaga from "./orderSaga";
//import AddCartSaga from "./cartSaga";
import * as types from "../actions";

export default function* watchEverything() {
  yield takeLatest(types.REGISTER_USER, registerSaga);
  yield all([loginSaga]);
  yield all([CartSaga]);
  yield all([OrderSaga]);
}
