import * as types from "../actions";
import { call, put, all,takeLatest } from 'redux-saga/effects';
import { paymentMiddleware} from "../middleware/orderMiddleware";
import {} from "../actions/actions";
import { getAuthToken } from "../utils/localstorage";

function* paymentRequestSaga(payload) {
    try {
        const localToken = getAuthToken();
        //const r = yield call(paymentMiddleware,payload,localToken);
        yield call(paymentMiddleware,payload,localToken);
        yield put({
            type: types.PAYMENT_SUCCESS,
            
          });
    } catch (error) {
        yield put({
            type: types.PAYMENT_ERROR,
            error: error.response.data
          });
    }
}

export default all([
  takeLatest(types.PAYMENT_REQUEST, paymentRequestSaga),
]);



