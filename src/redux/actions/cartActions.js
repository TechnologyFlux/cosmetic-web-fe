import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { CART } from "../variables";
import { toast } from "react-toastify";


export const getCartByCartId =(cartId) => async(dispatch) => {
    try {

        const {data} = await axios.get(`${API_BASE_URL}/user/cart/get-all/${cartId}`); 
        console.log(data)
        dispatch({type: CART.GET_CART, payload: data})
        
    } catch (error) {
        dispatch({type: CART.GET_CART, error: error})
        
    }
    
};

export const addToCart =(req) => async(dispatch) => {
  try {
      const {data} = await axios.post(`${API_BASE_URL}/user/cart/add-a-new-product`,req); 
      console.log(data)
      dispatch({type: CART.ADD_TO_CART, payload: data})
      toast.success("Added product successfully!")
      
  } catch (error) {
      dispatch({type: CART.ADD_TO_CART, error: error})
      toast.error("Adding failed products!")
      console.log(error)
      
  }
  
};


export const updateCart =(req) => async(dispatch) => {
  try {
      const {data} = await axios.put(`${API_BASE_URL}/user/cart/update-cart`,req); 
      console.log(data)
      dispatch({type: CART.UPDATE_CART, payload: data})
      toast.success("Update cart successful!")
      
  } catch (error) {
    console.log(error)

    dispatch({type: CART.UPDATE_CART, error: error})
      toast.error("Update cart failure!")
      
  }
  
};


export const removeFromCart =(productId, cartId) => async(dispatch) => {
  try {

      const {data} = await axios.delete(`${API_BASE_URL}/user/cart/delete-a-product?productId=${productId}&cartId=${cartId}`); 
      console.log(data)
      dispatch({type: CART.REMOVE_FROM_CART, payload: data})
      toast.success("Remove address from cart successful!")
      
  } catch (error) {
      dispatch({type: CART.REMOVE_FROM_CART, error: error})
        toast.error("Remove address from cart failured!")
  }
  
};


export const decreaseQuantityCart = ()=>{
    return null;
}

export const increaseQuantityCart = ()=>{  
    return null;
}


export const clearCart =(userId) => async(dispatch) =>{
    try {

        const {data} = await axios.post(`${API_BASE_URL}/user/cart/clear/${userId}`); 
        console.log(data)
        toast.success("Clear cart successfull!")
        
    } catch (error) {
          toast.error("Clear cart failure!")
    }
}