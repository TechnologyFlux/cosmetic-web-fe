import { v4 as uuidv4 } from "uuid";

import {HomePage1, Product } from "../variables";

const initialState = {
    productDetail: null
};

export default function productReducer(state = initialState, action) {
  
  switch (action.type) {
    case Product.SET_FILTER_PRODUCT_DETAIL: 
        return {
            ...state,
            isLoading: false, 
            productDetail: action.payload,
            error: action.error
        }
    case Product.GET_ALL_PRODUCT_BY_FILTER:
        return {
            ...state,
            isLoading: false, 
            productData: action.payload,
            error: action.error
        }
    default:
      return state;
  }
}
