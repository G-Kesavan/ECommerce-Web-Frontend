import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInformation } from "../../actions/cartAction";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import CartStepper from "./CartStepper";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartState);
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [postCode, setPostCode] = useState(shippingInfo.postCode || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [phonNo, setPhonNo] = useState(shippingInfo.phonNo || "");
  const countryList = Object.values(countries);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInformation(address, city, state, postCode, country, phonNo)
    );
    navigate("/confirm-order");
  };
  return (
    <>
      <CartStepper activeSteps={1} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={onSubmit}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phonNo}
                onChange={(e) => {
                  setPhonNo(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postCode}
                onChange={(e) => {
                  setPostCode(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                defaultValue={country}
                required
              >
                <option value="">Select option</option>
                {countryList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="state_field">State</label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
