import { v4 as uuidv4 } from "uuid";

import { CART, Order } from "../variables";

const initialState = [];

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case Order.GET_ALL_ORDER: 
        return {
            ...state,
            isLoading: false, 
            orderList: action.payload,
            error: action.error
        }
    case Order.GET_ORDER_DETAIL:
        return {
            ...state,
            isLoading: false, 
            orderDetail: action.payload,
            error: action.error
        }
    case Order.CREATE_ORDER:
        return {
            ...state,
            isLoading: false, 
            order: action.payload,
            error: action.error
        }
    default:
      return state;
  }
}
