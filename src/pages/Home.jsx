import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ContentNavbar from "../components/ContentNavbar";
import ContentContainer from "../components/ContentContainer";
import Navbar from "../components/Navbar";

import { directoryContext } from "../contexts/DirectoryContext";

import { fetchDirectories, fetchDirectory } from "../actions/directoryActions";
import { fetchFiles } from "../actions/fileActions";
import { fileContext } from "../contexts/FileContext";
import LoadingSpinner from "../svgs/LoadingSpinner";
import UploadPage from "./UploadPage";

import "./../styles/home.css";
import ActionBar from "../components/ActionBar";
import { uiContext } from "../contexts/UIContext";
import { startWebSocket } from "../utils/socket";
import ViewMode from "../components/ViewMode";
import SideDrawer from "../components/SideDrawer";
import MediaViewer from "./MediaViewer";
// import { socketOpen, socketMessage } from "../utils/socket";

function Home() {
  const navigate = useNavigate();
  // const [openUploadPage, setOpenUploadPage] = useState(false);
  const params = useParams();
  const [contents, setContents] = useState([]);
  const currentDirId = params?.dirId || "root";

  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);

  const isOpenUploadPage = uiState?.uploadPage;

  const isLoading = directoryState.isLoading || fileState.isLoading;
  const mainDirectory = directoryState.currentDirectory || null;
  const childDirectories = directoryState.childDirectories;
  const files = fileState.files;

  useEffect(() => {
    startWebSocket((data) =>
      fileDispatch({ type: "SET_PERCENT", payload: data.percent })
    );
    // socketOnMessage((data) => setProgress(data.percent));
  }, [fileDispatch]);

  useEffect(() => {
    uiDispatch({ type: isLoading ? "START_LOADING" : "STOP_LOADING" });
  }, [isLoading, uiDispatch]);

  useEffect(() => {
    setContents([...childDirectories, ...files]);
  }, [childDirectories, files]);

  useEffect(() => {
    directoryDispatch({ type: "RESET" });
    fileDispatch({ type: "RESET" });

    if (currentDirId === "root") {
      navigate("/", { replace: true });
    }
    fetchDirectory(currentDirId)(directoryDispatch);
  }, [currentDirId, directoryDispatch, fileDispatch, navigate]);

  useEffect(() => {
    if (!mainDirectory?.id) return;
    const fetchPromises = [];

    if (mainDirectory?.childDirIds.length)
      fetchPromises.push(
        fetchDirectories(mainDirectory.childDirIds)(directoryDispatch)
      );
    if (mainDirectory?.parentDirIds?.length)
      fetchPromises.push(
        fetchDirectories(
          mainDirectory.parentDirIds,
          "FETCH_PARENTDIRECTORIES"
        )(directoryDispatch)
      );

    if (mainDirectory?.files?.length)
      fetchPromises.push(fetchFiles(mainDirectory.files)(fileDispatch));
    Promise.all(fetchPromises);
  }, [directoryDispatch, fileDispatch, mainDirectory]);

  return (
    <div id="home_page" className="page">
      {isOpenUploadPage ? <UploadPage /> : null}
      <MediaViewer />

      <div className="wrapper">
        <Navbar />
        <ContentNavbar />
        <SideDrawer />
        <div
          className="view_mode_container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0",
          }}
        >
          <LoadingSpinner
            className={`loading_spinner ${isLoading ? "active" : ""}`}
            width={24}
            height={24}
          />
          <ViewMode />
        </div>

        <ActionBar />

        {contents?.length ? (
          <ContentContainer
            contents={contents.sort((a, b) => a.createdAt - b.createdAt)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
