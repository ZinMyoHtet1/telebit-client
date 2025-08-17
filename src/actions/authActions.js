// import { VERIFY_AUTH } from "../constants/authConstants.js";
import deleteCookie from "../utils/deleteCookie.js";
// import getCookie from "../utils/getCookie.js";
import API from "./../api/authApi.js";

const userLogin =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.login(formData);
      console.log("user login ", response);
      callback(response.data);
      // if (response.data.status === "verification") {
      //   navigate("/auth/verifyEmail", {
      //     replace: true,
      //     state: { email: formData.email },
      //   });
      //   return;
      // }
      // dispatch({ type: "LOGIN" });
      // navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const userRegister =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      await API.register(formData);
      // navigate("/auth/verifyEmail", {
      //   replace: true,
      //   state: { email: formData.email },
      // });
      callback();

      // dispatch({ type: REGISTER, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const verifyEmail =
  (formData, callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await API.verifyEmail(formData);
      // dispatch({ type: "VERIFY_EMAIL" });
      // navigate("/", { replace: true });
      callback(response.data);
    } catch (error) {
      console.log(error);
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
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      // dispatch({ type: "VERIFY_AUTH" });
      callback();
    } catch (error) {
      sessionStorage.clear();
      deleteCookie("jwt");
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
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

export { userLogin, userRegister, verifyEmail, verifyToken, verifyGoogleToken };
