// import { VERIFY_AUTH } from "../constants/authConstants.js";
// import getCookie from "../utils/getCookie.js";
import API from "./../api/authApi.js";

const userLogin =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOGIN" });
      const response = await API.login(formData);
      callback(response.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "STOP_LOGIN" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Login Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOGIN" });
    }
  };

const userRegister =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_REGISTER" });
      await API.register(formData);
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "STOP_REGISTER" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Register Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_REGISTER" });
    }
  };

const verifyEmail =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.verifyEmail(formData);
      callback(response.data);
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Verification Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const verifyToken =
  (token, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.verifyToken(token);
      localStorage.setItem("token", response.data.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
      callback();
    } catch (error) {
      sessionStorage.clear();
      localStorage.setItem("token", null);
      dispatch({ type: "STOP_LOADING" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Verification Token Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const verifyGoogleToken =
  (token, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.verifyGoogleToken(token);
      localStorage.setItem("google_token", response.data.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
      dispatch({ type: "LOGIN" });

      callback();
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
      dispatch({ type: "ERROR", payload: error.response.data.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const resendOTP =
  (email, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      await API.resendOTP(email);

      callback();
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Resend OTP failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const forgotPassword =
  (email, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      await API.forgotPassword(email);

      callback();
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const verifyResetOTP =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.verifyResetOTP(formData);

      callback(response.data);
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const resetPassword =
  (resetToken, formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.resetPassword(resetToken, formData);

      callback(response.data);
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });

      dispatch({
        type: "ERROR",
        payload: {
          message: error.response.data.message,
          title: "Failed!",
        },
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

export {
  userLogin,
  userRegister,
  verifyEmail,
  verifyToken,
  verifyGoogleToken,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
};
