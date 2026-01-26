import React, { useContext, useEffect, useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  // googleLogout,
} from "@react-oauth/google";
// import { } from "@react-oauth/google";

import { useNavigate, useParams } from "react-router-dom";
import {
  userLogin,
  userRegister,
  verifyToken,
  verifyGoogleToken,
} from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import { uiContext } from "../contexts/UIContext";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import "./../styles/login.css";

import logo from "./../assets/logo.svg";
import { fileContext } from "../contexts/FileContext";
import { directoryContext } from "../contexts/DirectoryContext";
import MessagePage from "./MessagePage";

import EyeIcon from "../svgs/EyeIcon";
import EyeOffIcon from "../svgs/EyeOffIcon";

function Login() {
  const { state: authState, dispatch: authDispatch } = useContext(authContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const { dispatch: fileDispatch } = useContext(fileContext);
  const { dispatch: directoryDispatch } = useContext(directoryContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const mode = params?.mode;

  const errorMessage = authState?.errorMessage;
  const GOOGLE_CLIENT_ID =
    "861972951011-27g6htjd7gvefembn81c8h1l190vjd3k.apps.googleusercontent.com";

  const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      openOverlayPage();

      userLogin(formValues, (data) => {
        if (data.status === "verification") {
          closeOverlayPage();
          navigate("/auth/verifyEmail", {
            replace: true,
            state: { email: formValues.email },
          });
        } else {
          localStorage.setItem("token", data.data.token);
          sessionStorage.setItem("user", JSON.stringify(data.data.user));
          closeOverlayPage();
          resetAll();
          navigate("/home", { replace: true });
        }
      })(authDispatch);
    } else {
      openOverlayPage();
      userRegister(formValues, () => {
        closeOverlayPage();
        resetAll();

        navigate("/auth/verifyEmail", {
          replace: true,
          state: { email: formValues.email },
        });
      })(authDispatch);
    }
  };

  const handleSwitchMode = () => {
    if (isLogin) {
      navigate("/auth/register");
    } else {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user === "null") {
      const token = localStorage.getItem("token");
      const googleToken = localStorage.getItem("google_token");

      if (token && token !== "null") {
        verifyToken(token, () => {
          navigate("/home", { replace: true });
        })(authDispatch);
      }
      if (googleToken && googleToken !== "null") {
        verifyGoogleToken(googleToken, () => {
          navigate("/home", { replace: true });
        })(authDispatch);
      }
    } else {
      navigate("/home", { replace: true });
    }
  }, [authDispatch, navigate]);

  useEffect(() => {
    if (!mode) return; // Wait until mode is available

    switch (mode.toLowerCase()) {
      case "login":
        setIsLogin(true);
        break;
      case "register":
        setIsLogin(false);
        break;
      default:
        navigate("/getStarted", { replace: true });
        break;
    }
  }, [mode, navigate]);

  useEffect(() => {
    if (!errorMessage) return;
    closeOverlayPage();
    openMessagePage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="login-container">
        <OverlayPage>
          <Loading />
        </OverlayPage>
        <MessagePage />
        <div className="login-card">
          <div className="logo">
            <img src={logo} alt="Telebit Logo" className="logo-icon" />
            <h1 className="app-name">Telebit</h1>
          </div>

          <h2 className="form-title">{isLogin ? "Login" : "Sign Up"}</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="name-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <input
              type="text"
              name="email"
              placeholder="Email or Username"
              value={formValues.email}
              onChange={handleChange}
              required
            />

            {/* Password Field with Toggle */}
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>

            {!isLogin && (
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              </div>
            )}

            {isLogin && (
              <div className="options">
                <span></span>
                <a href="/auth/forgot-password" className="forgot-link">
                  Forgot Password?
                </a>
              </div>
            )}

            <button type="submit" className="login-btn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="signup-text">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span onClick={handleSwitchMode} className="signup-link">
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              // console.log(credentialResponse);
              verifyGoogleToken(credentialResponse.credential, () => {
                resetAll();
                navigate("/home", { replace: true });
              })(authDispatch);
              // closeOverlayPage();
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
