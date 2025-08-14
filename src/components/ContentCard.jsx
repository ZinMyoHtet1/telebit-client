import React, { useContext, useEffect, useRef, useState } from "react";
import getFileIcon from "../utils/getFileIcon";
import formatName from "../utils/formatName";

import FolderSolid from "../svgs/FolderSolid";

import "./../styles/contentCard.css";
import { useNavigate } from "react-router-dom";
import { directoryContext } from "../contexts/DirectoryContext";
import { createDirectory, renameDirectory } from "../actions/directoryActions";
import { renameFile } from "../actions/fileActions";
import { fileContext } from "../contexts/FileContext";
import { uiContext } from "../contexts/UIContext";

// dispatch({ type: "REMOVE_ACTIVE_RENAMING" });

function ContentCard({ content, ...rest }) {
  const { state, dispatch } = useContext(directoryContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const [contentName, setcontentName] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const currentDirId = state?.currentDirectory?.id;
  const isActive = content?.id
    ? state?.activeContent?.id === content?.id
    : state?.activeContent?.uploadId === content.uploadId;
  const activeRenaming = uiState?.activeRenaming;
  const isLoading = state?.isLoading || fileState?.isLoading;

  const handleOpenActive = () => {
    dispatch({
      type: "SET_ACTIVE_CONTENT",
      payload: content,
    });
  };

  const closeOverlayPage = () => {
    uiDispatch({ type: "CLOSE_OVERLAYPAGE" });
  };
  const openOverlayPage = () => {
    uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  };

  const handleCloseActive = () => {
    dispatch({
      type: "SET_ACTIVE_CONTENT",
      payload: null,
    });
  };

  const handleChangeInput = (e) => {
    if (isLoading) return;

    e.preventDefault();
    setcontentName(e.target.value.trimStart());
  };

  const handleClick = () => {
    if (isLoading) return;
    setClickCount((previous) => previous + 1);
    setTimeout(() => setClickCount(0), 1000);
  };

  const handleDoubleClickOnMedia = (e) => {
    e.stopPropagation();
    handleCloseActive();
    uiDispatch({ type: "OPEN_MEDIAVIEWER" });
    fileDispatch({ type: "SET_MEDIA_CONTENT", payload: content });
    // if (content?.watch) window.open(content.watch, "_blank");
  };

  const handleDoubleClickOnFolder = (e) => {
    e.stopPropagation();
    navigate(`/${content.id}`);

    dispatch({
      type: "SET_ACTIVE_CONTENT",
      payload: null,
    });
  };

  const handleKeyDown = (e) => {
    if (isLoading) return;
    if (e.key === "Enter") {
      openOverlayPage();
      if (activeRenaming) {
        // console.log("rename clicke");
        handleRenameContent(e);
      } else {
        handleCreateFolder(e);
      }
    }
    if (e.key === "Escape") {
      dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
    }
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!currentDirId || isLoading) return;

    if (!contentName.trim()) {
      // Optionally remove temp folder instead
      dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
      return;
    }
    function callback() {
      uiDispatch({ type: "STOP_CREATING_FOLDER" });
      closeOverlayPage();
    }

    openOverlayPage();
    uiDispatch({ type: "START_CREATING_FOLDER" });
    createDirectory({ name: contentName, parentId: currentDirId })(
      dispatch,
      callback
    );
    // uiDispatch({ type: "REMOVE_TEMP_DIRECTORY" });
  };

  const handleRenameContent = (e) => {
    e.preventDefault();

    function callback() {
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      setcontentName("");
      uiDispatch({ type: "STOP_RENAMING" });
      closeOverlayPage();
    }

    if (!contentName.trim()) {
      // Optionally remove temp folder instead
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      return;
    }
    uiDispatch({ type: "START_RENAMING" });
    openOverlayPage();
    content?.id
      ? renameDirectory(content.id, contentName)(dispatch, callback)
      : renameFile(content.uploadId, contentName)(fileDispatch, callback);
  };

  useEffect(() => {
    setTimeout(() => {
      if (clickCount === 1) handleOpenActive();
      if (clickCount === 2) handleCloseActive();
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (isLoading) return;
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
        uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch, uiDispatch, isLoading]);
  if (content.mimeType)
    return (
      <div
        className={`content_card ${isActive ? "active" : ""} ${
          uiState?.viewMode === "list" ? "list" : ""
        }`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClickOnMedia}
        onBlur={() => dispatch({ type: "SET_ACTIVE_CONTENT", payload: null })}
        {...rest}
      >
        <img
          className={`content_icon ${
            content.mimeType.startsWith("video") ? "video" : ""
          } ${
            content.mimeType.startsWith("video") ||
            content.mimeType.startsWith("image")
              ? "media"
              : ""
          }`}
          src={
            content.thumbnail
              ? content.thumbnail
              : content.mimeType.startsWith("image")
              ? content.watch
              : getFileIcon(
                  content.mimeType,
                  content.filename.split(".").at(-1)
                )
          }
        />
        {isActive && activeRenaming ? (
          <input
            type="text"
            name="folderName"
            className="folder_name_input"
            autoFocus
            value={contentName}
            onBlur={handleRenameContent}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="content_name">{formatName(content.filename, 15)}</div>
        )}
      </div>
    );

  if (!content?.id.startsWith("temp-")) {
    return (
      <div
        className={`content_card ${isActive ? "active" : ""} ${
          uiState?.viewMode === "list" ? "list" : ""
        }`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClickOnFolder}
        {...rest}
      >
        <FolderSolid
          className="content_icon"
          width={uiState?.viewMode === "list" ? 28 : 60}
          height={uiState?.viewMode === "list" ? 28 : 60}
        />
        {activeRenaming && isActive ? (
          <input
            type="text"
            name="folderName"
            className="folder_name_input"
            autoFocus
            value={contentName}
            onBlur={handleRenameContent}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="content_name folder_name">{content.name}</div>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`content_card ${uiState?.viewMode === "list" ? "list" : ""}`}
        {...rest}
      >
        <FolderSolid
          className="content_icon folder"
          width={uiState?.viewMode === "list" ? 28 : 60}
          height={uiState?.viewMode === "list" ? 28 : 60}
        />
        <input
          type="text"
          name="folderName"
          className="folder_name_input"
          autoFocus
          value={contentName}
          onBlur={handleCreateFolder}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }
}

export default ContentCard;
