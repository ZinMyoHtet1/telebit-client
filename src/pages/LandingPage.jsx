import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import API from "./../api/authApi";

import bgImage from "./../assets/backgroundImage.png";
import app_logo from "./../assets/app-logo.png";
import "./../styles/landingPage.css";
import LoadingPage from "./LoadingPage";

function LandingPage() {
  const { dispatch: authDispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);
  const [showPage, setShowPage] = useState(false); // ✅ New state for delay

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;

    API.connect()
      .then(() => {
        setServerConnected(true);
      })
      .catch((err) => {
        console.error("API connection failed:", err);
      });

    img.onload = () => setBgLoaded(true);

    // ✅ Minimum 2-second delay
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const redirectToHome = () => navigate("/home", { replace: true });
  const redirectToLogin = () => navigate("/auth/login", { replace: true });

  const handleGetStarted = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) return redirectToHome();

    const token = localStorage.getItem("token");
    if (!token || token === "null") return redirectToLogin();

    verifyToken(token, redirectToHome)(authDispatch);
  };

  return (
    <>
      {serverConnected && showPage ? ( // ✅ Wait for both API and timer
        <div
          id="landing_page"
          className={`page ${bgLoaded ? "bg-ready" : "bg-loading"}`}
        >
          <div className="wrapper">
            <div className="nav_bar">
              <img className="app_name" src={app_logo} alt="app-logo" />
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
              <p>your data, everywhere</p>
              <button className="getStarted_btn btn" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default LandingPage;
