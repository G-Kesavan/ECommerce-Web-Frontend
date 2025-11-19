import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
  reducers: {
    saveShippingInfo(state, action) {
      const shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      return {
        ...state,
        loading: false,
        shippingInfo: shippingInfo,
      };
    },
    addCartItemRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;
      const isItemExist = state.items.find((i) => i._id === item._id);
      if (isItemExist) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          loading: false,
          items: [...state.items, item],
        };
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }

      return state;
    },
    addCartItemFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    increaseQuantity(state, action) {
      const stock = action.payload.stock;
      const quantity = action.payload.quantity;
      if (stock > quantity) {
        state.items = state.items.map((item) => {
          if (item._id === action.payload.id) {
            item.quantity = item.quantity + 1;
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    decreaseQuantity(state, action) {
      const quantity = action.payload.quantity;
      if (quantity != 1) {
        state.items = state.items.map((item) => {
          if (item._id === action.payload.id) {
            item.quantity = item.quantity - 1;
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    deleteCartItem(state, action) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    deleteCartAllItem(state) {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addCartItemFail,
  addCartItemRequest,
  addCartItemSuccess,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
  saveShippingInfo,
  deleteCartAllItem,
} = actions;

export default reducer;
