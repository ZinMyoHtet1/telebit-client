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
// import UploadPage from "./UploadPage";

import "./../styles/home.css";
import ActionBar from "../components/ActionBar";
import { uiContext } from "../contexts/UIContext";
import { startWebSocket } from "../utils/socket";
import ViewMode from "../components/ViewMode";
import SideDrawer from "../components/SideDrawer";
import MediaViewer from "./MediaViewer";
import ErrorMessage from "../components/ErrorMessage";
import UploadFile from "./UploadFile";
import UploadingStatus from "../components/UploadingStatus";
import OverlayPage from "./OvelayPage";
import Loading from "../components/Loading";

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
  // const isDeleting = fileState?.isDeleting;

  const isLoading = directoryState.isLoading || fileState.isLoading;
  const mainDirectory = directoryState.currentDirectory || null;
  const childDirectories = directoryState.childDirectories;
  const files = fileState?.files;

  useEffect(() => {
    startWebSocket((data) =>
      fileDispatch({ type: "SET_PERCENT", payload: data.percent })
    );
  }, [fileDispatch]);

  useEffect(() => {
    uiDispatch({ type: isLoading ? "START_LOADING" : "STOP_LOADING" });
  }, [isLoading, uiDispatch]);

  useEffect(() => {
    setContents([...childDirectories, ...files]);
  }, [childDirectories, files]);

  useEffect(() => {
    if (mainDirectory?.id === currentDirId) return;

    directoryDispatch({ type: "RESET" });
    fileDispatch({ type: "RESET" });

    if (currentDirId === "root") {
      navigate("/", { replace: true });
    }
    fileDispatch({ type: "SET_PARENTID", payload: currentDirId });
    fetchDirectory(currentDirId)(directoryDispatch);
  }, [
    currentDirId,
    directoryDispatch,
    fileDispatch,
    mainDirectory?.id,
    navigate,
  ]);

  useEffect(() => {
    if (!mainDirectory?.id) return;
    if (childDirectories.length || files.length) return;

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
  }, [childDirectories, directoryDispatch, fileDispatch, files, mainDirectory]);

  return (
    <div id="home_page" className="page">
      {isOpenUploadPage ? <UploadFile /> : null}
      <MediaViewer />

      <UploadingStatus />
      <div className="wrapper">
        <Navbar />
        <ContentNavbar />
        <SideDrawer />

        <OverlayPage>
          <Loading />
        </OverlayPage>

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
        <ErrorMessage />

        {contents?.length ? (
          <ContentContainer
            contents={contents.sort((a, b) => a.createdAt - b.createdAt)}
          />
        ) : !isLoading ? (
          () => {
            setTimeout(() => "No directories or files"), 2000;
          }
        ) : null}
      </div>
    </div>
  );
}

export default Home;
