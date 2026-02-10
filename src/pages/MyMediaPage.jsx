import React, { useContext, useEffect, useMemo, useState } from "react";
import "./../styles/myMediaPage.css";

import BackIcon from "../svgs/BackIcon";
import { fileContext } from "../contexts/FileContext";
import { fetchAllFiles } from "../actions/fileActions";
import ContentContainer from "../components/ContentContainer";
import MediaViewer from "./MediaViewer";
import LoadingSpinner from "../svgs/LoadingSpinner";
import ActionBar from "../components/ActionBar";
import { useNavigate } from "react-router-dom";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
import ViewMode from "../components/ViewMode";

function MyMediaPage() {
  const [contents, setContents] = useState([]);
  const [showNoContent, setShowNoContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState("date_descending");

  const navigate = useNavigate();

  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const isError = fileState?.errorMessage;

  const sortMethods = [
    "date_ascending",
    "date_descending",
    "file_size_ascending",
    "file_size_descending",
  ];

  const getIconSize = (width) => {
    if (width < 660) return 20;
    if (width < 820) return 24;
    return 28;
  };

  const handleClickBack = () => {
    // history.back();
    navigate("/", { replace: true });
  };

  const handleSort = () => {
    const currentIndex = sortMethods.indexOf(sortMethod);
    const nextIndex = (currentIndex + 1) % sortMethods.length;
    setSortMethod(sortMethods[nextIndex]);
  };

  /* -------------------- FETCH FILES -------------------- */
  useEffect(() => {
    fetchAllFiles("video")(fileDispatch, (files) => {
      setContents(files || []);
      setIsLoading(false);
    });
  }, [fileDispatch]);

  /* -------------------- EMPTY STATE TIMER -------------------- */
  useEffect(() => {
    if (!isLoading && !contents.length) {
      const timer = setTimeout(() => {
        setShowNoContent(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowNoContent(false);
    }
  }, [isLoading, contents]);

  /* -------------------- SORTED CONTENTS (DERIVED STATE) -------------------- */
  const sortedContents = useMemo(() => {
    if (!contents.length) return [];

    const sorted = contents
      .filter((c) => c !== null)
      .slice()
      .sort((a, b) => {
        switch (sortMethod) {
          case "date_ascending":
            return a.createdAt - b.createdAt;
          case "date_descending":
            return b.createdAt - a.createdAt;
          case "file_size_ascending":
            return Number(a.size) - Number(b.size);
          case "file_size_descending":
            return Number(b.size) - Number(a.size);
          default:
            return 0;
        }
      });

    return sorted;
  }, [contents, sortMethod]);

  /* -------------------- RENDER -------------------- */
  return (
    <div id="my_media_page" className="page">
      <MediaViewer />

      <div className="wrapper">
        <ActionBar />

        <div className="page_navbar">
          <button className="back_icon btn" onClick={handleClickBack}>
            <BackIcon />
          </button>

          <div className="page_name">Videos</div>

          <button className="sort_btn btn" onClick={handleSort}>
            {sortMethod}
          </button>
        </div>

        <div className="view_mode_container">
          <LoadingSpinner
            className={`loading_spinner ${isLoading ? "active" : ""}`}
            width={getIconSize(windowWidth)}
            height={getIconSize(windowWidth)}
          />
          <ViewMode />
        </div>

        {sortedContents.length ? (
          <ContentContainer contents={sortedContents} />
        ) : !isLoading && showNoContent && !isError ? (
          <div className="empty_directory_message">no directories or files</div>
        ) : null}
      </div>
    </div>
  );
}

export default MyMediaPage;
