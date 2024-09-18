import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { toast } from "react-toastify";
import { Product } from "../variables";
export const getProductDetail =({productId}) => async(dispatch) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/home/view-a-product/${productId}`); 
        console.log(data)
        dispatch({type: Product.SET_FILTER_PRODUCT_DETAIL, payload: data})
        
    } catch (error) {
        dispatch({type: Product.SET_FILTER_PRODUCT_DETAIL, error: error})
        
    }
    
};


export const getAllProductWithFilter =(req) => async(dispatch) => {
    try {
        console.log(req.sortCode)
        const {data} = await axios.get(`${API_BASE_URL}/home/filter?${req.titleProduct!="" ? `titleProduct=${req?.titleProduct}&` : ""}${req.categoryName!="" ? `categoryName=${req?.categoryName}&` : ""}sortCode=${req?.sortCode}`); 
        dispatch({type: Product.GET_ALL_PRODUCT_BY_FILTER, payload: data})
        
    } catch (error) {
        dispatch({type: Product.GET_ALL_PRODUCT_BY_FILTER, error: error})
        console.log(error)
        
    }
}