import * as types from "../actions/";

const initialState = {
  loading: false,
  success: false,
  error: "",
  showModal: false
};

const fn = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.PAYMENT_SUCCESS:
    return {
    ...state,
    loading: false,
    success: true
    };
    case types.PAYMENT_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
      };
    case types.PAYMENT_CLEAR:
      return {
        ...state,
        loading: false,
        success: false,
        error: "",
        showModal: false
      };
    default:
      return state;
  }
};
export default fn;