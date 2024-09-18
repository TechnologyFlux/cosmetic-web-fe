import { v4 as uuidv4 } from "uuid";

import { CART } from "../variables";

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART.GET_CART: 
        return {
            ...state,
            isLoading: false, 
            cart: action.payload,
            error: action.error
        }
    default:
      return state;
  }
}
