import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../../utils/MetaData";

const ChangePassword = () => {
  const { loading, message } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const [oldPassword, setOldPasword] = useState("");
  const [newPassword, setNewPasword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordChange(oldPassword, newPassword));
  };

  useEffect(() => {
    if (message) {
      navigate("/profile");
    }
  }, [navigate, dispatch, message]);

  return (
    <div className="container-container-fluid">
      <MetaData title={"Change password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handleSubmit} className="shadow-lg">
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => {
                  setOldPasword(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={(e) => {
                  setNewPasword(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
