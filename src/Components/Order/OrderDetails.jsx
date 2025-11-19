import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleOrder } from "../../actions/orderAction";
import MetaData from "../../utils/MetaData";

const OrderDetails = () => {
  const { order } = useSelector((state) => state.ordersState);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="container container-fluid">
      <MetaData title={"Order details"} />
      <div className="row d-flex justify-content-between">
        {order ? (
          <div className="col-12 col-lg-8 mt-5 order-details">
            <h1 className="my-5">Order # {order._id}</h1>

            <h4 className="mb-4">Shipping Info</h4>
            <p>
              <b>Name:</b> {order.user.name}
            </p>
            <p>
              <b>Phone:</b> {order.shippingInfo.phonNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>
              {" " + order.shippingInfo.address}, {order.shippingInfo.city},
              {" " + order.shippingInfo.state} - {order.shippingInfo.postCode}
            </p>
            <p>
              <b>Amount:</b> ₹ {order.totalPrice.toFixed(2)}
            </p>

            <hr />

            <h4 className="my-4">Payment</h4>
            <p className="greenColor">
              <b>{order.paymentInfo.paymentId ? "PAID" : "NOT PAID"}</b>
            </p>

            <h4 className="my-4">Order Status:</h4>
            <p className="greenColor">
              <b>{order.orderStatus}</b>
            </p>

            <h4 className="my-4">Order Items:</h4>

            <hr />
            {order.orderItems.map((item, i) => (
              <div className="cart-item my-1">
                <div key={i} className="row my-5">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>₹ {item.price}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} Piece{item.quantity > 1 ? "s" : null}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <hr />
          </div>
        ) : (
          <p>Order is empty</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
