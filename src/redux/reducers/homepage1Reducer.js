import { v4 as uuidv4 } from "uuid";

import {HomePage1 } from "../variables";

const initialState = {
    productHomepage1: null
};

export default function homepage1Reducer(state = initialState, action) {
  
  switch (action.type) {
    case HomePage1.SET_FILTER_PRODUCT_HOMEPAGE1: 
        return {
            ...state,
            isLoading: false, 
            productHomepage1: action.payload,
            error: action.error
        }
    default:
      return state;
  }
}
