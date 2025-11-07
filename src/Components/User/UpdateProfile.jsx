import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthUpdate, editProfile } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../../utils/MetaData";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, update, user } = useSelector((state) => state.authState);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar ?? "/images/avater.jpg"
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("avatar", avatar);
    dispatch(editProfile(formData));
  };

  useEffect(() => {
    if (update) {
      dispatch(clearAuthUpdate());
      navigate("/profile");
    }
  }, [update, navigate, dispatch]);

  return (
    <div className="container-container-fluid">
      <MetaData title={"Update profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            onSubmit={handlSubmit}
            className="shadow-lg"
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={userData.name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
