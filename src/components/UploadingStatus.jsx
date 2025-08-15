import React, { useContext } from "react";

import "./../styles/uploadingStatus.css";
import { useEffect } from "react";
import { useRef } from "react";
// import { appContext } from "../contexts/AppContext";
import formatFileSize from "../utils/formatFileSize";
import formatName from "../utils/formatName";
import { fileContext } from "../contexts/FileContext";
import DownloadDoneIcon from "../svgs/DownloadDoneIcon";
import { uiContext } from "../contexts/UIContext";
import CloseIcon from "../svgs/CloseIcon";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

function UploadingStatus() {
  const progressRef = useRef(null);
  const { state: fileState } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const currentUploadContent = fileState?.currentUploadContent;
  const uploadPercent = fileState?.uploadPercent;

  const file = currentUploadContent?.file || null;
  const hidden = !uiState?.uploadingStatus;

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 720:
        return 14;
      case windowWidth < 1020:
        return 18;

      default:
        20;
    }
  };
  // const hidden = false;
  const handleClose = () => {
    uiDispatch({ type: "CLOSE_UPLOADINGSTATUS" });
  };

  useEffect(() => {
    if (progressRef.current)
      progressRef.current.style.width = `${uploadPercent}%`;
  }, [uploadPercent]);
  return (
    <div
      id="uploading_status"
      className={`${hidden ? "hidden" : ""}`}
      // onClick={handleClick}
    >
      {uploadPercent < 100 ? (
        <>
          <button className="close_btn btn" onClick={handleClose}>
            <CloseIcon
              width={getIconSize(windowWidth)}
              height={getIconSize(windowWidth)}
            />
          </button>
          <div className="status">uploading...</div>
          <div className="progress_bar">
            <span ref={progressRef} id="uploading_progress"></span>
          </div>
          <div className="content">
            <div className="file_name">{formatName(file?.name, 20)}</div>
            <div className="file_size">
              {(formatFileSize(file?.size * (uploadPercent / 100)) || "") +
                "/" +
                formatFileSize(file?.size)}
            </div>
          </div>
        </>
      ) : (
        <div className="success_message">
          <DownloadDoneIcon
            fillColor="#70e000"
            width={getIconSize(windowWidth)}
            height={getIconSize(windowWidth)}
          />
          <span>successfully upload file!</span>
        </div>
      )}
    </div>
  );
}

export default UploadingStatus;
