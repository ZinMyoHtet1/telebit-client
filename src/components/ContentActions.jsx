import React, { useContext } from "react";

import "./../styles/contentActions.css";
import CustomButton from "./CustomButton";
import { directoryContext } from "../contexts/DirectoryContext";
// import { useNavigate } from "react-router-dom";
import { uiContext } from "../contexts/UIContext";
import UploadCircleStatus from "./UploadCircleStatus";

function ContentActions() {
  const { state, dispatch } = useContext(directoryContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const directory = state?.currentDirectory;

  const handleCreateFolder = () => {
    if (directory?.id) dispatch({ type: "ADD_TEMP_DIRECTORY" });
  };

  const handleUploadFile = () => {
    uiDispatch({ type: "OPEN_UPLOADPAGE" });
  };

  return (
    <div id="content_actions">
      <UploadCircleStatus />

      <CustomButton
        variant="outline"
        text="Create Folder"
        handleClick={handleCreateFolder}
      />
      <CustomButton
        variant="solid"
        text="Upload File"
        handleClick={handleUploadFile}
      />
    </div>
  );
}

export default ContentActions;
