import React from "react";
import SideBar from "./SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleOrder } from "../../actions/orderAction";
import Loader from "../../Components/Layout/Loader";
import { useState } from "react";
import { updateOrder } from "../../actions/adminAction";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const UpdateOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.ordersState);
  const [orderState, setOrderState] = useState("");
  const handleSubmit = async () => {
    await dispatch(updateOrder(orderId, orderState));
    toast.success("Order is updated", { position: "bottom-center" });
  };
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order) {
      setOrderState(order.orderStatus);
    }
  }, [order]);

  return (
    <div className="row ">
      <MetaData title={"Admin update order"} />
      <SideBar />
      {order ? (
        <div className="container container-fluid col-12 col-md-9 ml-auto mr-auto">
          <div className="row d-flex justify-content-around m-1">
            <div className="col-12 col-lg-7 order-details">
              <h1 className="my-5">{order._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {order.user?.name || "User is Deleted"}
              </p>
              <p>
                <b>Phone:</b> {order.shippingInfo.phonNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.postCode} ${order.shippingInfo.country}`}
              </p>
              <p>
                <b>Amount:</b> ₹ {order.totalPrice.toFixed(2)}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className="greenColor">
                <b>{order.paymentInfo.paymentId ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Stripe ID</h4>
              <p className="greenColor">
                <b>{order.paymentInfo.orderId}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p className="greenColor">
                <b>{order.orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {order.orderItems?.map((item, i) => (
                  <div key={i} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={"/product/" + item.product}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>₹{item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} Piece{item.quantity > 1 ? "s" : null}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>

            <div className="col-12 col-lg-3 mt-5">
              <h4 className="my-4">Status</h4>

              <div className="form-group">
                <select
                  disabled={order?.orderStatus === "delivered" ? true : false}
                  className="form-control"
                  name="status"
                  value={orderState ? orderState : ""}
                  onChange={(e) => {
                    setOrderState(e.target.value);
                  }}
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UpdateOrder;
