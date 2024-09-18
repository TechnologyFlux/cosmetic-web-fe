import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import { Address, HomePage1, Order } from "../variables";
import { toast } from "react-toastify";

export const createNewOrder = (req) => async (dispatch) => {
  try {
    console.log(req)
    const { data } = await axios.post(`${API_BASE_URL}/user/order/create`, req);
    toast.success("Order Successfully!");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Order Failure");
  }
};

export const getAllOrder = (userId) => async (dispatch) => {
  console.log(userId)

  try {
    const { data } = await axios.get(`${API_BASE_URL}/user/order/get-all/${userId}`);
    dispatch({ type: Order.GET_ALL_ORDER, payload: data });
  } catch (error) {
    dispatch({ type: Order.GET_ALL_ORDER, payload: error });
    console.log(error);
  }
};

export const getOrderDetail = (orderId) => async (dispatch) => {
  try { 
    console.log(orderId )
    const { data } = await axios.get(
      `${API_BASE_URL}/user/order/show-order-detail/${orderId}`
    );
    dispatch({ type: Order.GET_ORDER_DETAIL, payload: data });
  } catch (error) {
    dispatch({ type: Order.GET_ORDER_DETAIL, error: error });
    console.log(error);
  }
};


export const cancelOrder = async(orderId) =>  {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/user/order/update-status?orderId=${orderId}&status=Đơn hàng đã bị hủy.`);
    toast.success("Order Cancelled Successfully!");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Cancel Order Failure");
  }
}
