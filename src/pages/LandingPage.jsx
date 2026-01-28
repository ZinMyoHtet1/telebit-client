import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";
import API from "./../api/authApi";

import bgImage from "./../assets/backgroundImage.png";
import app_logo from "./../assets/app-logo.png";
import "./../styles/landingPage.css";
import LoadingPage from "./LoadingPage";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import CustomButton from "../components/CustomButton";
import { uiContext } from "../contexts/UIContext";

function LandingPage() {
  const { dispatch: authDispatch } = useContext(authContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);
  const [showPage, setShowPage] = useState(false); // ✅ New state for delay

  const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

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

  const redirectToHome = () => {
    navigate("/home", { replace: true });
    closeOverlayPage();
  };
  const redirectToLogin = () => {
    navigate("/auth/login", { replace: true });
    closeOverlayPage();
  };

  const handleGetStarted = () => {
    openOverlayPage();
    const user =
      sessionStorage.getItem("user") !== "undefined"
        ? JSON.parse(sessionStorage.getItem("user"))
        : null;
    if (user) return redirectToHome();

    const token = localStorage.getItem("token");
    // const googleToken = localStorage.getItem("google_token");
    if (token & (token !== "null")) {
      verifyToken(token, redirectToHome)(authDispatch);
    }

    // if (googleToken & (googleToken !== "null"))
    //   verifyGoogleToken(googleToken, redirectToHome)(authDispatch);

    return redirectToLogin();
  };

  // useEffect(() => {
  //   handleGetStarted();
  // });
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
                <CustomButton
                  text="About"
                  className="about_btn btn"
                  variant="outline"
                />
                <CustomButton
                  text="Login"
                  className="login_btn btn"
                  handleClick={() => navigate("/auth/login")}
                />
              </div>
            </div>

            <div className="content">
              <h1>Unlimited Cloud Base</h1>
              <p>your data, everywhere</p>
              <button className="getStarted_btn btn" onClick={handleGetStarted}>
                Get Started
              </button>

              <div
                className="signup_btn btn"
                onClick={() => navigate("/auth/register")}
              >
                sign up for free 100GB
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
      <OverlayPage>
        <Loading />
      </OverlayPage>
    </>
  );
}

export default LandingPage;
