import * as types from "../actions/";

const initialState = {
  token: "",
  loading: false,
  success: "",
  error: "",
  showModal: false
};

const fn = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.user.token,
        loading: false,
        success: action.user.msg
      };
    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        showModal: true
      };
    case types.LOGIN_USER_GOOGLE:
      return {
        ...state,
        token:action.mail
      };
    case types.SHOW_HIDE_MODAL:
      return {
        ...state,
        showModal: false
      };
    case types.LOGIN_SET_DEFAULT:
      return {
        ...state,
        token: "",
        loading: false,
        success: "",
        error: "",
        showModal: false
      }
    default:
      return state;
  }
};
export default fn;
