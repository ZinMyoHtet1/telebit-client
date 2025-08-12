import React, { useContext } from "react";
import ListViewIcon from "../svgs/ListViewIcon";
import ThumbnailViewIcon from "../svgs/ThumbnailViewIcon";

import "./../styles/viewMode.css";
import { uiContext } from "../contexts/UIContext";
function ViewMode() {
  const { state, dispatch } = useContext(uiContext);

  const handleClickList = () => {
    if (state?.isLoading) return;
    dispatch({ type: "SET_LIST_VIEW" });
  };

  const handleClickThumbnail = () => {
    if (state?.isLoading) return;
    dispatch({ type: "SET_THUMBNAIL_VIEW" });
  };

  return (
    <div id="view_mode">
      <button
        id="list_view"
        className={`btn ${state?.viewMode === "list" ? "selected" : ""}`}
        onClick={handleClickList}
      >
        <ListViewIcon
          fillColor={state?.viewMode === "list" ? "#fff" : "#000"}
        />
      </button>
      <button
        id="thumbnail_view"
        className={`btn ${state?.viewMode === "thumbnail" ? "selected" : ""}`}
        onClick={handleClickThumbnail}
      >
        <ThumbnailViewIcon
          fillColor={state?.viewMode === "thumbnail" ? "#fff" : "#000"}
        />
      </button>
    </div>
  );
}

export default ViewMode;
