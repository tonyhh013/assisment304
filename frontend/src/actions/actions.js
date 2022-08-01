import * as types from "./index";

export const registerUser = user => {
  return {
    type: types.REGISTER_USER,
    user: user
  };
};
export const registerUserDefault= () => {
  return {
    type: types.REGISTER_USER_DEFAULT,
  };
};
export const loginUserGoogle = mail => {
  return {
    type: types.LOGIN_USER_GOOGLE,
    mail
  };
};
export const loginUser = (user) => {
  return {
    type: types.LOGIN_USER,
    user: user
  };
};

export const loginSetDefault = () => {
  return {
    type: types.LOGIN_SET_DEFAULT
  };
};
export const logoutUser = user => {
  return {
    type: types.LOGOUT_USER,
    user: user
  };
};

export const showHideModal = () => {
  return {
    type: types.SHOW_HIDE_MODAL
  };
};

export const setCart = data => ({
  type: types.SET_CART,
  products: data,
});
export const setCartSuccess = data => ({
  type: types.SET_CART_SUCCESS,
  products: data,
});
export const getCart = data => ({
  type: types.GET_CART,
  data: data,
});
export const orderCart = data => ({
  type: types.ORDER_CART,
  data: data,
});
export const orderCartSuccess = data => ({
  type: types.ORDER_CART_SUCCESS,
  orderDetail: data,
});
export const clearCartOrder = () => ({
  type: types.CLEAR_CART_ORDER,
});

export const addToCart = (product,qty,localToken) => ({
  type: types.ADD_TO_CART,
  cart:product,
  qty:qty,
  localToken:localToken,
});
export const addToCartSuccess = product => ({
  type: types.ADD_TO_CART_SUCCESS,
  product,
});
export const changeCartRequest = (typeaction,_id, quantity,price,localToken) => ({
  type: types.CHANGE_TO_CART,
  typeaction,
  _id,
  quantity,
  price,
  localToken:localToken,
});
export const changeCartRequestSuccess = (id, quantity,price,typeaction) => ({
  type: types.CHANGE_TO_CART_SUCCESS,
  id,
  quantity,
  price,
  typeaction,
});
export const removeCartRequest = (index,id,quantity,price) => ({
  type: types.REMOVE_TO_CART,
  index,
  id,
  quantity,
  price,
});
export const removeCartRequestSuccess = (index,price) => ({
  type: types.REMOVE_TO_CART_SUCCESS,
  index,
  price,
});
export const deleteAllCartRequest = (localToken) => ({
  type: types.DELETE_ALL_TO_CART,
  localToken:localToken,
});
export const deleteAllCartRequestSuccess = () => ({
  type: types.DELETE_ALL_TO_CART_SUCCESS,
  products:{"items": [
      {
        "items": [
            
        ]
      }
  ]}
});
export const paymentRequest = (address,amount,id,orderId) => ({
  type: types.PAYMENT_REQUEST,
  address,
  amount,
  id,
  orderId,
});

export const paymentClear = () => ({
  type: types.PAYMENT_CLEAR,
});
export const orderCartClear = () => ({
  type: types.ORDER_CART_CLEAR,
});