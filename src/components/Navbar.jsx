import React, { useContext } from "react";

import "./../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../svgs/MenuIcon";
import { uiContext } from "../contexts/UIContext";
// import UploadCircleStatus from "./UploadCircleStatus";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

// import ProfileIcon from "../svgs/ProfileIcon";
import UserStatus from "./UserStatus";
function Navbar() {
  const { dispatch: uiDispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);
  const navigate = useNavigate();

  const handleOpenSideDrawer = () => {
    uiDispatch({ type: "OPEN_SIDEDRAWER" });
  };

  const handleGoBackHome = () => {
    navigate("/home", { replace: true });
  };

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 820:
        return 24;
      case windowWidth > 820:
        return 28;
      default:
        28;
    }
  };
  return (
    <div id="navbar">
      <div id="app_badge">
        <div
          id="side_drawer_btn"
          className="btn"
          onClick={handleOpenSideDrawer}
        >
          <MenuIcon
            width={getIconSize(windowWidth)}
            height={getIconSize(windowWidth)}
          />
        </div>
        <span className="app_name" onClick={handleGoBackHome}>
          Telebit
        </span>
      </div>
      <div>
        <UserStatus />
      </div>
    </div>
  );
}

export default Navbar;
