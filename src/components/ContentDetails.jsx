import React, { useContext, useEffect, useRef } from "react";
import { directoryContext } from "./../contexts/DirectoryContext";

import "./../styles/contentDetails.css";
import { uiContext } from "../contexts/UIContext";
// import { fileContext } from "../contexts/FileContext";

import EyeIcon from "./../svgs/EyeIcon";
import RenameIcon from "./../svgs/RenameIcon";
import CopyIcon from "./../svgs/CopyIcon";
import PasteIcon from "./../svgs/PasteIcon";
import DeleteIcon from "./../svgs/DeleteIcon";
import QuestionIcon from "./../svgs/QuestionIcon";
import CloseIcon from "../svgs/CloseIcon";
import DownloadIcon from "../svgs/DownloadIcon";
import LinkIcon from "../svgs/LinkIcon";
// import { mediaQueryContext } from "../contexts/MediaQueryContext";
import PlayIcon from "../svgs/PlayIcon";
import OpenIcon from "../svgs/OpenIcon";

function ContentDetails() {
  const { state: directoryState } = useContext(directoryContext);

  //   const params = useParams();
  // const { dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  // const { windowWidth } = useContext(mediaQueryContext);
  const contentDetailsRef = useRef();
  //   const navigate = useNavigate();

  // const isActive =
  //   directoryState?.activeContent?.id ||
  //   directoryState?.activeContent?.uploadId;

  const isActive =
    uiState?.contentDetails &&
    (directoryState?.activeContent?.id ||
      directoryState?.activeContent?.uploadId);

  const content = directoryState?.activeContent;

  //   const currentDirId = params?.dirId || "root";

  //   const parentId = directoryState?.activeContent?.parentId || currentDirId;
  const isLoading = uiState?.isLoading;

  const hidden =
    !isActive || isLoading || uiState?.activeRenaming || uiState?.isDeleting;

  // const getIconSize = (windowWidth) => {
  //   switch (true) {
  //     case windowWidth < 820:
  //       return 18;
  //     default:
  //       20;
  //   }
  // };

  // const handleClose = () => {
  //   // directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
  //   uiDispatch({ type: "CLOSE_CONTENTDETAILS" });
  // };

  //   const closeOverlayPage = () => {
  //     uiDispatch({ type: "CLOSE_OVERLAYPAGE" });
  //   };
  //   const openOverlayPage = () => {
  //     uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  //   };

  useEffect(() => {
    function handleClickOutside(e) {
      // if (isLoading) return;
      if (
        contentDetailsRef.current &&
        !contentDetailsRef.current.contains(e.target)
      ) {
        //   dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
        uiDispatch({ type: "CLOSE_CONTENTDETAILS" });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [uiDispatch]);
  return (
    <div
      className={`content_details ${hidden ? "hidden" : ""}`}
      onMouseDown={(e) => e.stopPropagation()}
      ref={contentDetailsRef}
    >
      {/* <button className="close_btn btn" onClick={handleClose}>
        <CloseIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
      </button> */}
      <div className="content_details_container">
        {/* <div className="content_details_item">
          Name : {content?.filename || content?.name}
        </div> */}
        {/* {JSON.stringify(content)} */}
        {content?.id ? (
          <>
            <div className="content_details_item">name : {content.name}</div>
            <div className="content_details_item">
              data : {content.createdAt}
            </div>
          </>
        ) : (
          <>
            <div className="content_details_item">
              name : {content?.filename}
            </div>
            <div className="content_details_item">type : {content?.type}</div>
            <div className="content_details_item">size : {content?.size}</div>
            <div className="content_details_item">
              date : {content?.createdAt}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContentDetails;
