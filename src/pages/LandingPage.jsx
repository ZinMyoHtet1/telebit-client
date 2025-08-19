import React, { useContext, useEffect, useState } from "react";
import cookie from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";

import bgImage from "./../assets/backgroundImage.png";

import API from "./../api/authApi";

import "./../styles/landingPage.css";

function LandingPage() {
  const { dispatch: authDispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    // preload background image
    const img = new Image();
    img.src = bgImage;
    img.onload = () => {
      API.connect().then(() => setBgLoaded(true));
    };
  }, []);

  const handleGetStarted = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      const jwt = cookie.getCookie("jwt");
      if (!jwt) {
        navigate("/auth/login", { replace: true });
      } else {
        verifyToken(jwt, () => {
          navigate("/home", { replace: true });
        })(authDispatch);
      }
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <div
      id="landing_page"
      className={`page ${bgLoaded ? "bg-ready" : "bg-loading"}`}
    >
      {!bgLoaded && (
        <div className="wrapper">
          <div className="nav_bar">
            <div className="app_name">Telebit</div>
            <div className="actions">
              <button className="about_btn btn">about</button>
              <button className="login_btn btn">Login</button>
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
      )}
    </div>
  );
}

export default LandingPage;
