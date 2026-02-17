import React, { useContext, useEffect, useRef } from "react";
import { directoryContext } from "./../contexts/DirectoryContext";

import "./../styles/contentDetails.css";
import { uiContext } from "../contexts/UIContext";
import formatFileSize from "../utils/formatFileSize";
import formatNormalDate from "../utils/formatNormalDate";

function ContentDetails() {
  const { state: directoryState } = useContext(directoryContext);

  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const contentDetailsRef = useRef();

  const isActive =
    uiState?.contentDetails &&
    (directoryState?.activeContent?.id ||
      directoryState?.activeContent?.uploadId);

  const content = directoryState?.activeContent;
  const isLoading = uiState?.isLoading;

  const hidden =
    !isActive || isLoading || uiState?.activeRenaming || uiState?.isDeleting;

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
      <div className="content_details_container">
        {/* <div className="content_details_item">
          Name : {content?.filename || content?.name}
        </div> */}
        {/* {JSON.stringify(content)} */}
        {content?.id ? (
          <>
            <div className="content_details_item">
              <span className="content_details_key">name</span>
              <span>&#58;</span>
              <span className="content_details_value">{content.name}</span>
            </div>
            {!content.files.length && !content.childDirIds.length ? (
              <div className="content_details_item">Empty folder</div>
            ) : (
              <>
                <div className="content_details_item">
                  <span className="content_details_key">files</span>
                  <span>&#58;</span>
                  <span className="content_details_value">
                    {content.files.length}
                  </span>
                </div>
                <div className="content_details_item">
                  <span className="content_details_key">folder</span>
                  <span>&#58;</span>
                  <span className="content_details_value">
                    {content.childDirIds.length}
                  </span>
                </div>
              </>
            )}

            <div className="content_details_item">
              <span className="content_details_key">date</span>
              <span>&#58;</span>
              <span className="content_details_value">
                {" "}
                {formatNormalDate(content?.createdAt)}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="content_details_item">
              <span className="content_details_key">name</span>
              <span>&#58;</span>
              <span className="content_details_value">{content?.filename}</span>
            </div>
            <div className="content_details_item">
              <span className="content_details_key">type</span>
              <span>&#58;</span>
              <span className="content_details_value">{content?.mimeType}</span>
            </div>
            <div className="content_details_item">
              <span className="content_details_key">size</span>
              <span>&#58;</span>
              <span className="content_details_value">
                {formatFileSize(content?.size)}
              </span>
            </div>
            <div className="content_details_item">
              <span className="content_details_key">date</span>
              <span>&#58;</span>
              <span className="content_details_value">
                {formatNormalDate(content?.createdAt)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContentDetails;
