import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cookie from "../utils/cookie";
import { verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import API from "./../api/authApi";

import bgImage from "./../assets/backgroundImage.png";
import "./../styles/landingPage.css";

function LandingPage() {
  const { dispatch: authDispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = bgImage;
    // Connect API in background (don’t block UI)
    API.connect()
      .then(() => {
        setServerConnected(true);
      })
      .catch((err) => {
        console.error("API connection failed:", err);
      });
    img.onload = () => setBgLoaded(true);
  }, []);

  const redirectToHome = () => navigate("/home", { replace: true });
  const redirectToLogin = () => navigate("/auth/login", { replace: true });

  const handleGetStarted = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) return redirectToHome();

    const jwt = cookie.getCookie("jwt");
    console.log(jwt, "jwt");
    if (!jwt) return redirectToLogin();

    verifyToken(jwt, redirectToHome)(authDispatch);
  };

  return (
    <>
      {serverConnected && (
        <div
          id="landing_page"
          className={`page ${bgLoaded ? "bg-ready" : "bg-loading"}`}
        >
          <div className="wrapper">
            <div className="nav_bar">
              <div className="app_name">Telebit</div>
              <div className="actions">
                <button
                  className="about_btn btn"
                  onClick={() => navigate("/about")}
                >
                  About
                </button>
                <button
                  className="login_btn btn"
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="content">
              <h1>Unlimited Cloud Base</h1>
              <p>Your Data, Everywhere</p>
              <button className="getStarted_btn btn" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
