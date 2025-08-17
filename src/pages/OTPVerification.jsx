import React, { useState, useEffect, useRef, useContext } from "react";
import "./../styles/otpVerification.css";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import { uiContext } from "../contexts/UIContext";
// import { verifyEmail } from "../actions/authActions.js";
// import { appContext } from "../contexts/AppContext.js";

function OTPVerification() {
  const initialState = ["", "", "", "", "", ""];
  const [initialValues, setInitialValues] = useState(initialState);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const { dispatch: uiDispatch } = useContext(uiContext);

  const email = history.state?.usr?.email;

  const closeOverlayPage = () => {
    uiDispatch({ type: "CLOSE_OVERLAYPAGE" });
  };
  const openOverlayPage = () => {
    uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  };
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, initialValues]);

  useEffect(() => {
    // Focus the first input on component mount
    inputRefs.current[0]?.focus();

    if (!email) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const newValues = [...initialValues];
      newValues[index] = value;
      setInitialValues(newValues);

      // Move to next input if current input has value and not last input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      const newValues = [...initialValues];

      // If current input is empty, delete previous and focus there
      if (!newValues[index] && index > 0) {
        newValues[index - 1] = "";
        setInitialValues(newValues);
        inputRefs.current[index - 1]?.focus();
      }
      // If current input has value, just delete it
      else if (newValues[index]) {
        newValues[index] = "";
        setInitialValues(newValues);
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain");
    if (/^\d{6}$/.test(pasteData)) {
      const pastedValues = pasteData.split("").slice(0, 6);
      setInitialValues(pastedValues);
      inputRefs.current[5]?.focus(); // Focus last input after paste
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = initialValues.join("");
    const formData = { email, otp };
    // console.log(formData);
    openOverlayPage();
    verifyEmail(formData, (data) => {
      sessionStorage.setItem("user", JSON.stringify(data.data));
      closeOverlayPage();
      navigate("/", { replace: true });
    })(dispatch);
  };

  const handleResend = () => {
    setCountdown(30);
    setInitialValues(initialState);
    inputRefs.current[0]?.focus();
  };

  return (
    <div id="verification_container" className="overlay_page">
      <div className="wrapper">
        <OverlayPage>
          <Loading />
        </OverlayPage>
        <img
          className="email_verification_icon"
          src="https://placehold.co/100x100/3b82f6/white?text=✓"
          alt="Verification checkmark icon"
        />
        <h1>Verify Your Email Address</h1>
        <p>
          We've sent a verification code to your email. Please enter the 6-digit
          code below.
        </p>
        <form className="content_container" onSubmit={handleSubmit}>
          <p>Enter the 6-digit verification code:</p>
          <div className="otp_container">
            {initialValues.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          <div className="resend_container">
            <div className="countdown">
              {countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                <div>Ready to resend</div>
              )}
            </div>
            <button
              type="button"
              className="resend_btn btn"
              onClick={handleResend}
              disabled={countdown > 0}
            >
              Resend Code
            </button>
          </div>
          <button
            type="submit"
            className="btn"
            disabled={initialValues.some((v) => !v)}
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
