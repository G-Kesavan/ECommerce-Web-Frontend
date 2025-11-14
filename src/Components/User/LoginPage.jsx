import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";
import MetaData from "../../utils/MetaData";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.authState);
  const redirect = location.search?'/'+location.search.split('=')[1]:'/'
  const handlSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if(isAuthenticated === false && redirect === '/shipping-details'){
      toast.warning('Pleace login after access checkout page...',{position:'bottom-center'})
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate,redirect]);
  return (
    <div className="container container-fluid">
      <MetaData title={"Login page"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handlSubmit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
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

            <Link to={"/forget-password"} className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              LOGIN
            </button>

            <Link to={"/register"} className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
