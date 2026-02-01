import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/forgetPassword.css";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import MessagePage from "./MessagePage";
import {
  forgotPassword,
  verifyResetOTP,
  verifyToken,
} from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import { uiContext } from "../contexts/UIContext";

function ForgetPasswordPage() {
  const { state: authState, dispatch: authDispatch } = useContext(authContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1 = email input, 2 = otp input
  const navigate = useNavigate();

  const errorMessage = authState?.errorMessage;

  const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

  const openMessagePage = (message) => {
    setTimeout(() => {
      authDispatch({ type: "REMOVE_ERROR" });
    }, 1000);
    uiDispatch({ type: "OPEN_MESSAGEPAGE", payload: message });
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    openOverlayPage();

    function callback() {
      setTimeout(() => {
        closeOverlayPage();
        setStep(2); // move to OTP input
      }, 1500);
    }

    forgotPassword(email, callback)(authDispatch);

    // Simulate API call for sending OTP
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter the OTP code.");
      return;
    }
    openOverlayPage();

    // Simulate API call for verifying OTP

    function callback(data) {
      setTimeout(() => {
        closeOverlayPage();
        window.location.href = data.data.redirect;
      }, 1500);
    }

    verifyResetOTP({ email, otp: +otp }, callback)(authDispatch);
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
    if (!errorMessage) return;
    closeOverlayPage();
    openMessagePage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <div id="forget_password_page" className="page">
      <OverlayPage>
        <Loading />
      </OverlayPage>

      <MessagePage message={message} />
      <div className="wrapper">
        <div className="forget-password-card">
          <h2 className="title">Forgot Password?</h2>
          <p className="description">
            {step === 1
              ? "Enter your email address and we’ll send an OTP to reset your password."
              : "Enter the OTP code sent to your email."}
          </p>

          <form
            onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
            className="forget-password-form"
          >
            {step === 1 && (
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
              />
            )}

            {step === 2 && (
              <input
                type="text"
                placeholder="Enter OTP code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
            {/* temporary block login */}

            <button type="submit" className="submit-btn" disabled>
              {step === 1 ? "Send OTP" : "Verify OTP"}
            </button>
          </form>

          <p className="back-link">
            {step === 2 ? (
              <>
                Didn't get the code?{" "}
                <span onClick={handleSendOtp}>Resend OTP</span>
              </>
            ) : (
              <>
                Remembered your password?{" "}
                <span onClick={() => navigate("/auth/login")}>
                  Back to Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
