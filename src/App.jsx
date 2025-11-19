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
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import PaymentSuccess from "./Components/Cart/PaymentSuccess";
import OrderDetails from "./Components/Order/OrderDetails";
import MyOrder from "./Components/Order/MyOrder";
import { clearProductMessage } from "./actions/productsAction";
import Dashboard from "./Components/Admin/Dashboard";
import AdminRoute from "./utils/AdminRoute";
import AllProducts from "./Components/Admin/AllProducts";
import AllOrders from "./Components/Admin/AllOrders";
import CreateProduct from "./Components/Admin/CreateProduct";
import AllUsers from "./Components/Admin/AllUsers";
import Reviews from "./Components/Admin/Reviews";
import UpdateOrder from "./Components/Admin/UpdateOrder";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import UpdateUser from "./Components/Admin/UpdateUser";

const App = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);
  const { error: productError, message: productMessage } = useSelector(
    (state) => state.productState
  );

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    if (error || productError) {
      toast.error(error || productError, { position: "bottom-center" });
      dispatch(clearAuthError());
    }

    if (message || productMessage) {
      toast.success(message || productMessage, { position: "bottom-center" });
      if (productError) dispatch(clearProductMessage());
      dispatch(clearAuthMessage());
    }
  }, [dispatch, message, error, productMessage, productError]);

  return (
    <Router>
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
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AllProducts />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Orders"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AllOrders />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Users"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-product"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-orders/:orderId"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <UpdateOrder />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-product/:productId"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-user/:userId"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <UpdateUser />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Reviews />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping-details"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm-order"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-order"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-details/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
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
    </Router>
  );
};

export default App;
