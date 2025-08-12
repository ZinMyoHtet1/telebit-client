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
function SideDrawer() {
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);
  const drawerRef = useRef();

  const directory = directoryState?.currentDirectory;

  const handleClose = () => {
    uiDispatch({ type: "CLOSE_SIDEDRAWER" });
  };

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
        <CloseIcon />
      </button>
      <button className="drawer_item btn" onClick={handleUploadFile}>
        <UploadIcon width={24} height={24} fillColor="#4361ee" />
        <span>Upload File</span>
      </button>
      <button className="drawer_item btn" onClick={handleCreateFolder}>
        <CreateFolderIcon width={24} height={24} fillColor="#4361ee" />
        <span>Create Folder</span>
      </button>
      <button className="drawer_item btn">
        <DeleteIcon width={24} height={24} fillColor="#4361ee" />
        <span>trash</span>
      </button>
      <button className="drawer_item btn">
        <StatsIcon width={24} height={24} fillColor="#4361ee" />
        <span>Statistics</span>
      </button>
      <button className="drawer_item btn">
        <SettingIcon width={24} height={24} fillColor="#4361ee" />
        <span>Setting</span>
      </button>
      <button className="drawer_item btn">
        <LogoutIcon width={24} height={24} fillColor="#4361ee" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default SideDrawer;
