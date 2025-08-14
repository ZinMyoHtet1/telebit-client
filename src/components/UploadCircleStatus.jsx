import React, { useContext, useEffect } from "react";

import UploadAnimateIcon from "./../svgs/UploadAnimateIcon";
import { fileContext } from "../contexts/FileContext";

import "./../styles/uploadCircleStatus.css";
import { uiContext } from "../contexts/UIContext";

function UploadCircleStatus() {
  const { state: fileState } = useContext(fileContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const uploadingContents = fileState?.uploadingContents;

  const handleClick = () => {
    console.log("onClikce");
    uiDispatch({ type: "OPEN_UPLOADINGSTATUS" });
  };

  useEffect(() => {
    if (uploadingContents && !uploadingContents.length)
      uiDispatch({ type: "CLOSE_UPLOADINGSTATUS" });
  }, [uiDispatch, uploadingContents]);
  return (
    <div
      id="upload_circle_status"
      className={`btn ${uploadingContents?.length > 0 ? "" : "hidden"}`}
      onClick={handleClick}
    >
      <UploadAnimateIcon width={24} height={24} />
    </div>
  );
}

export default UploadCircleStatus;
