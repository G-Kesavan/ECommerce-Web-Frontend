import {
  clearError,
  clearMessage,
  clearUpdate,
  editProfilFail,
  editProfilRequest,
  editProfilSuccess,
  forgotEmailFail,
  forgotEmailRequest,
  forgotEmailSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
  passwordChangeFail,
  passwordChangeRequest,
  passwordChangeSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  resetPasswordRequest,
} from "../slices/authSlices";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post("/api/auth/login", { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const passwordReset =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const { data } = await axios.post(`/api/auth/password-reset/${token}`, {
        password,
        confirmPassword,
      });
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
  };

export const forgotEmail = (email) => async (dispatch) => {
  try {
    dispatch(forgotEmailRequest());
    const { data } = await axios.post("/api/auth/password-forgot", { email });
    dispatch(forgotEmailSuccess(data));
  } catch (error) {
    dispatch(forgotEmailFail(error.response.data.message));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/auth/register", userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const editProfile = (userData) => async (dispatch) => {
  try {
    dispatch(editProfilRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      "/api/auth/profile-update",
      userData,
      config
    );
    dispatch(editProfilSuccess(data));
  } catch (error) {
    dispatch(editProfilFail(error.response.data.message));
  }
};

export const passwordChange =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(passwordChangeRequest());
      const { data } = await axios.put("/api/auth/password-change", {
        oldPassword,
        password: newPassword,
      });
      dispatch(passwordChangeSuccess(data));
    } catch (error) {
      dispatch(passwordChangeFail(error.response.data.message));
    }
  };

export const loadUserData = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get("/api/auth/my-profile");
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get("/api/auth/logout");
    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const clearAuthError = () => (dispatch) => {
  dispatch(clearError());
};

export const clearAuthMessage = () => (dispatch) => {
  dispatch(clearMessage());
};

export const clearAuthUpdate = () => (dispatch) => {
  dispatch(clearUpdate());
};
