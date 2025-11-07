import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { passwordReset } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../utils/MetaData";

const ChangeNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.authState);

  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordReset(password, confirmPassword, token));
  };

  useEffect(() => {
    if (message) {
      navigate("/");
    }
  }, [message, navigate]);
  return (
    <div className="container-container-fluid">
      <MetaData title={"Reset password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeNewPassword;
