import React, { useContext, useEffect } from "react";
import ListViewIcon from "../svgs/ListViewIcon";
import ThumbnailViewIcon from "../svgs/ThumbnailViewIcon";

import "./../styles/viewMode.css";
import { uiContext } from "../contexts/UIContext";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
function ViewMode() {
  const { state, dispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 380:
        return 10;
      case windowWidth < 660:
        return 12;
      case windowWidth < 820:
        return 16;
      case windowWidth > 820:
        return 18;
      default:
        18;
    }
  };

  const handleClickList = () => {
    if (state?.isLoading) return;
    dispatch({ type: "SET_LIST_VIEW" });
    localStorage.setItem("viewMode", "list");
  };

  const handleClickThumbnail = () => {
    if (state?.isLoading) return;
    dispatch({ type: "SET_THUMBNAIL_VIEW" });
    localStorage.setItem("viewMode", "thumbnail");
  };

  useEffect(() => {
    const viewMode = localStorage.getItem("viewMode") || "thumbnail";
    viewMode === "thumbnail"
      ? dispatch({ type: "SET_THUMBNAIL_VIEW" })
      : dispatch({ type: "SET_LIST_VIEW" });
  }, [dispatch]);

  return (
    <div id="view_mode">
      <button
        id="list_view"
        className={`btn ${state?.viewMode === "list" ? "selected" : ""}`}
        onClick={handleClickList}
      >
        <ListViewIcon
          fillColor={state?.viewMode === "list" ? "#fff" : "#000"}
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
      </button>
      <button
        id="thumbnail_view"
        className={`btn ${state?.viewMode === "thumbnail" ? "selected" : ""}`}
        onClick={handleClickThumbnail}
      >
        <ThumbnailViewIcon
          fillColor={state?.viewMode === "thumbnail" ? "#fff" : "#000"}
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
      </button>
    </div>
  );
}

export default ViewMode;
