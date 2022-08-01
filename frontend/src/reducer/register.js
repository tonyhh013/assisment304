import * as types from "../actions/";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: "",
  error: "",
  showModal: false
};

const fn = (state = initialState, action) => {
  switch (action.type) {
    /*
      successful response looks like { data:{
        msg: "registration successful"
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcwZGE3MDg0MGVlOWMzNmM3NWU4MTIiLCJpYXQiOjE1ODQ0NTQyNTYsImV4cCI6MTU4NDQ1Nzg1Nn0.oCnZWvSaUl8prEsulcSdDopdng3Qn9HwB-HQLXJvnuk"}
      }
    */
    case types.REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        isAuthenticated: true
      };
    case types.REGISTER_USER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        showModal: true
      };
    case types.REGISTER_USER_DEFAULT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: "",
        error: "",
        showModal: false
      };
    default:
      return state;
  }
};
export default fn;