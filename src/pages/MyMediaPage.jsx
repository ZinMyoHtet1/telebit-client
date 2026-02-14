import React, { useContext, useEffect, useMemo, useState } from "react";
import "./../styles/myMediaPage.css";

import BackIcon from "../svgs/BackIcon";
import { fileContext } from "../contexts/FileContext";
import { fetchAllFiles } from "../actions/fileActions";
import ContentContainer from "../components/ContentContainer";
import MediaViewer from "./MediaViewer";
import LoadingSpinner from "../svgs/LoadingSpinner";
import ActionBar from "../components/ActionBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mediaQueryContext } from "../contexts/MediaQueryContext";
import ViewMode from "../components/ViewMode";
import VideoCircleIcon from "../svgs/VideoCircleIcon";
import PhotoCircleIcon from "../svgs/PhotoCircleIcon";
import DocumentIcon from "../svgs/DocumentIcon";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";
import SortContentIcon from "../svgs/SortContentIcon";

function MyMediaPage() {
  const [contents, setContents] = useState([]);
  const [showNoContent, setShowNoContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSortMethod, setShowSortMethod] = useState(false);
  const [user, setUser] = useState(null);
  // const [type, setType] = useState("video");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortMethod, setSortMethod] = useState("date_descending");

  const navigate = useNavigate();
  const type = searchParams.get("type");

  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { windowWidth } = useContext(mediaQueryContext);
  const mediaDeleteFileId = fileState?.mediaDeleteFileId;
  //mediaDeleteFileId
  const isError = fileState?.errorMessage;

  const sortMethods = [
    "date_ascending",
    "date_descending",
    "file_size_ascending",
    "file_size_descending",
  ];

  const getIconSize = (width) => {
    if (width < 660) return 16;
    if (width < 820) return 20;
    return 28;
  };

  //   const getIconSize = (windowWidth) => {
  //   switch (true) {
  //     case windowWidth < 820:
  //       return 18;
  //     default:
  //       20;
  //   }
  // };

  const getBackIconSize = (width) => {
    if (width < 380) return 12;
    if (width < 660) return 16;
    if (width < 820) return 20;
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
    setShowSortMethod(true);

    setTimeout(() => {
      setShowSortMethod(false);
    }, 2000);
  };

  const handleChangeType = (type) => {
    // navigate(`?type=${type}`, { replace: true });
    setSearchParams(`type=${type}`);
    // setType()
  };

  useEffect(() => {
    if (!mediaDeleteFileId) return;
    setContents((contents) =>
      contents.filter((content) => content.uploadId !== mediaDeleteFileId),
    );
    fileDispatch({ type: "RESET_DELETE_MEDIA_FILE" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaDeleteFileId]);

  useEffect(() => {
    let user = null;
    if (sessionStorage.getItem("user") !== "undefined")
      user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user === "null") {
      navigate("/auth/login", { replace: true });
      setUser(null);
    }
    setUser(user);
  }, [navigate]);

  /* -------------------- FETCH FILES -------------------- */
  useEffect(() => {
    setIsLoading(true);
    setContents([]);
    fetchAllFiles(type === "photo" ? "image" : type)(fileDispatch, (files) => {
      setContents(files || []);
      fileDispatch({ type: "MEDIA_FILES", payload: files });
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

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

  if (!user) return;
  /* -------------------- RENDER -------------------- */
  return (
    <div id="my_media_page" className="page">
      <MediaViewer />

      <div className="wrapper">
        <ActionBar />
        <OverlayPage>
          <Loading />
        </OverlayPage>
        <div className="page_navbar">
          <button className="back_icon btn" onClick={handleClickBack}>
            <BackIcon
              width={getBackIconSize(windowWidth)}
              height={getBackIconSize(windowWidth)}
            />
          </button>

          <div className="page_name">Media</div>

          {/* <button className="sort_btn btn" onClick={handleSort}>
            {sortMethod}
            <SortContentIcon
              width={getIconSize(windowWidth)}
              height={getIconSize(windowWidth)}
            />
          </button> */}
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
        <div className="bottom_navigator">
          <button
            className={`bn_item_btn btn ${type === "video" ? "active" : ""}`}
            onClick={() => handleChangeType("video")}
          >
            <VideoCircleIcon
              width={getBackIconSize(windowWidth)}
              height={getBackIconSize(windowWidth)}
            />
            <span>Videos</span>
          </button>
          <button
            className={`bn_item_btn btn ${type === "photo" ? "active" : ""}`}
            onClick={() => handleChangeType("photo")}
          >
            <PhotoCircleIcon
              width={getBackIconSize(windowWidth)}
              height={getBackIconSize(windowWidth)}
            />
            <span>Photos</span>
          </button>
          <button
            className={`bn_item_btn btn ${type === "document" ? "active" : ""}`}
            onClick={() => handleChangeType("document")}
          >
            <DocumentIcon
              width={getBackIconSize(windowWidth)}
              height={getBackIconSize(windowWidth)}
            />
            <span>Documents</span>
          </button>
        </div>
        <button className="sort_btn btn" onClick={handleSort}>
          <div
            className={`sort_method_toast ${showSortMethod ? "active" : ""}`}
          >
            {sortMethod}
          </div>
          <SortContentIcon
            width={getBackIconSize(windowWidth)}
            height={getBackIconSize(windowWidth)}
            fillColor="#fff"
          />
        </button>
      </div>
    </div>
  );
}

export default MyMediaPage;
