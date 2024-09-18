import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { toast } from "react-toastify";

export async function loginUser(login) {
  try { 
    console.log(login)
    const {data} = await axios.post(`${API_BASE_URL}/api/auth/login`, login);
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
    toast.error(error)
  }
  
}

export async function registerUSer(login) {
  try { 
    console.log(login)
    const {data} = await axios.post(`${API_BASE_URL}/api/auth/signup`, login);
    return data;
  } catch (error) {
    toast.error(error)
  }
  
}

export const getUserById =(userId) => async(dispatch) => {
  try {

      const {data} = await axios.get(`${API_BASE_URL}/user/view-detail/${userId}`); 
      console.log(data)
      return data;
  } catch (error) {
      console.log(error)
      
  }
  
};

export const updateUser = (req) => async(dispatch) => {
  try {
      const {data} = await axios.put(`${API_BASE_URL}/user/update`, req);  
      toast.success("Update profile successful!")
      return data;
  }
  catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
  }
}

export async function createAProductReview(req) {
  try { 
    console.log(req)
    const newreq = {
        "productId": req?.product.productId,
        "orderId": req?.product.orderId,
        "content": req?.review,
        "productRating": req.rating
    }
    const {data} = await axios.post(`${API_BASE_URL}/user/review/create`, newreq);
    toast.success("Successful product reviews!")
    return data;
  } catch (error) {
    toast.success("You have rated the product!")
    toast.error(error)
  }
  
} 

export async function forgetPassword(mail){
  try { 
    console.log(mail)
    const {data} = await axios.post(`${API_BASE_URL}/api/auth/forget-password?email=${mail}`);
    toast.success("Check your email for new password")
  } catch (error) {
    console.log(error)
    toast.error(error)
  }
}

