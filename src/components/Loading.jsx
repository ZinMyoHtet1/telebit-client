import React, { useContext } from "react";
import TubeSpinner from "../svgs/TubeSpinner";
// import { fileContext } from "../contexts/FileContext";
import { uiContext } from "../contexts/UIContext";

import "./../styles/loading.css";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
import { authContext } from "../contexts/AuthContext";

function Loading() {
  const { state: uiState } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);
  const { state: authState } = useContext(authContext);
  const isDeleting = uiState?.isDeleting; //boolean
  const isRenaming = uiState?.isRenaming; //boolean
  const creatingFolder = uiState?.creatingFolder; //boolean
  const isLoading = authState?.isLoading; //boolean

  const object = { isDeleting, isRenaming, creatingFolder, isLoading };

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 660:
        return 32;
      case windowWidth > 660:
        return 42;
      default:
        42;
    }
  };

  function getMesssage() {
    switch (true) {
      case object["isDeleting"]:
        return "Deleting...";
      case object["isRenaming"]:
        return "Renaming...";
      case object["creatingFolder"]:
        return "Creating Folder...";
      default:
        return "Loading...";
    }
  }
  return (
    <div id="loading">
      <TubeSpinner
        width={getIconSize(windowWidth)}
        height={getIconSize(windowWidth)}
      />
      <div className="loading_message">{getMesssage()}</div>
    </div>
  );
}

export default Loading;
