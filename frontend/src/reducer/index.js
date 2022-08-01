import { combineReducers } from "redux";
import registerReducer from "./register";
import loginReducer from "./login";
import cartReducer from "./cart";
import orderReducer from "./order";
const rootReducer = combineReducers({
  registerReducer,
  loginReducer,
  cartReducer,
  orderReducer
});

export default rootReducer;
