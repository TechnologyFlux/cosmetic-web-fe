import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import shopReducers from "./shopReducers";
import homepage1Reducer from "./homepage1Reducer";
import productReducer from "./productReducer";
import addressReducer from "./addressReducer";
import orderReducer from "./orderReducer";
const rootReducer = combineReducers({
  cartReducer,
  wishlistReducer,
  shopReducers,
  homepage1Reducer,
  productReducer,
  addressReducer,
  orderReducer
});

export default rootReducer;
