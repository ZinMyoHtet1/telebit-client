import React, { useContext, useEffect, useRef, useState } from "react";
import getFileIcon from "../utils/getFileIcon";
import formatName from "../utils/formatName";
import FolderSolid from "../svgs/FolderSolid";
import Skeleton from "./Skeleton";

import "./../styles/contentCard.css";

import { useNavigate } from "react-router-dom";
import { directoryContext } from "../contexts/DirectoryContext";
import { createDirectory, renameDirectory } from "../actions/directoryActions";
import { renameFile } from "../actions/fileActions";
import { fileContext } from "../contexts/FileContext";
import { uiContext } from "../contexts/UIContext";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

function ContentCard({ content, ...rest }) {
  const { state, dispatch } = useContext(directoryContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const [contentName, setContentName] = useState();
  const [contentReName, setContentReName] = useState(
    content?.name || content?.filename || "",
  );
  const [showCard, setShowCard] = useState(false);

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const clickTimeout = useRef(null);

  const currentDirId = state?.currentDirectory?.id;
  const isActive = content?.id
    ? state?.activeContent?.id === content?.id
    : state?.activeContent?.uploadId === content.uploadId;

  const activeRenaming = uiState?.activeRenaming;
  const isLoading = state?.isLoading || fileState?.isLoading;

  const folderIconSize =
    uiState?.viewMode === "list"
      ? windowWidth < 660
        ? 26
        : windowWidth < 820
          ? 28
          : 30
      : windowWidth < 660
        ? 60
        : windowWidth < 820
          ? 60
          : 70;

  // --- Event Handlers ---

  const handleClick = () => {
    if (isLoading) return;

    // Clear any existing timeout
    if (clickTimeout.current) clearTimeout(clickTimeout.current);

    // Set a timeout for single-click action
    clickTimeout.current = setTimeout(() => {
      dispatch({ type: "SET_ACTIVE_CONTENT", payload: content });
      clickTimeout.current = null;
    }, 200); // 250ms is a good delay for differentiating clicks
  };

  const handleDoubleClick = () => {
    if (isLoading) return;

    // Cancel single-click timeout when double-click happens
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }

    dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });

    if (content.mimeType) {
      uiDispatch({ type: "OPEN_MEDIAVIEWER" });
      // console.log(content, "content card content");
      fileDispatch({ type: "SET_MEDIA_CONTENT", payload: content });
    } else {
      navigate(`/${content.id}`);
    }
  };

  const handleChangeInput = (e) => setContentName(e.target.value.trimStart());
  const handleChangeRenameInput = (e) =>
    setContentReName(e.target.value.trimStart());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeRenaming) handleRenameContent();
      else handleCreateFolder();
    }
    if (e.key === "Escape") dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
  };

  const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

  const handleCreateFolder = () => {
    if (!currentDirId || !contentName.trim()) {
      dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
      return;
    }

    openOverlayPage();
    uiDispatch({ type: "START_CREATING_FOLDER" });

    createDirectory({ name: contentName, parentId: currentDirId })(
      dispatch,
      () => {
        uiDispatch({ type: "STOP_CREATING_FOLDER" });
        closeOverlayPage();
      },
    );
  };

  const handleRenameContent = () => {
    if (
      !contentReName.trim() ||
      contentReName === (content.name || content.filename)
    ) {
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      return;
    }

    openOverlayPage();
    uiDispatch({ type: "START_RENAMING" });

    const callback = () => {
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      // setContentReName(content?.filename || content?.name || "");
      uiDispatch({ type: "STOP_RENAMING" });
      closeOverlayPage();
    };

    if (content?.id)
      renameDirectory(content.id, contentReName)(dispatch, callback);
    else renameFile(content.uploadId, contentReName)(fileDispatch, callback);
  };

  // console.log("contentcard", content);

  useEffect(() => {
    setContentReName(content?.filename || content?.name || "");
  }, [content?.filename, content?.name]);

  // --- Render ---
  if (content.mimeType) {
    return (
      <div
        className={`content_card ${isActive ? "active" : ""} ${
          uiState?.viewMode === "list" ? "list" : ""
        }`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        {...rest}
      >
        {!showCard && (
          <div className="content_card_skeleton">
            <Skeleton className="skeleton-thumb" />
            <Skeleton className="skeleton-text" />
          </div>
        )}
        <img
          className={`content_icon ${showCard ? "" : "hidden"} ${
            content.mimeType.startsWith("video") ? "video" : ""
          }`}
          src={
            content.thumbnail
              ? content.thumbnail
              : content.mimeType.startsWith("image")
                ? content?.thumbnail || content.watch
                : getFileIcon(
                    content.mimeType,
                    content.filename.split(".").at(-1),
                  )
          }
          onLoad={() => setShowCard(true)}
        />
        {isActive && activeRenaming ? (
          <input
            type="text"
            className="folder_name_input"
            autoFocus
            value={contentReName}
            onBlur={handleRenameContent}
            onChange={handleChangeRenameInput}
            onKeyDown={handleKeyDown}
          />
        ) : showCard ? (
          <div className="content_name">{formatName(content.filename, 15)}</div>
        ) : null}
      </div>
    );
  }

  // Folder card
  if (!content?.id.startsWith("temp-")) {
    return (
      <div
        className={`content_card ${isActive ? "active" : ""} ${
          uiState?.viewMode === "list" ? "list" : ""
        }`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        {...rest}
      >
        <FolderSolid width={folderIconSize} height={folderIconSize} />
        {activeRenaming && isActive ? (
          <input
            type="text"
            className="folder_name_input"
            autoFocus
            value={contentReName}
            onBlur={handleRenameContent}
            onChange={handleChangeRenameInput}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="folder_name">{content.name}</div>
        )}
      </div>
    );
  }

  // Temporary new folder input
  return (
    <div className="content_card">
      <FolderSolid width={folderIconSize} height={folderIconSize} />
      <input
        type="text"
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

export default ContentCard;
