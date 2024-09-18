import { v4 as uuidv4 } from "uuid";
import { Address } from "../variables";


const initialState = {
    addressList: [],
    isLoading: true,
    error: null
};

export default function addressReducer(state = initialState, action) {
  
  switch (action.type) {
    case Address.GET_ALL_ADDRESS: 
        return {
            ...state,
            isLoading: false, 
            addressList: action.payload,
            error: action.error
        }
    default:
      return state;
  }
}
