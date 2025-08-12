import React, { useContext, useEffect, useState } from "react";
import { directoryContext } from "./../contexts/DirectoryContext";

import "./../styles/actionBar.css";
import { uiContext } from "../contexts/UIContext";
import { deleteDirectory } from "../actions/directoryActions";
import { fileContext } from "../contexts/FileContext";
import { deleteFile } from "../actions/fileActions";

import RenameIcon from "./../svgs/RenameIcon";
import CopyIcon from "./../svgs/CopyIcon";
import PasteIcon from "./../svgs/PasteIcon";
import DeleteIcon from "./../svgs/DeleteIcon";
import CloseIcon from "../svgs/CloseIcon";
import DownloadIcon from "../svgs/DownloadIcon";
import LinkIcon from "../svgs/LinkIcon";

function ActionBar() {
  const { state: directoryState, dispatch: directoryDispatch } =
    useContext(directoryContext);
  const { dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const [isCopied, setIsCopied] = useState(false);

  const isActive =
    directoryState?.activeContent?.id ||
    directoryState?.activeContent?.uploadId;
  const content = directoryState?.activeContent;

  const parentId = directoryState?.currentDirectory?.id || null;
  const isLoading = uiState?.isLoading;

  const handleClose = () => {
    directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
  };

  const handleCopyLink = () => {
    if (isCopied) return;
    const data = content?.watch || "no url";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data);
      setIsCopied(true);
    }
  };

  const handleDownload = () => {
    if (content?.download) window.open(content?.download, "_parent");
  };

  const handleRename = (e) => {
    e.stopPropagation();
    if (isLoading) return;
    uiDispatch({ type: "ACTIVE_RENAMING" });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isLoading) return;

    function callback() {
      directoryDispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
    }

    content?.id
      ? deleteDirectory(content.id)(directoryDispatch, callback)
      : deleteFile(content.uploadId, parentId)(fileDispatch, callback);
  };

  useEffect(() => {
    if (isCopied)
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
  }, [isCopied]);

  return (
    <div
      className={`action_bar ${
        !isActive || isLoading || uiState?.isRenaming ? "hidden" : ""
      }`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button className="close_btn btn" onClick={handleClose}>
        <CloseIcon />
      </button>
      {content?.mimeType ? (
        <>
          <button className="copy_link_btn btn" onClick={handleCopyLink}>
            <LinkIcon />
            <span className="action_name">
              {isCopied ? "Copied!" : "Copy Link"}
            </span>
          </button>
          <button className="download_btn btn" onClick={handleDownload}>
            <DownloadIcon />
            <span className="action_name">Download</span>
          </button>
        </>
      ) : null}

      <button className="rename_btn btn" onClick={handleRename}>
        <RenameIcon />
        <span className="action_name">Rename</span>
      </button>
      <button className="rename_btn btn">
        <CopyIcon />
        <span className="action_name">Copy</span>
      </button>

      <button className="rename_btn btn" onClick={handleDelete}>
        <DeleteIcon />
        <span className="action_name">Delete</span>
      </button>

      {/* <button className="rename_btn btn">
        <PasteIcon />
        <span className="action_name">Paste</span>
      </button> */}
    </div>
  );
}

export default ActionBar;
