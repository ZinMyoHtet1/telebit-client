import React, { useContext } from "react";
import TubeSpinner from "../svgs/TubeSpinner";
// import { fileContext } from "../contexts/FileContext";
import { uiContext } from "../contexts/UIContext";

import "./../styles/loading.css";

function Loading() {
  const { state: uiState } = useContext(uiContext);
  const isDeleting = uiState?.isDeleting; //boolean
  const isRenaming = uiState?.isRenaming; //boolean
  const creatingFolder = uiState?.creatingFolder; //boolean

  const object = { isDeleting, isRenaming, creatingFolder };

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
      <TubeSpinner width={42} height={42} />
      <div className="loading_message">{getMesssage()}</div>
    </div>
  );
}

export default Loading;
