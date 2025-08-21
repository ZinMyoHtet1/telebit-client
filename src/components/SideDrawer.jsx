import React, { useContext, useEffect, useRef } from "react";
import "./../styles/sideDrawer.css";
import { uiContext } from "../contexts/UIContext";
import DeleteIcon from "../svgs/DeleteIcon";
import StatsIcon from "../svgs/StatsIcon";
import CloseIcon from "../svgs/CloseIcon";
import SettingIcon from "../svgs/SettingIcon";
import LogoutIcon from "../svgs/LogoutIcon";
import UploadIcon from "../svgs/UploadIcon";
import CreateFolderIcon from "../svgs/CreateFolderIcon";
import { directoryContext } from "../contexts/DirectoryContext";
import DownloadIcon from "../svgs/DownloadIcon";
import { useNavigate } from "react-router-dom";
// import HomeIcon from "../svgs/HomeIcon";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

import logo from "../assets/app-logo.png";
// import { fileContext } from "../contexts/FileContext";
import { authContext } from "../contexts/AuthContext";
function SideDrawer() {
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { dispatch: authDispatch } = useContext(authContext);
  // const { dispatch: fileDispatch } = useContext(fileContext);
  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const navigate = useNavigate();
  const drawerRef = useRef();

  const directory = directoryState?.currentDirectory;

  const getIconSize = (windowWidth) => {
    switch (true) {
      case windowWidth < 1000:
        return 22;
      case windowWidth > 1000:
        return 24;
      default:
        24;
    }
  };

  const handleClose = () => {
    uiDispatch({ type: "CLOSE_SIDEDRAWER" });
  };

  const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

  const handleClickLogout = () => {
    authDispatch({ type: "LOGOUT" });
    openOverlayPage();
    handleClose();

    setTimeout(() => {
      localStorage.setItem("token", null);
      sessionStorage.setItem("user", null);
    }, 2000);
    setTimeout(() => {
      navigate("/auth/login", { replace: true });
      closeOverlayPage();
    }, 3000);
  };
  const handleClickDownloads = () => {
    navigate("/downloads");
    handleClose();
  };

  const handleClickUploads = () => {
    navigate("/uploads");
    handleClose();
  };
  // const handleClickHome = () => {
  //   navigate("/", { replace: true });
  // };
  const handleCreateFolder = () => {
    if (directory?.id) directoryDispatch({ type: "ADD_TEMP_DIRECTORY" });
    handleClose();
  };

  const handleUploadFile = () => {
    uiDispatch({ type: "OPEN_UPLOADPAGE" });
    handleClose();
  };

  useEffect(() => {
    function handleClickOutside(e) {
      // if (isLoading) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        //   dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
        uiDispatch({ type: "CLOSE_SIDEDRAWER" });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [uiDispatch]);
  return (
    <div
      id="side_drawer"
      className={`${uiState?.sideDrawer ? "" : "hidden"}`}
      ref={drawerRef}
    >
      <button className="close_btn btn" onClick={handleClose}>
        <CloseIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
        />
      </button>
      <div className="app_name">
        <img src={logo} alt="app_logo" />
      </div>
      <button className="drawer_item btn" onClick={handleUploadFile}>
        <UploadIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Upload File</span>
      </button>
      <button className="drawer_item btn" onClick={handleCreateFolder}>
        <CreateFolderIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Create Folder</span>
      </button>
      <button className="drawer_item btn" onClick={handleClickDownloads}>
        <DownloadIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Downloads</span>
      </button>
      <button className="drawer_item btn" onClick={handleClickUploads}>
        <UploadIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Uploads</span>
      </button>
      <button className="drawer_item btn">
        <DeleteIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>trash</span>
      </button>
      <button className="drawer_item btn">
        <StatsIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Statistics</span>
      </button>
      <button className="drawer_item btn">
        <SettingIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Setting</span>
      </button>
      <button className="drawer_item btn" onClick={handleClickLogout}>
        <LogoutIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default SideDrawer;
