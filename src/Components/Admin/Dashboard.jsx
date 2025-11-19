import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getAllProducts,
  getAllUsers,
} from "../../actions/adminAction";
import { Link } from "react-router-dom";
import MetaData from "../../utils/MetaData";

const Dashboard = () => {
  const {
    products = [],
    users = [],
    orders = [],
  } = useSelector((state) => state.adminState);

  const outOfStock = products.reduce((acc, product) => {
    product.stock === 0 ? (acc = acc + 1) : null;
    return acc;
  }, 0);

  const totalAmount = orders.reduce((acc, order) => {
    acc = acc + order.totalPrice;
    return acc;
  }, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="row">
      <MetaData title={"Admin dashboard"} />
      <SideBar />
      <div className="col-12 col-md-9 ml-auto mr-auto">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount
                  <br /> <b>₹ {totalAmount.toFixed()}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pr-4">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Products
                  <br /> <b>{products.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/products"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Orders
                  <br /> <b>{orders.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/orders"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-info o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Users
                  <br /> <b>{users.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/users"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Out of Stock
                  <br /> <b>{outOfStock}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
