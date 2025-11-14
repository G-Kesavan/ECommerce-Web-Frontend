import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CartStepper = ({ activeStep, handlePayment }) => {
  const steps = [
    { to: "/shipping-details", step: "Shipping Details" },
    { to: "/confirm-order", step: "Confirm Order" },
  ];
  return (
    <Box className="w-full mt-5">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.step}>
            <Link to={step.to} style={{ textDecoration: "none" }}>
              <StepLabel>{step.step}</StepLabel>
            </Link>
          </Step>
        ))}
        <Step>
          <Link
            onClick={activeStep === 2 ? handlePayment : null}
            style={{ textDecoration: "none" }}
          >
            <StepLabel>Payment</StepLabel>
          </Link>
        </Step>
      </Stepper>
    </Box>
  );
};

export default CartStepper;
