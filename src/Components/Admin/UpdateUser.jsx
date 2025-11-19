import React, { useEffect, useState } from "react";
import SideBar from "../Admin/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateSingleUser } from "../../actions/adminAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const UpdateUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.adminState);
  const { user: loginUser } = useSelector((state) => state.authState);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
      setUserRole(user.role);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { name: userName, email: userEmail, role: userRole };
    await dispatch(updateSingleUser(userId, userData));
    dispatch(getSingleUser(userId));
    toast.success("User date updated...", { position: "bottom-center" });
  };

  return (
    <div className="row ">
      <MetaData title={"Admin update user"} />
      <SideBar />
      <div className="container-container-fluid col-12 col-md-9 ml-auto mr-auto">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={onSubmit}>
              <h1 className="mt-2 mb-5">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role_field">Role</label>

                <select
                  id="role_field"
                  className="form-control"
                  name="role"
                  disabled={user?._id === loginUser._id ? true : false}
                  value={userRole}
                  onChange={(e) => {
                    setUserRole(e.target.value);
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
