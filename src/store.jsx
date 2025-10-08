import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // note: no curly braces
import productsReducer from './slices/productsSlices'
import productReducer from './slices/productSlices'

const reducer = combineReducers({
  productsState : productsReducer,
  productState : productReducer
})

const store = configureStore({
  reducer,
});

export default store;
