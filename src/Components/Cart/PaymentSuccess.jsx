import React from "react";
import { Link } from "react-router-dom";
import CartStepper from "./CartStepper";

const PaymentSuccess = () => {
  return (
    <>
      <CartStepper activeStep={3} />
      <div class="container container-fluid">
        <div class="row justify-content-center">
          <div class="col-6 mt-5 text-center">
            <img
              class="my-5 img-fluid d-block mx-auto bg-blue-950 p-2 rounded-2xl"
              src="/images/logo_use.png"
              alt="Order Success"
              width="200"
              height="200"
            />
            <h2>Your Order has been placed successfully.</h2>

            <Link to="/my-order">Go to Orders</Link>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default PaymentSuccess;
