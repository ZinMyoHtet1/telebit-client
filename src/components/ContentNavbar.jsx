import React, { useContext } from "react";
import ContentActions from "./ContentActions";
import Breadcrump from "./Breadcrump";
import BackIcon from "./../svgs/BackIcon";

import "./../styles/contentNavbar.css";
import { directoryContext } from "../contexts/DirectoryContext";
import { useNavigate } from "react-router-dom";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
function ContentNavbar() {
  const { windowWidth } = useContext(mediaQueryContext);

  const { state } = useContext(directoryContext);
  const navigate = useNavigate();

  const mainDirectory = state?.currentDirectory;
  const previousDirectory = state?.parentDirectories?.at(-1);

  const handleBack = () => {
    if (mainDirectory?.id === "root") return;
    navigate(`/${previousDirectory?.id || ""}`, { replace: true });
  };

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 820:
        return 16;

      default:
        18;
    }
  };

  return (
    <div id="content_navbar">
      <div id="directory">
        {mainDirectory?.id !== "root" ? (
          <button className="route_back_btn btn" onClick={handleBack}>
            <BackIcon
              width={getIconSize(windowWidth)}
              height={getIconSize(windowWidth)}
            />
          </button>
        ) : null}
        <div className="directory_name">
          {mainDirectory?.id === "root" ? "Home" : mainDirectory?.name}
        </div>
      </div>
      {windowWidth > 320 && <ContentActions />}
    </div>
  );
}

export default ContentNavbar;
