import React, { useState, useRef, useEffect, useContext } from "react";
import timeAgo from "../utils/timeAgo";

import "./../styles/trashCard.css";
import formatName from "../utils/formatName";

import { deleteTrash } from "../actions/trashActions.js";
import { trashContext } from "../contexts/TrashContext";
import { uiContext } from "../contexts/UIContext.js";
import { mediaQueryContext } from "../contexts/MediaQueryContext.jsx";
import FolderSolid from "../svgs/FolderSolid.jsx";
import getFileIcon from "../utils/getFileIcon.js";

function TrashCard({ content, ...rest }) {
  const [showActions, setShowActions] = useState(false);
  const cardRef = useRef(null);
  const { state: uiState } = useContext(uiContext);
  const { dispatch: trashDispatch } = useContext(trashContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const handleClickCard = () => {
    setShowActions(true);
  };

  const deleteTrashById = (id) => {
    deleteTrash(id)(trashDispatch);
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
          <div className="name">{formatName(content.data.name, 15)}</div>
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
          <button className="retrieve btn">Retrieve</button>
        </div>
      )}
    </div>
  );
}

export default TrashCard;
