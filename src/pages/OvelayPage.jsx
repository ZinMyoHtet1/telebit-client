import React, { useContext } from "react";

import "./../styles/overlayPage.css";
import { uiContext } from "../contexts/UIContext";

function OverlayPage({ children }) {
  const { state: uiState } = useContext(uiContext);
  const hidden = !uiState?.overlayPage;

  return (
    <div id="overlay_page" className={`overlay_page ${hidden ? "hidden" : ""}`}>
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default OverlayPage;
