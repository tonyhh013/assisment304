import * as types from "../actions";
import { toast } from 'react-toastify';
import { call, put, select, all,takeLatest,takeEvery } from 'redux-saga/effects';
import {cartMiddleware,orderMiddleware,addcart,updateCartQTY, removeCartId, deleteAllCart} from "../middleware/cartMiddleware";
import {getCatalogQTY} from "../middleware/catalogMiddleware";
import {addToCartSuccess,changeCartRequestSuccess,removeCartRequestSuccess,deleteAllCartRequestSuccess} from "../actions/actions";
import { getAuthToken } from "../utils/localstorage";
function* setCartSaga(payload) {
  try {
    yield put({
      type: types.SET_CART_SUCCESS,
      items: payload.products
    });
  } catch (error) {
    yield put({
      type: types.GET_CART_ERROR,
      error: error.response.data
    });
  }
}
function* getCartSaga(payload) {
  try {
    const response = yield call(cartMiddleware, payload);
    yield put({
      type: types.GET_CART_SUCCESS,
      items: response.data
    });


  } catch (error) {
    yield put({
      type: types.GET_CART_ERROR,
      items: [{}],
      error: error.response.data
    });
  }
}
function* orderCartSaga(payload) {
  try {
    const response = yield call(cartMiddleware, payload);
    if (response.data[0].overstock === false) {
      const orderResponse = yield call(orderMiddleware, payload);
      yield put({
        type: types.ORDER_CART_SUCCESS,
        orderDetail: orderResponse.data
      });
    } else {
      yield put({
        type: types.GET_CART_SUCCESS,
        items: response.data
      });
    }
    


  } catch (error) {
    yield put({
      type: types.GET_CART_ERROR,
      items: [{}],
      error: error.response.data
    });
  }
}
function* AddCartSaga(payload) {
  try {
        const localToken = getAuthToken();
        const existentProduct = yield select(({cartReducer})=>
          cartReducer.products.items[0].items.find(product => product.id === payload.cart._id),
        );
        //const product = yield call(api.get, `products/${id}`);
        const detail=[];
        detail.id=payload.cart.id;
        detail.name=payload.cart.name;
        detail.price=payload.cart.price;
        detail.stock=payload.cart.stock;
        detail.image=payload.cart.image;
        detail.desc=payload.cart.desc;
        const stock = (yield call(getCatalogQTY, payload.cart)).data.stock;
        if (payload.quantity > stock) {
          toast.error('Product out of stock');
          return;
        }

        if (existentProduct) {
          if ( existentProduct.qty + 1> stock) {
            toast.error('Product out of stock');
            return;
          }
          //const r = yield call(updateCartQTY,payload.cart,existentProduct.qty + 1,localToken);
          yield call(updateCartQTY,payload.cart,existentProduct.qty + 1,localToken);
          yield put(changeCartRequestSuccess(payload.cart._id, existentProduct.qty + 1));
        } else {
          if ( 1 > stock) {
            toast.error('Product out of stock');
            return;
          }
          //const r = yield call(addcart,payload.cart,localToken);
          yield call(addcart,payload.cart,localToken);
          yield put(addToCartSuccess({id:payload.cart._id,detail, qty: 1 }));
        }
  } catch (error) {
    yield put({
      type: types.LOGIN_USER_ERROR,
      error: error.response.data
    });
  }
}
function* changeQuantity(payload) {
  const localToken = getAuthToken();
  if (payload.quantity <= 0) return;
   const stock = (yield call(getCatalogQTY, payload)).data.stock;
  if (payload.quantity > stock) {
    toast.error('Product out of stock');
    return;
  }
  //const r = yield call(updateCartQTY,payload,payload.quantity,localToken);
  yield call(updateCartQTY,payload,payload.quantity,localToken);
  yield put(changeCartRequestSuccess(payload._id, payload.quantity,payload.price,payload.typeaction));
}
function* removeCartRequest(payload) {
  const localToken = getAuthToken();
  //const r = yield call(removeCartId,payload,localToken);
  yield call(removeCartId,payload,localToken);
  yield put(removeCartRequestSuccess(payload.index,payload.price));
}
function* deleteAllCartRequest(payload) {
  const localToken = getAuthToken();
  //const r = yield call(deleteAllCart,payload,localToken);
  yield call(deleteAllCart,payload,localToken);
  yield put(deleteAllCartRequestSuccess());
}

export default all([
  takeEvery(types.GET_CART, getCartSaga),
  takeLatest(types.ORDER_CART, orderCartSaga),
  takeLatest(types.ADD_TO_CART, AddCartSaga),
  takeLatest(types.SET_CART, setCartSaga),
  takeLatest(types.CHANGE_TO_CART, changeQuantity),
  takeLatest(types.REMOVE_TO_CART, removeCartRequest),
  takeLatest(types.DELETE_ALL_TO_CART, deleteAllCartRequest),
]);



