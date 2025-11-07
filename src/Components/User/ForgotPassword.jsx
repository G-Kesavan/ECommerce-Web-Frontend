import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotEmail } from "../../actions/userAction";
import MetaData from "../../utils/MetaData";

const ForgetPassword = () => {
  const { loading, message } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotEmail(email));
  };

  useEffect(() => {
    if (message) {
      navigate("/login");
    }
  }, [navigate, dispatch, message]);
  return (
    <div className="container-container-fluid">
      <MetaData title={"Forgot password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
