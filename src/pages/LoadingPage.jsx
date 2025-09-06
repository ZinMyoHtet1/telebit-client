import React from "react";
import logo from "../assets/app-logo.png";

import "../styles/loadingPage.css";
import PulseRingIcon from "../svgs/PulseRingIcon";

function LoadingPage() {
  return (
    <div id="loading_page" className="overlay_page">
      <div className="app_logo">
        <img src={logo} alt="app_logo" />
      </div>
      <div className="loading">
        <PulseRingIcon width={28} height={28} />
        <div className="loading_text">please wait...</div>
      </div>
    </div>
  );
}

export default LoadingPage;
