import React, { useState, useRef, useEffect, useContext } from "react";
import timeAgo from "../utils/timeAgo";

import "./../styles/trashCard.css";
import formatName from "../utils/formatName";

import { deleteTrash, retrieveTrash } from "../actions/trashActions.js";
import { trashContext } from "../contexts/TrashContext";
import { uiContext } from "../contexts/UIContext.js";
import { mediaQueryContext } from "../contexts/MediaQueryContext.jsx";
import FolderSolid from "../svgs/FolderSolid.jsx";
import getFileIcon from "../utils/getFileIcon.js";
import { fileContext } from "../contexts/FileContext.js";
import { directoryContext } from "../contexts/DirectoryContext.js";

function TrashCard({ content, ...rest }) {
  const [showActions, setShowActions] = useState(false);
  const cardRef = useRef(null);
  const { state: uiState } = useContext(uiContext);
  const { dispatch: fileDispatch } = useContext(fileContext);
  const { dispatch: directoryDispatch } = useContext(directoryContext);
  const { dispatch: trashDispatch } = useContext(trashContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const retrieveCallback = (content) => {
    content.mimeType
      ? fileDispatch({ type: "RETRIEVE_TRASH", payload: content })
      : directoryDispatch({ type: "RETRIEVE_TRASH", payload: content });
  };

  const handleClickCard = () => {
    setShowActions(true);
  };

  const deleteTrashById = (id) => {
    deleteTrash(id)(trashDispatch);
  };

  const retrieveTrashContent = (content) => {
    retrieveTrash(content)(trashDispatch, retrieveCallback);
  };

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowActions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`trash_card ${showActions ? "active" : ""}`}
      ref={cardRef}
      {...rest}
      onClick={handleClickCard}
    >
      {content.type === "file" ? (
        <>
          <img
            className="thumbnail_img"
            src={
              content.data?.thumbnail
                ? content.data.thumbnail
                : getFileIcon(
                    content.data.mimeType,
                    content.data.filename.split(".").at(-1)
                  )
            }
            alt="thumbnail"
          />
          <div className="name">{formatName(content.data.filename, 15)}</div>
        </>
      ) : (
        <>
          <FolderSolid width={folderIconSize} height={folderIconSize} />
          <div className="name folder_name">
            {formatName(content.data.name, 15)}
          </div>
        </>
      )}
      <div className="deleted_at">{timeAgo(content.deletedAt)}</div>

      {showActions && (
        <div className="actions">
          <button
            className="delete btn"
            onClick={() => deleteTrashById(content._id)}
          >
            Delete
          </button>
          <button
            className="retrieve btn"
            onClick={() => retrieveTrashContent(content)}
          >
            Retrieve
          </button>
        </div>
      )}
    </div>
  );
}

export default TrashCard;
