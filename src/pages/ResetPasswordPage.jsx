import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/resetPassword.css";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import MessagePage from "./MessagePage";
import { uiContext } from "../contexts/UIContext";
import { resetPassword, verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import { fileContext } from "../contexts/FileContext";
import { directoryContext } from "../contexts/DirectoryContext";

function ResetPasswordPage() {
  //   const location = useLocation();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const navigate = useNavigate();
  const query = useQuery();
  const resetToken = query.get("resetToken");

  //   const email = location.state?.email || ""; // Email passed from ForgetPasswordPage
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { dispatch: uiDispatch } = useContext(uiContext);
  const { state: authState, dispatch: authDispatch } = useContext(authContext);
  const { dispatch: directoryDispatch } = useContext(directoryContext);
  const { dispatch: fileDispatch } = useContext(fileContext);

  const errorMessage = authState?.errorMessage;

  const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

  const openMessagePage = (message) => {
    setTimeout(() => {
      authDispatch({ type: "REMOVE_ERROR" });
    }, 1000);
    uiDispatch({ type: "OPEN_MESSAGEPAGE", payload: message });
  };

  function resetAll() {
    fileDispatch({ type: "RESET" });
    directoryDispatch({ type: "RESET" });
    uiDispatch({ type: "RESET" });
  }
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    openOverlayPage();

    // setLoading(true);

    // Simulate API call for password reset
    function callback(data) {
      setTimeout(() => {
        localStorage.setItem("token", data.data.token);
        sessionStorage.setItem("user", JSON.stringify(data.data.user));
        closeOverlayPage();
        resetAll();
        navigate("/home", { replace: true });
      }, 1500);
    }

    resetPassword(
      resetToken,
      { password, confirmPassword },
      callback
    )(authDispatch);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user === "null") {
      const token = localStorage.getItem("token");
      if (token && token !== "null") {
        verifyToken(token, () => {
          navigate("/home", { replace: true });
        })(authDispatch);
      }
    } else {
      navigate("/home", { replace: true });
    }
  }, [authDispatch, navigate]);

  useEffect(() => {
    if (!resetToken) {
      navigate("/getStarted", { replace: true });
    }
  }, [navigate, resetToken]);

  useEffect(() => {
    if (!errorMessage) return;
    closeOverlayPage();
    openMessagePage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <div id="reset_password_page" className="page">
      <OverlayPage>
        <Loading />
      </OverlayPage>
      <MessagePage message={message} />
      <div className="wrapper">
        <div className="reset-password-card">
          <h2 className="title">Reset Password</h2>
          <p className="description">Set a new password for your account.</p>
          <form onSubmit={handleResetPassword} className="reset-password-form">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn btn">
              Reset Password
            </button>
          </form>
          <p className="back-link">
            Back to <span onClick={() => navigate("/auth/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
