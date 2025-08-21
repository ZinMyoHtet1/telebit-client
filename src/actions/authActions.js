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
      dispatch({ type: "ERROR", payload: error.message });

      // dispatch({ type: "STOP_LOADING" });
    } finally {
      dispatch({ type: "STOP_LOGIN" });

      // dispatch({ type: "STOP_LOADING" });
    }
  };

const userRegister =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_REGISTER" });
      await API.register(formData);
      // navigate("/auth/verifyEmail", {
      //   replace: true,
      //   state: { email: formData.email },
      // });
      callback();

      // dispatch({ type: REGISTER, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "STOP_REGISTER" });

      dispatch({ type: "ERROR", payload: error.message });
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
      console.log(error);
      dispatch({ type: "STOP_LOADING" });

      dispatch({ type: "ERROR", payload: error.message });
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
      // dispatch({ type: "VERIFY_AUTH" });
      callback();
    } catch (error) {
      sessionStorage.clear();
      localStorage.setItem("token", null);
      dispatch({ type: "STOP_LOADING" });

      console.log(error, "error from server");
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const verifyGoogleToken =
  (token, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      console.log(token, "token");
      await API.verifyGoogleToken(token);
      dispatch({ type: "LOGIN" });

      // navigate("/", { replace: true });
      callback();
    } catch (error) {
      // dispatch({ type: "LOGIN" });

      console.log(error, "error from server");
      dispatch({ type: "STOP_LOADING" });

      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

export { userLogin, userRegister, verifyEmail, verifyToken, verifyGoogleToken };
