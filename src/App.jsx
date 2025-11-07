import React, { useEffect } from "react";
import "./app.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProductDetials from "./Components/Products/ProductDetails";
import { toast, ToastContainer } from "react-toastify";
import SearchProduct from "./Components/Products/SearchProduct";
import LoginPage from "./Components/User/LoginPage";
import Register from "./Components/User/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  clearAuthMessage,
  loadUserData,
} from "./actions/userAction";
import ChangePassword from "./Components/User/ChangePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Cart from "./Components/Products/Cart";

const App = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(loadUserData());

    if (error) {
      toast.dismiss();
      toast.error(error, { position: "bottom-center" });
      dispatch(clearAuthError());
    }

    if (message) {
      toast.dismiss();
      toast.success(message, { position: "bottom-center" });
      dispatch(clearAuthMessage());
    }
  }, [dispatch, message, error]);

  return (
    <Router>
      <div>
        <HelmetProvider>
          <Header />
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetials />} />
            <Route path="/search/:keyword" element={<SearchProduct />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:token" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
};

export default App;
