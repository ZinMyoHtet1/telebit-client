import React, { useContext, useEffect, useState } from "react";
import "./../styles/myMediaPage.css";

import BackIcon from "../svgs/BackIcon";
import { fileContext } from "../contexts/FileContext";
import { fetchAllFiles, fetchFiles } from "../actions/fileActions";
import ContentContainer from "../components/ContentContainer";
import MediaViewer from "./MediaViewer";
import LoadingSpinner from "../svgs/LoadingSpinner";
import ActionBar from "../components/ActionBar";
import { useNavigate } from "react-router-dom";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
import ViewMode from "../components/ViewMode";
// import ListView from "../components/ListView";
// import DownloadItem from "../components/DownloadItem";
// import { fileContext } from "../contexts/FileContext";

function MyMediaPage() {
  const [contents, setContents] = useState([]);
  const [showNoContent, setShowNoContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState("date_descending");
  const navigate = useNavigate();

  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { windowWidth } = useContext(mediaQueryContext);

  let files = fileState?.files;
  const isError = fileState?.errorMessage;

  const sortMethods = [
    "date_ascending",
    "date_descending",
    "file_size_ascending",
    "file_size_descending",
  ];

  const getIconSize = (windowWidth) => {
    switch (true) {
      // case windowWidth < 380:
      //   return 16;
      case windowWidth < 660:
        return 20;
      case windowWidth < 820:
        return 24;
      case windowWidth > 820:
        return 28;
      default:
        28;
    }
  };

  const handleClickBack = () => {
    navigate("/", { replace: true });
  };

  const handleSort = () => {
    const currentIndex = sortMethods.indexOf(sortMethod);
    const nextIndex = (currentIndex + 1) % sortMethods.length;
    setSortMethod(sortMethods[nextIndex]);
  };

  useEffect(() => {
    fetchAllFiles("video")(fileDispatch, (files) => {
      const uploadIds = files.map((file) => file.uploadId);
      fetchFiles(uploadIds)(fileDispatch, () => setIsLoading(false));
    });
  }, [fileDispatch]);

  useEffect(() => {
    setContents(files.filter((c) => c !== null));
  }, [files]);

  useEffect(() => {
    if (!isLoading && !contents?.length) {
      const timer = setTimeout(() => setShowNoContent(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNoContent(false);
    }
  }, [isLoading, contents]);

  useEffect(() => {
    if (!files) return;

    let sorted = [...files].filter((c) => c !== null);

    switch (sortMethod) {
      case "date_ascending":
        sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;

      case "date_descending":
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;

      case "file_size_ascending":
        sorted.sort((a, b) => Number(a.size) - Number(b.size));
        break;

      case "file_size_descending":
        sorted.sort((a, b) => Number(b.size) - Number(a.size));
        break;

      default:
        break;
    }

    setContents(sorted);
  }, [files, sortMethod]);

  return (
    <div id="my_media_page" className="page">
      <MediaViewer />

      <div className="wrapper">
        {/* <Navbar />
        <SideDrawer /> */}
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
        {/* <LoadingSpinner
          className={`loading_spinner ${isLoading ? "active" : ""}`}
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        /> */}
        {contents?.length ? (
          <ContentContainer contents={contents} />
        ) : !isLoading && showNoContent && !isError ? (
          <div className="empty_directory_message">no directories or files</div>
        ) : null}
      </div>
    </div>
  );
}

export default MyMediaPage;
