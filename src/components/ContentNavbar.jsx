import React, { useContext } from "react";
import ContentActions from "./ContentActions";
import Breadcrump from "./Breadcrump";
import BackIcon from "./../svgs/BackIcon";

import "./../styles/contentNavbar.css";
import { directoryContext } from "../contexts/DirectoryContext";
import { useNavigate } from "react-router-dom";
function ContentNavbar() {
  const { state } = useContext(directoryContext);
  const navigate = useNavigate();

  const mainDirectory = state?.currentDirectory;
  const previousDirectory = state?.parentDirectories?.at(-1);

  const handleBack = () => {
    if (mainDirectory?.id === "root") return;
    navigate(`/${previousDirectory?.id || ""}`, { replace: true });
  };

  return (
    <div id="content_navbar">
      <div id="directory">
        {mainDirectory?.id !== "root" ? (
          <button className="route_back_btn btn" onClick={handleBack}>
            <BackIcon />
          </button>
        ) : null}
        <div className="directory_name">
          {mainDirectory?.id === "root" ? "Home" : mainDirectory?.name}
        </div>
      </div>
      <ContentActions />
    </div>
  );
}

export default ContentNavbar;
