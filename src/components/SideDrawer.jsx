import React, { useContext, useEffect, useRef, useState } from "react";
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
import { authContext } from "../contexts/AuthContext";
import formatFileSize from "../utils/formatFileSize";

import { googleLogout } from "@react-oauth/google";

function SideDrawer() {
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { dispatch: authDispatch } = useContext(authContext);
  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const navigate = useNavigate();
  const drawerRef = useRef();
  const [percentage, setPercentage] = useState(0);

  const directory = directoryState?.currentDirectory;

  const totalStorage = 1024 * 1024 * 1024 * 100;

  const user = JSON.parse(sessionStorage.getItem("user")) || null;

  const usedStorage = user.usedStorage || 0;

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
    googleLogout();
    setTimeout(() => {
      localStorage.setItem("token", null);
      localStorage.setItem("google_token", null);
      sessionStorage.setItem("user", null);
    }, 2000);
    setTimeout(() => {
      authDispatch({ type: "RESET" });
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

  const handleClickTrashes = () => {
    navigate("/trashes");
    handleClose();
  };
  // con
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
    setPercentage((usedStorage / totalStorage) * 100);
  }, [totalStorage, usedStorage]);

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
      <div className="storage_item">
        <div className="storage_bar">
          <div
            className="storage_fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="storage_info">
          {formatFileSize(usedStorage)} of {formatFileSize(totalStorage)} used{" "}
          <span
            style={{
              padding: "4px 12px",
              border: "1px solid #3731edff",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#3731edff",
            }}
            className="btn"
          >
            buy
          </span>
        </div>
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
      <button className="drawer_item btn" onClick={handleClickTrashes}>
        <DeleteIcon
          width={getIconSize(windowWidth)}
          height={getIconSize(windowWidth)}
          fillColor="#4361ee"
        />
        <span>Trashes</span>
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

      {/* <div className="storage_item">
        <div className="storage_bar">
          <div
            className="storage_fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="storage_info">
          {formatFileSize(usedStorage)} of {formatFileSize(totalStorage)} used
        </div>
      </div> */}
    </div>
  );
}

export default SideDrawer;
