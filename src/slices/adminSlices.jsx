import { createSlice } from "@reduxjs/toolkit";

const adminSlices = createSlice({
  name: "admin",
  initialState: {
    loading: false,
  },
  reducers: {
    getAllProductsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getAllProductsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    },
    getAllProductsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getSingleUserRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getSingleUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    getSingleUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateSingleUserRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateSingleUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    updateSingleUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getAllUsersRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getAllUsersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    },
    getAllUsersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getAllOrdersRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getAllOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    },
    getAllOrdersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createNewRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    createNewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    createNewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateProductRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteProductRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        message: action.payload.message,
      };
    },
    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteUserRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserSuccess(state, action) {
      return {
        ...state,
        message: action.payload.message,
      };
    },
    deleteUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        message: action.payload.message,
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateOrderSuccess(state, action) {
      return {
        ...state,
        message: action.payload.message,
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getReviewsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getReviewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        reviews: action.payload.reviews,
      };
    },
    getReviewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteReviewRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = adminSlices;

export const {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  getAllProductsFail,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersFail,
  createNewFail,
  createNewSuccess,
  createNewRequest,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUserFail,
  updateSingleUserRequest,
  updateSingleUserSuccess,
  updateSingleUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  getReviewsRequest,
  getReviewsSuccess,
  getReviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} = actions;

export default reducer;
