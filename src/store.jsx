import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/productSlices";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlices";
import orderReducer from "./slices/OrderSlices";
import adminReducer from "./slices/adminSlices";

const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  ordersState: orderReducer,
  adminState: adminReducer,
});

const store = configureStore({
  reducer,
});

export default store;
