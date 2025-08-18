import React, { useContext, useEffect } from "react";
import cookie from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../actions/authActions";
import { authContext } from "../contexts/AuthContext";

import bgImage from "./../assets/backgroundImage.png";

import "./../styles/landingPage.css";

function LandingPage() {
  const { dispatch: authDispatch } = useContext(authContext);
  // const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {}, [authDispatch, navigate]);

  const handleGetStarted = () => {
    let user = null;
    user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      const jwt = cookie.getCookie("jwt");
      // console.log(jwt, "jwt");
      if (!jwt) {
        navigate("/auth/login", { replace: true });
      } else {
        verifyToken(jwt, () => {
          navigate("/home", { replace: true });
        })(authDispatch);
      }

      //verify token
    } else {
      navigate("/home", { replace: true });
    }
  };
  return (
    <div
      id="landing_page"
      className="page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // ensures it fills the screen
      }}
    >
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
    </div>
  );
}

export default LandingPage;
