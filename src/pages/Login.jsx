// import React, { useContext } from "react";
// import { useState, useEffect } from "react";
// // import { appContext } from "./../contexts/AppContext.js";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// import "./../styles/login.css";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// import { userLogin, userRegister, verifyToken } from "../actions/authActions";
// import { authContext } from "../contexts/AuthContext";
// import Loading from "../components/Loading";
// import OverlayPage from "./OvelayPage";
// import { uiContext } from "../contexts/UIContext";
// function Login() {
//   const { dispatch } = useContext(authContext);
//   const { dispatch: uiDispatch } = useContext(uiContext);
//   const navigate = useNavigate();
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);
//   const initialState = {
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     confirmPassword: "",
//   };
//   const [initialValues, setInitialValues] = useState(initialState);
//   const [isLogin, setIsLogin] = useState(null);

//   const closeOverlayPage = () => {
//     uiDispatch({ type: "CLOSE_OVERLAYPAGE" });
//   };
//   const openOverlayPage = () => {
//     uiDispatch({ type: "OPEN_OVERLAYPAGE" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {};
//     Object.entries(initialValues).forEach(([key, value]) => {
//       if (value) formData[key] = value;
//     });
//     console.log(formData, "formData");

//     if (isLogin) {
//       openOverlayPage();
//       userLogin(formData, (data) => {
//         if (data.status === "verification") {
//           navigate("/auth/verifyEmail", {
//             replace: true,
//             state: { email: formData.email },
//           });
//         } else {
//           // console.log(data, "respnse");
//           localStorage.setItem("token", data.data.token);
//           sessionStorage.setItem("user", JSON.stringify(data.data.user));
//           closeOverlayPage();
//           navigate("/home", { replace: true });
//         }
//       })(dispatch);
//     } else {
//       function callback() {
//         navigate("/auth/verifyEmail", {
//           replace: true,
//           state: { email: formData.email },
//         });
//       }
//       // navigate("/auth/verifyEmail", {
//       //   replace: true,
//       //   state: { email: formData.email },
//       // });
//       userRegister(formData, callback)(dispatch);
//     }
//   };
//   const handleChange = (e) => {
//     e.preventDefault();
//     setInitialValues((previous) => {
//       return {
//         ...previous,
//         [e.target.name]: e.target.value,
//       };
//     });
//   };
//   const handleSwitchMode = (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       navigate("/auth/register");
//     } else {
//       navigate("/auth/login");
//     }
//     setInitialValues(initialState);
//   };

//   const handleTogglePassword = () => {
//     passwordRef.current.type =
//       passwordRef.current.type === "password" ? "text" : "password";
//   };

//   const handleToggleConfirmPassword = () => {
//     confirmPasswordRef.current.type =
//       confirmPasswordRef.current.type === "password" ? "text" : "password";
//   };

//   const handleFocus = (e) => {
//     e.target.style.border = "solid 1px var(--primary-color)";
//   };

//   const handleBlur = (e) => {
//     e.target.style.border = "solid 0.2px rgba(0, 0, 0, 0.2)";
//   };
//   useEffect(() => {
//     setIsLogin(location.pathname.includes("login"));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   useEffect(() => {
//     let user = null;
//     user = JSON.parse(sessionStorage.getItem("user"));
//     if (!user) {
//       const token = localStorage.getItem("token");

//       // console.log(jwt, "jwt");
//       if (token && token !== "null") {
//         verifyToken(token, () => {
//           navigate("/home", { replace: true });
//         })(dispatch);
//       }

