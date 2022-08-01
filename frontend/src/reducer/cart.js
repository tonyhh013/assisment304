import * as types from "../actions/";
import produce from 'immer';
//import { type } from "@testing-library/user-event/dist/type";

const initialState = {
  products:{"items": [
      {
          "items": [
              
          ],
          "overItems": [

          ],
          "overstock": false
      }
  ],
    total: 0,
    loading: false,
    success: "",
    showModal: false,
    order:false,
    orderDetail:"",
    firstload:false
  }
};

const fn = (state = initialState, action) => {
  switch (action.type) {
    // case types.ADD_TO_CART:
    //   return produce(state, draft => {
    //     draft.products.push(action.cart);
    //   });
    case types.SET_CART_SUCCESS:
      return {
        ...state,
        products: action
      };
    case types.GET_CART:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CART_SUCCESS:
      return {
        ...state,
        products: action,
        total:action.items[0].total,
        showModal: action.items[0].overstock,
        loading: false,
        firstload:true
      };
    case types.ORDER_CART_SUCCESS:
      return {
        ...state,
        products: {"items": [
          {
              "items": [
                  
              ],
              "overitems": [
                  
              ],
              "overstock": false
          }
        ]},
        total:0,
        showModal: false,
        order: true,
        orderDetail: action.orderDetail
      };
    case types.ADD_TO_CART_SUCCESS:
      return produce(state, draft => {
        draft.products.items[0].items.push(action.product);
      });
      // return produce(state, draft => {
      //   const productIndex = draft.findIndex(
      //     product => product.id === action.id,
      //   );

      //   if (productIndex > -1) draft[productIndex].quantity = action.quantity;
      // });
    case types.ADD_TO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.CHANGE_TO_CART:
      return {
        ...state,
        loading: true
      };
    case types.CHANGE_TO_CART_SUCCESS:
      if (action.quantity <= 0) return state;
      return produce(state, draft => {
        const productIndex = draft.products.items[0].items.findIndex(
          product => product.id === action.id,
        );
        if (productIndex > -1) draft.products.items[0].items[productIndex].qty = action.quantity;
        if (action.typeaction === 'inc') {
          draft.total=draft.total+action.price;
        } else {
          draft.total=draft.total-action.price;
        }
      });
    case types.CHANGE_TO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.CLEAR_CART_ORDER:
    return {
      ...state,
      order: false,
    };
      
    case types.REMOVE_TO_CART_SUCCESS:
      return produce(state, draft => {
        draft.products.items[0].items.splice(action.index,1);
        draft.total=draft.total-action.price;
      });
    case types.DELETE_ALL_TO_CART_SUCCESS:
      return {
        ...state,
        products: {"items": [
          {
              "items": [
                  
              ],
              "overitems": [
                  
              ],
              "overstock": false
          }
        ]},
        total:0,
        showModal: false,
        order:false,
        orderDetail:"",
        firstload:false
      }
    default:
      return state;
  }
};

export default fn;