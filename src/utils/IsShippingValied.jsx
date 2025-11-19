import { toast } from "react-toastify";

export const isShippingValid = (shippingInfo, navigate) => {
  if (!shippingInfo.address) {
    toast.error("Please enter adderss..", { position: "bottom-center" });
    navigate("/shipping-details");
    return;
  }
  if (!shippingInfo.city) {
    toast.error("Please enter city..", { position: "bottom-center" });
    navigate("/shipping-details");
    return;
  }
  if (!shippingInfo.state) {
    toast.error("Please enter state..", { position: "bottom-center" });
    navigate("/shipping-details");
    return;
  }
  if (!shippingInfo.postCode) {
    toast.error("Please enter post code..", { position: "bottom-center" });
    navigate("/shipping-details");
    return;
  }
  if (!shippingInfo.country) {
    toast.error("Please enter country..", { position: "bottom-center" });
    navigate("/shipping-details");
    return;
  }
  if (!shippingInfo.phonNo) {
    toast.error("Please enter phone number..", { position: "bottom-center" });
    navigate("/shipping-details");
    return;
  }
};
