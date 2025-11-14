import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlices";
import {
  clearMessage,
  createReviweFail,
  createReviweRequest,
  createReviweSuccess,
  productFail,
  productRequest,
  productSuccess,
} from "../slices/productSlices";

export const getProducts =
  (currentPage, keyword, price, category, rating) => async (dispatch) => {
    try {
      dispatch(productsRequest());
      let url = "/api/products/get-products?page=" + currentPage;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      if (price) {
        url += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      if (rating) {
        url += `&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(url);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`/api/products/product/${id}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};

export const createReviwe =
  (productId, rating, comment) => async (dispatch) => {
    try {
      dispatch(createReviweRequest());
      const { data } = await axios.put(`/api/products/review`, {
        productId,
        rating,
        comment,
      });
      dispatch(createReviweSuccess(data));
    } catch (error) {
      dispatch(createReviweFail(error.response.data.message));
    }
  };

export const clearProductMessage = () => async (dispatch) => {
  dispatch(clearMessage());
};
