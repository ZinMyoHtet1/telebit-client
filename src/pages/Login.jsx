import React, { useContext } from "react";
import { useState, useEffect } from "react";
// import { appContext } from "./../contexts/AppContext.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import "./../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { userLogin, userRegister } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
function Login() {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  };
  const [initialValues, setInitialValues] = useState(initialState);
  const [isLogin, setIsLogin] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    Object.entries(initialValues).forEach(([key, value]) => {
      if (value) formData[key] = value;
    });
    console.log(formData, "formData");
    if (isLogin) {
      userLogin(formData, (data) => {
        if (data.status === "verification") {
          navigate("/auth/verifyEmail", {
            replace: true,
            state: { email: formData.email },
          });
        } else {
          console.log(data, "respnse");
          sessionStorage.setItem("user", JSON.stringify(data.data));

          navigate("/home", { replace: true });
        }
      })(dispatch);
    } else {
      function callback() {
        navigate("/auth/verifyEmail", {
          replace: true,
          state: { email: formData.email },
        });
      }
      // navigate("/auth/verifyEmail", {
      //   replace: true,
      //   state: { email: formData.email },
      // });
      userRegister(formData, callback)(dispatch);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setInitialValues((previous) => {
      return {
        ...previous,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSwitchMode = (e) => {
    e.preventDefault();
    if (isLogin) {
      navigate("/auth/register");
    } else {
      navigate("/auth/login");
    }
    setInitialValues(initialState);
  };

  const handleTogglePassword = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
  };

  const handleToggleConfirmPassword = () => {
    confirmPasswordRef.current.type =
      confirmPasswordRef.current.type === "password" ? "text" : "password";
  };

  const handleFocus = (e) => {
    e.target.style.border = "solid 1px var(--primary-color)";
  };

  const handleBlur = (e) => {
    e.target.style.border = "solid 0.2px rgba(0, 0, 0, 0.2)";
  };
  useEffect(() => {
    setIsLogin(location.pathname.includes("login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <GoogleOAuthProvider clientId="861972951011-27g6htjd7gvefembn81c8h1l190vjd3k.apps.googleusercontent.com">
      <div id="login_page" className="page">
        <div className="wrapper">
          <h3 className="title">{isLogin ? "Login" : "register"}</h3>
          <form id="login_form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="username_form">
                <div className="form_control">
                  <label htmlFor="firstName">first name:</label>
                  <input
                    type="text"
                    name="firstName"
                    id="first_name"
                    onChange={handleChange}
                    value={initialValues.firstName}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form_control">
                  <label htmlFor="lastName">last name:</label>
                  <input
                    type="text"
                    name="lastName"
                    id="last_name"
                    onChange={handleChange}
                    value={initialValues.lastName}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            )}

            <div className="form_control">
              <label htmlFor="email">email:</label>
              <input
                type="email"
                name="email"
                id="email_input"
                onChange={handleChange}
                value={initialValues.email}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="form_control">
              <label htmlFor="password">password:</label>
              <div className="password_container">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password_input"
                  onChange={handleChange}
                  value={initialValues.password}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <span
                  className="toggle_password_btn btn"
                  onClick={handleTogglePassword}
                >
                  show
                </span>
              </div>
            </div>
            {!isLogin && (
              <div className="form_control">
                <label htmlFor="confirmPassword">confirmPassword:</label>

                <div className="password_container">
                  <input
                    ref={confirmPasswordRef}
                    type="password"
                    name="confirmPassword"
                    id="confirm_password_input"
                    onChange={handleChange}
                    value={initialValues.confirmPassword}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <span
                    className="toggle_password_btn btn"
                    onClick={handleToggleConfirmPassword}
                  >
                    show
                  </span>
                </div>
              </div>
            )}

            <div className="switch_mode">
              {isLogin
                ? "no account had not registered yet."
                : "I had registered an account"}{" "}
              <span className="switch_mode_btn btn" onClick={handleSwitchMode}>
                {isLogin ? "register" : "login"}
              </span>
            </div>
            <button id="login_submit" type="submit">
              Submit
            </button>
          </form>
          <div className="divider">or</div>
          {/* <div className="oauth_login btn">Google</div> */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              //   verifyGoogleToken(
              //     credentialResponse.credential,
              //     navigate
              //   )(dispatch);
              console.log(credentialResponse, "credentialResponse");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
          ;
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
