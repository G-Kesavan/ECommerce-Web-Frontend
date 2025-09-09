import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // note: no curly braces
import productsReducer from './slices/productsSlices'

const reducer = combineReducers({
  productsState : productsReducer
})

const store = configureStore({
  reducer,
});

export default store;
