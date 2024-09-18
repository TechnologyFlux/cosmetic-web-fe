import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { Address, HomePage1 } from "../variables";
import { toast } from "react-toastify";


export const createNewAddress =(req) => async(dispatch) => {
    try {

        const {data} = await axios.post(`${API_BASE_URL}/user/address/create`,req); 
        toast.success("Add new address successful!")
        return data;
    } catch (error) {
        console.log(error)
        toast.error("Add new address failed!")
        
    }
    
};

export const getAllAddressByUserId = (userId) => async(dispatch) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/user/address/get-all?userId=${userId}`); 
        dispatch({type: Address.GET_ALL_ADDRESS, payload: data})
        
    } catch (error) {
        dispatch({type: Address.GET_ALL_ADDRESS, error: error})
    }
    
}

export const updateAdress = (req) => async(dispatch) => {
    try {
        const {data} = await axios.put(`${API_BASE_URL}/user/address/update`, req); 
        toast.success("Update address successful!")
        return data
    } catch (error) {
        toast.error("Update address failure!")
    }
    
}

export const deleteAddress = (id) => async(dispatch) => {
    try {
        const {data} = await axios.delete(`${API_BASE_URL}/user/address/delete/${id}`); 
        toast.success("Delete address successful!")
        return data
    } catch (error) {
        toast.error("Delete address failure!")
        console.log(error)        
    }
    
}

