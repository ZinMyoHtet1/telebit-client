import React, { useContext } from "react";

import "./../styles/navbar.css";
import MenuIcon from "../svgs/MenuIcon";
import { uiContext } from "../contexts/UIContext";

function Navbar() {
  const { dispatch: uiDispatch } = useContext(uiContext);

  const handleOpenSideDrawer = () => {
    uiDispatch({ type: "OPEN_SIDEDRAWER" });
  };
  return (
    <div id="navbar">
      <div id="side_drawer_btn" className="btn" onClick={handleOpenSideDrawer}>
        <MenuIcon width={28} height={28} />
      </div>
      <span className="app_name">Telebit</span>
    </div>
  );
}

export default Navbar;