//       //verify token
//     } else {
//       navigate("/home", { replace: true });
//     }
//   }, [dispatch, navigate]);
//   return (
//     <GoogleOAuthProvider clientId="861972951011-27g6htjd7gvefembn81c8h1l190vjd3k.apps.googleusercontent.com">
//       <div id="login_page" className="page">
//         <OverlayPage>
//           <Loading />
//         </OverlayPage>
//         <div className="wrapper">
//           <h3 className="title">{isLogin ? "Login" : "register"}</h3>
//           <form id="login_form" onSubmit={handleSubmit}>
//             {!isLogin && (
//               <div className="username_form">
//                 <div className="form_control">
//                   <label htmlFor="firstName">first name:</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     id="first_name"
//                     onChange={handleChange}
//                     value={initialValues.firstName}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//                 <div className="form_control">
//                   <label htmlFor="lastName">last name:</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     id="last_name"
//                     onChange={handleChange}
//                     value={initialValues.lastName}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="form_control">
//               <label htmlFor="email">email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email_input"
//                 onChange={handleChange}
//                 value={initialValues.email}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//               />
//             </div>
//             <div className="form_control">
//               <label htmlFor="password">password:</label>
//               <div className="password_container">
//                 <input
//                   ref={passwordRef}
//                   type="password"
//                   name="password"
//                   id="password_input"
//                   onChange={handleChange}
//                   value={initialValues.password}
//                   onFocus={handleFocus}
//                   onBlur={handleBlur}
//                 />
//                 <span
//                   className="toggle_password_btn btn"
//                   onClick={handleTogglePassword}
//                 >
//                   show
//                 </span>
//               </div>
//             </div>
//             {!isLogin && (
//               <div className="form_control">
//                 <label htmlFor="confirmPassword">confirmPassword:</label>

//                 <div className="password_container">
//                   <input
//                     ref={confirmPasswordRef}
//                     type="password"
//                     name="confirmPassword"
//                     id="confirm_password_input"
//                     onChange={handleChange}
//                     value={initialValues.confirmPassword}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                   />
//                   <span
//                     className="toggle_password_btn btn"
//                     onClick={handleToggleConfirmPassword}
//                   >
//                     show
//                   </span>
//                 </div>
//               </div>
//             )}

//             <div className="switch_mode">
//               {isLogin
//                 ? "no account had not registered yet."
//                 : "I had registered an account"}{" "}
//               <span className="switch_mode_btn btn" onClick={handleSwitchMode}>
//                 {isLogin ? "register" : "login"}
//               </span>
//             </div>
//             <button id="login_submit" type="submit">
//               Submit
//             </button>
//           </form>
//           <div className="divider">or</div>
//           {/* <div className="oauth_login btn">Google</div> */}
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               //   verifyGoogleToken(
//               //     credentialResponse.credential,
//               //     navigate
//               //   )(dispatch);
//               console.log(credentialResponse, "credentialResponse");
//             }}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//             useOneTap
//           />
//           ;
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { userLogin, userRegister, verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import { uiContext } from "../contexts/UIContext";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import "./../styles/login.css";

import logo from "./../assets/logo.svg";

function Login() {
  const { dispatch } = useContext(authContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      uiDispatch({ type: "OPEN_OVERLAYPAGE" });
      userLogin(formValues, (data) => {
        if (data.status === "verification") {
          navigate("/auth/verifyEmail", {
            replace: true,
            state: { email: formValues.email },
          });
        } else {
          localStorage.setItem("token", data.data.token);
          sessionStorage.setItem("user", JSON.stringify(data.data.user));
          uiDispatch({ type: "CLOSE_OVERLAYPAGE" });
          navigate("/home", { replace: true });
        }
      })(dispatch);
    } else {
      userRegister(formValues, () => {
        navigate("/auth/verifyEmail", {
          replace: true,
          state: { email: formValues.email },
        });
      })(dispatch);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      const token = localStorage.getItem("token");
      if (token && token !== "null") {
        verifyToken(token, () => {
          navigate("/home", { replace: true });
        })(dispatch);
      }
    } else {
      navigate("/home", { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="login-container">
        <OverlayPage>
          <Loading />
        </OverlayPage>
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
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
              />
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
            <span onClick={() => setIsLogin(!isLogin)} className="signup-link">
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
