import React, { useContext, useEffect, useRef, useState } from "react";
import { directoryContext } from "./../contexts/DirectoryContext";

import "./../styles/actionBar.css";
import { uiContext } from "../contexts/UIContext";
import { deleteDirectory } from "../actions/directoryActions";
import { fileContext } from "../contexts/FileContext";
import { deleteFile } from "../actions/fileActions";

import EyeIcon from "./../svgs/EyeIcon";
import RenameIcon from "./../svgs/RenameIcon";
import CopyIcon from "./../svgs/CopyIcon";
import PasteIcon from "./../svgs/PasteIcon";
import DeleteIcon from "./../svgs/DeleteIcon";
import QuestionIcon from "./../svgs/QuestionIcon";
import CloseIcon from "../svgs/CloseIcon";
import DownloadIcon from "../svgs/DownloadIcon";
import LinkIcon from "../svgs/LinkIcon";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
import PlayIcon from "../svgs/PlayIcon";
import OpenIcon from "../svgs/OpenIcon";
import { useNavigate, useParams } from "react-router-dom";

function ActionBar() {
  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);

  const params = useParams();
  const { dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);
  const navigate = useNavigate();
  const actionBarRef = useRef();

  const [isCopied, setIsCopied] = useState(false);

  const isActive =
    directoryState?.activeContent?.id ||
    directoryState?.activeContent?.uploadId;
  const content = directoryState?.activeContent;

  const currentDirId = params?.dirId || "root";

  const parentId = directoryState?.activeContent?.parentId || currentDirId;
  const isLoading = uiState?.isLoading;

  const hidden =
    !isActive ||
    uiState?.contentDetails ||
    isLoading ||
    uiState?.activeRenaming ||
    uiState?.isDeleting;

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 820:
        return 18;
      default:
        20;
    }
  };

  const handleClose = () => {
    directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
  };

  const closeOverlayPage = () => {
    uiDispatch({ type: "CLOSE_OVERLAYPAGE" });
  };
  const openOverlayPage = () => {
    uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  };

  const handleOpenMedia = () => {
    directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
    uiDispatch({ type: "OPEN_MEDIAVIEWER" });
    fileDispatch({ type: "SET_MEDIA_CONTENT", payload: content });
  };

  const handleOpenFolder = () => {
    navigate(`/${content.id}`);
  };

  const handleCopyLink = () => {
    if (isCopied) return;
    const data = content?.watch || "no url";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data);
      setIsCopied(true);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content);
    }
  };

  const handleDownload = () => {
    if (content?.download) window.open(content?.download, "_parent");
  };

  const handleRename = (e) => {
    e.stopPropagation();
    if (isLoading) return;
    uiDispatch({ type: "ACTIVE_RENAMING" });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isLoading && !parentId) return;

    function callback() {
      directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
      uiDispatch({ type: "STOP_DELETING" });
      closeOverlayPage();
    }
    uiDispatch({ type: "START_DELETING" });
    openOverlayPage();
    content?.id
      ? deleteDirectory(content.id)(directoryDispatch, callback)
      : deleteFile(content.uploadId, parentId)(fileDispatch, callback);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    uiDispatch({ type: "OPEN_CONTENTDETAILS" });
  };

  useEffect(() => {
    if (isCopied)
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
  }, [isCopied]);

  useEffect(() => {
    function handleClickOutside(e) {
      // if (isLoading) return;
      if (actionBarRef.current && !actionBarRef.current.contains(e.target)) {
        //   dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
        // uiDispatch({ type: "CLOSE_CONTENTDETAILS" });
        handleClose();
        // directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiDispatch]);

  return (
    <div
      className={`action_bar ${hidden ? "hidden" : ""}`}
      onMouseDown={(e) => e.stopPropagation()}
      ref={actionBarRef}
    >
      <button className="close_btn btn" onClick={handleClose}>
        <CloseIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
      </button>
      {content?.mimeType ? (
        <>
          {content.mimeType.startsWith("video") ||
          content.mimeType.startsWith("image") ? (
            <button className="media_btn btn" onClick={handleOpenMedia}>
              {content.mimeType.startsWith("video") ? (
                <PlayIcon
                  width={getIconSize(windowWidth)}
                  height={getIconSize(windowWidth)}
                />
              ) : (
                <EyeIcon
                  width={getIconSize(windowWidth)}
                  height={getIconSize(windowWidth)}
                />
              )}
              <span className="action_name">
                {content.mimeType.startsWith("video") ? "Play" : "View"}
              </span>
            </button>
          ) : null}
          <button className="copy_link_btn btn" onClick={handleCopyLink}>
            <LinkIcon
              width={getIconSize(windowWidth)}
              height={getIconSize(windowWidth)}
            />
            <span className="action_name">
              {isCopied ? "Copied!" : "Copy Link"}
            </span>
          </button>
          <button className="download_btn btn" onClick={handleDownload}>
            <DownloadIcon
              width={getIconSize(windowWidth)}
              height={getIconSize(windowWidth)}
            />
            <span className="action_name">Download</span>
          </button>
        </>
      ) : (
        <button className="open_btn btn" onClick={handleOpenFolder}>
          <OpenIcon
            width={getIconSize(windowWidth)}
            height={getIconSize(windowWidth)}
          />
          <span className="action_name">Open</span>
        </button>
      )}

      <button className="rename_btn btn" onClick={handleRename}>
        <RenameIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
        <span className="action_name">Rename</span>
      </button>
      <button className="copy_btn btn" onClick={handleCopy}>
        <CopyIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
        <span className="action_name">Copy</span>
        <div className="feature_status">coming soon</div>
      </button>

      <button className="rename_btn btn" onClick={handleDelete}>
        <DeleteIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
        <span className="action_name">Delete</span>
      </button>

      <button className="rename_btn btn" onClick={handleDetails}>
        <QuestionIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
        <span className="action_name">Details</span>
        <div className="feature_status">coming soon</div>
      </button>
    </div>
  );
}

export default ActionBar;
