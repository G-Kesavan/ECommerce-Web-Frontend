import axios from "axios";
import {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  getMyOrderFail,
  getMyOrderRequest,
  getMyOrderSuccess,
  getSingleOrderFail,
  getSingleOrderRequest,
  getSingleOrderSuccess,
} from "../slices/OrderSlices";

export const createOrder =
  (
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
  ) =>
  async (dispatch) => {
    try {
      dispatch(createOrderRequest());
      const { data } = await axios.post(`/api/order/new-order`, {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
      });
      dispatch(createOrderSuccess(data));
    } catch (error) {
      dispatch(createOrderFail(error.response.data.message));
    }
  };
export const getMyOrder = () => async (dispatch) => {
  try {
    dispatch(getMyOrderRequest());
    const { data } = await axios.get(`/api/order/my-order`);
    dispatch(getMyOrderSuccess(data));
  } catch (error) {
    dispatch(getMyOrderFail(error.response.data.message));
  }
};

export const getSingleOrder = id => async (dispatch) => {
  try {
    dispatch(getSingleOrderRequest());
    const { data } = await axios.get(`/api/order/get-single-order/${id}`);
    dispatch(getSingleOrderSuccess(data));
  } catch (error) {
    dispatch(getSingleOrderFail(error.response.data.message));
  }
};

