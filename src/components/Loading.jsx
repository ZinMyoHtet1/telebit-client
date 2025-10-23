import React, { useContext } from "react";
import TubeSpinner from "../svgs/TubeSpinner";
// import { fileContext } from "../contexts/FileContext";
import { uiContext } from "../contexts/UIContext";

import "./../styles/loading.css";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
import { authContext } from "../contexts/AuthContext";
import { trashContext } from "../contexts/TrashContext";

function Loading() {
  const { state: uiState } = useContext(uiContext);
  const { state: trashState } = useContext(trashContext);
  const { windowWidth } = useContext(mediaQueryContext);
  const { state: authState } = useContext(authContext);
  const isDeleting = uiState?.isDeleting; //boolean
  const isRenaming = uiState?.isRenaming; //boolean
  const isTrashRetrieving = trashState?.isRetrieving; //boolean
  const isTrashDeleting = trashState?.isDeleting; //boolean
  const creatingFolder = uiState?.creatingFolder; //boolean
  const isLoading = authState?.isLoading; //boolean
  const isLoggingOut = authState?.logout;
  const isLogin = authState?.isLogin;
  const isRegistering = authState?.isRegistering;

  const object = {
    isDeleting,
    isRenaming,
    isTrashRetrieving,
    isTrashDeleting,
    creatingFolder,
    isLoggingOut,
    isLogin,
    isRegistering,
    isLoading,
  };

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
      case object["isTrashRetrieving"]:
        return "Trash Retrieving...";
      case object["isTrashDeleting"]:
        return "Trash Deleting...";
      case object["creatingFolder"]:
        return "Creating Folder...";

      case object["isLoggingOut"]:
        return "Logging Out...";
      case object["isLogin"]:
        return "Logging in...";
      case object["isRegistering"]:
        return "Registering...";
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
