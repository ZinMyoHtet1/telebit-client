import React, { useContext, useEffect } from "react";

import UploadAnimateIcon from "./../svgs/UploadAnimateIcon";
import { fileContext } from "../contexts/FileContext";

import "./../styles/uploadCircleStatus.css";
import { uiContext } from "../contexts/UIContext";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

function UploadCircleStatus() {
  const { state: fileState } = useContext(fileContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);
  const uploadingContents = fileState?.uploadingContents;
  // const uploadPercent = fileState?.uploadPercent;

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 660:
        return 18;
      case windowWidth < 820:
        return 20;
      case windowWidth > 820:
        return 24;
      default:
        24;
    }
  };

  const handleClick = () => {
    uiDispatch({ type: "OPEN_UPLOADINGSTATUS" });
  };

  useEffect(() => {
    if (uploadingContents && !uploadingContents.length)
      uiDispatch({ type: "CLOSE_UPLOADINGSTATUS" });
  }, [uiDispatch, uploadingContents]);
  return (
    <>
      {/* <div className="percent">{uploadPercent}</div> */}
      <div
        id="upload_circle_status"
        className={`btn ${uploadingContents?.length > 0 ? "" : "hidden"}`}
        onClick={handleClick}
      >
        <UploadAnimateIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
      </div>
    </>
  );
}

export default UploadCircleStatus;
