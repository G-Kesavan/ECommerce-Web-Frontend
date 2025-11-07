import axios from "axios";
import {
  addCartItemFail,
  addCartItemRequest,
  addCartItemSuccess,
  decreaseQuantity,
  deleteCartItem,
  increaseQuantity,
} from "../slices/cartSlices";

export const addCartItems = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const { data } = await axios.get(`/api/products/product/${id}`);
    dispatch(
      addCartItemSuccess({
        _id: data.product._id,
        image: data.product.images[0].image,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        quantity,
      })
    );
  } catch (error) {
    dispatch(addCartItemFail(error.response.data.message));
  }
};

export const increasItemQuantity =
  (id, quantity, stock) => async (dispatch) => {
    dispatch(
      increaseQuantity({
        id: id,
        stock,
        quantity,
      })
    );
  };

export const decreasItemQuantity = (id, quantity) => async (dispatch) => {
  dispatch(
    decreaseQuantity({
      id: id,
      quantity,
    })
  );
};

export const deleteItem = (id) => async (dispatch) => {
  dispatch(
    deleteCartItem({
      id: id,
    })
  );
};
