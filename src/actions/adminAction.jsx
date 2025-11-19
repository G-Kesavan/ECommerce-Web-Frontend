import axios from "axios";
import {
  createNewFail,
  createNewRequest,
  createNewSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  getAllOrdersFail,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllProductsFail,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  getReviewsFail,
  getReviewsRequest,
  getReviewsSuccess,
  getSingleUserFail,
  getSingleUserRequest,
  getSingleUserSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateSingleUserFail,
  updateSingleUserRequest,
  updateSingleUserSuccess,
} from "../slices/adminSlices";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    const { data } = await axios.get("/api/products/admin/get-all-product");
    dispatch(getAllProductsSuccess(data));
  } catch (error) {
    dispatch(getAllProductsFail(error.response.data.message));
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const { data } = await axios.get("/api/auth/admin/get-all-users");
    dispatch(getAllUsersSuccess(data));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(getAllOrdersRequest());
    const { data } = await axios.get("/api/order/admin/all-orders");
    dispatch(getAllOrdersSuccess(data));
  } catch (error) {
    dispatch(getAllOrdersFail(error.response.data.message));
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    dispatch(createNewRequest());
    const { data } = await axios.post(
      "/api/products/admin/create-product",
      productData,
      config
    );
    dispatch(createNewSuccess(data));
  } catch (error) {
    dispatch(createNewFail(error.response.data.message));
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    dispatch(updateProductRequest());
    const { data } = await axios.put(
      `/api/products/admin/product/${productId}`,
      productData,
      config
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(
      `/api/products/admin/product/${productId}`
    );
    dispatch(deleteProductSuccess(data));
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axios.delete(
      `/api/order/admin/delete-order/${orderId}`
    );
    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

export const getSingleUser = (userId) => async (dispatch) => {
  try {
    dispatch(getSingleUserRequest());
    const { data } = await axios.get(`/api/auth/admin/user/${userId}`);
    dispatch(getSingleUserSuccess(data));
  } catch (error) {
    dispatch(getSingleUserFail(error.response.data.message));
  }
};

export const deleteSingleUser = (userId) => async (dispatch) => {
  try {
    dispatch(getSingleUserRequest());
    const { data } = await axios.delete(`/api/auth/admin/user/${userId}`);
    dispatch(getSingleUserSuccess(data));
  } catch (error) {
    dispatch(getSingleUserFail(error.response.data.message));
  }
};

export const updateSingleUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch(updateSingleUserRequest());
    const { data } = await axios.put(
      `/api/auth/admin/user/${userId}`,
      userData
    );
    dispatch(updateSingleUserSuccess(data));
  } catch (error) {
    dispatch(updateSingleUserFail(error.response.data.message));
  }
};

export const updateOrder = (orderId, orderStatus) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axios.put(
      `/api/order/admin/update-order/${orderId}`,
      { orderStatus }
    );
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};

export const getReviews = (productId) => async (dispatch) => {
  try {
    dispatch(getReviewsRequest());
    const { data } = await axios.get(
      `/api/products/admin/reviews?productId=${productId}`
    );
    dispatch(getReviewsSuccess(data));
  } catch (error) {
    dispatch(getReviewsFail(error.response.data.message));
  }
};

export const deleteReviews = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    const { data } = await axios.delete(
      `/api/products/admin/reviews?productId=${productId}&reviewId=${reviewId}`
    );
    dispatch(deleteReviewSuccess(data));
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};
