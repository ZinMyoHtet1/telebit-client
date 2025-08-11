import React, { useContext } from "react";
import { directoryContext } from "./../contexts/DirectoryContext";

import "./../styles/actionBar.css";
import { uiContext } from "../contexts/UIContext";
import { deleteDirectory } from "../actions/directoryActions";
import { fileContext } from "../contexts/FileContext";

function ActionBar() {
  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);
  const { state: fileState } = useContext(fileContext);
  const { dispatch: uiDispatch } = useContext(uiContext);

  const isActive =
    directoryState?.activeContent?.id ||
    directoryState?.activeContent?.uploadId;
  const content = directoryState?.activeContent;

  const isLoading = directoryState?.isLoading || fileState?.isLoading;

  const handleRename = (e) => {
    e.stopPropagation();
    if (isLoading) return;
    uiDispatch({ type: "ACTIVE_RENAMING" });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    if (content?.id) {
      deleteDirectory(content.id)(directoryDispatch);
      directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
    }
  };

  return (
    <div
      className={`action_bar ${!isActive || isLoading ? "hidden" : ""}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button className="rename_btn btn" onClick={handleRename}>
        Rename
      </button>
      <button className="rename_btn btn">Copy</button>
      <button className="rename_btn btn">Paste</button>
      <button className="rename_btn btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default ActionBar;
