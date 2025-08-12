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

function ContentListCard({ content, ...rest }) {
  const { state, dispatch } = useContext(directoryContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const [contentName, setcontentName] = useState("");
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const currentDirId = state?.currentDirectory?.id;
  const isActive = content?.id
    ? state?.activeContent?.id === content?.id
    : state?.activeContent?.uploadId === content.uploadId;
  const isRenaming = uiState?.isRenaming;
  const isLoading = state?.isLoading || fileState?.isLoading;

  const handleChangeInput = (e) => {
    if (isLoading) return;

    e.preventDefault();
    setcontentName(e.target.value.trimStart());
  };

  const handleClick = () => {
    if (isLoading) return;
    dispatch({
      type: "SET_ACTIVE_CONTENT",
      payload: content,
    });
  };

  const handleKeyDown = (e) => {
    if (isLoading) return;
    if (e.key === "Enter") {
      if (isRenaming) {
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
    createDirectory({ name: contentName, parentId: currentDirId })(dispatch);
    // uiDispatch({ type: "REMOVE_TEMP_DIRECTORY" });
  };

  const handleRenameContent = (e) => {
    e.preventDefault();

    function callback() {
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      setcontentName("");
    }

    if (!contentName.trim()) {
      // Optionally remove temp folder instead
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      return;
    }
    content?.id
      ? renameDirectory(content.id, contentName)(dispatch, callback)
      : renameFile(content.uploadId, contentName)(fileDispatch, callback);
  };

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
        className={`content_card ${isActive ? "active" : ""}`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={() => window.open(content.watch, "_blank")}
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
        {isActive && isRenaming ? (
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

  if (!content.id.startsWith("temp-")) {
    return (
      <div
        className={`content_card ${isActive ? "active" : ""}`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={(e) => {
          e.stopPropagation();
          navigate(`/${content.id}`);
        }}
        {...rest}
      >
        <FolderSolid className="content_icon" width={60} height={60} />
        {isRenaming && isActive ? (
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
      <div className="content_card" {...rest}>
        <FolderSolid className="content_icon folder" width={60} height={60} />
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

export default ContentListCard;
