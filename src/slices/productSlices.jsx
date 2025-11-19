import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
  },
  reducers: {
    productRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    productSuccess(state, action) {
      return {
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    createReviweRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviweSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    createReviweFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearMessage(state) {
      return {
        ...state,
        loading: false,
        message: undefined,
      };
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  createReviweFail,
  createReviweRequest,
  createReviweSuccess,
  clearMessage,
} = actions;

export default reducer;
