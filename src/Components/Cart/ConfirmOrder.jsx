import React, { Fragment, useEffect } from "react";
import { isShippingValid } from "../../utils/IsShippingValied";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createOrder } from "../../actions/orderAction";
import CartStepper from "./CartStepper";
import { deleteCartAllItem } from "../../slices/cartSlices";
import MetaData from "../../utils/MetaData";
const razorpay_key_id = import.meta.env.VITE_RAZORPAY_KEY_ID;
const backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { shippingInfo, items } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.authState);
  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = (subTotal / 100) * 0.5;
  const totalPrice = subTotal + tax;
  const shippingPrice = subTotal > 200 ? 0 : 25;
  const navigate = useNavigate();
  useEffect(() => {
    isShippingValid(shippingInfo, navigate);
  });

  const handlePayment = async () => {
    const { data: order } = await axios.post(backend_url+"/api/payment/create-order", {
      amount: Math.round(totalPrice),
    });

    const options = {
      key: razorpay_key_id,
      amount: order.amount,
      currency: order.currency,
      name: "EMarket",
      description: "Order payment",
      image: "/images/logo.png",
      order_id: order.id,
      handler: async function (response) {
        const { data } = await axios.post(backend_url+"/api/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        if (data.status === "success") {
          console.log(data);

          const paymentInfo = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          };
          dispatch(
            createOrder(
              shippingInfo,
              items,
              subTotal,
              tax,
              shippingPrice,
              totalPrice,
              paymentInfo
            )
          );
          dispatch(deleteCartAllItem());
          navigate("/payment-success");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phonNo,
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <MetaData title={"Confirm Order"} />
      <CartStepper activeStep={2} handlePayment={handlePayment} />
      <div className="container container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phonNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.postCode}, ${shippingInfo.country}, `}{" "}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            <br />
            <div className="cart-item my-1">
              <div className="row">
                {items.map((item) => (
                  <Fragment key={item._id}>
                    <div className="col-4 col-lg-2">
                      <img
                        className="w-[120px] h-[100px] object-fill object-center"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item._id}`}>
                        {item.name + " "}
                        /with No Cost EMI/Additional Exchange Offers
                      </Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p className="text-nowrap">
                        {item.quantity} x {"₹" + item.price} ={" "}
                        <b>{"₹" + item.price * item.quantity}</b>
                      </p>
                    </div>
                    <hr className="w-full" />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">₹ {subTotal}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">
                  {`₹ ${subTotal > 200 ? 0 : 25}`}
                </span>
              </p>
              <p>
                Tax:{" "}
                <span className="order-summary-values">{`₹ ${tax.toFixed(
                  2
                )}`}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">{`₹ ${totalPrice.toFixed(
                  2
                )}`}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={handlePayment}
                className="btn btn-primary btn-block"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
