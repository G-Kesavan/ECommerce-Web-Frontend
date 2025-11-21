import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
  },
  reducers: {
    loginRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        message: action.payload.message,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    registerRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        message: action.payload.message,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    editProfilRequest(state) {
      return {
        ...state,
        loading: true,
        update: false,
      };
    },
    editProfilSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
        update: true,
      };
    },
    editProfilFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest(state) {
      return {
        ...state,
        loading: false,
        isAuthenticated: undefined,
      };
    },
    loadUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFail(state) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    logoutSuccess(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        message: action.payload.message,
        user: undefined,
        loading: false,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    passwordChangeRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    passwordChangeSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    passwordChangeFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    resetPasswordRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    restPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    forgotEmailRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    forgotEmailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    forgotEmailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: undefined,
      };
    },
    clearMessage(state) {
      return {
        ...state,
        message: undefined,
      };
    },
    clearUpdate(state) {
      return {
        ...state,
        update: undefined,
      };
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  clearError,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  editProfilFail,
  editProfilRequest,
  editProfilSuccess,
  clearMessage,
  passwordChangeFail,
  passwordChangeRequest,
  passwordChangeSuccess,
  forgotEmailFail,
  forgotEmailRequest,
  forgotEmailSuccess,
  resetPasswordRequest,
  resetPasswordSuccess,
  restPasswordFail,
  clearUpdate,
} = actions;

export default reducer;
