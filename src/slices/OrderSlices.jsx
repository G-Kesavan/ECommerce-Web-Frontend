import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
  },
  reducers: {
    createOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state) {
      return {
        ...state,
        loading: false,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    },
    getMyOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getMyOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    },
    getMyOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    },
    getSingleOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getSingleOrderSuccess(state, action) {
      return {
        ...state,
        order: action.payload.order,
        loading: false,
      };
    },
    getSingleOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  getMyOrderFail,
  getMyOrderSuccess,
  getMyOrderRequest,
  getSingleOrderFail,
  getSingleOrderSuccess,
  getSingleOrderRequest
} = actions;

export default reducer;
