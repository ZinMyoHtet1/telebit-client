import React, { useContext, useRef, useState } from "react";
import "./../styles/uploadPage.css";
import { uiContext } from "../contexts/UIContext";
import { fileContext } from "../contexts/FileContext";
import getVideoThumbnail from "../utils/getVideoThumbnail";
import generateUploadId from "../utils/generateUploadId";
import { uploadFile } from "../actions/fileActions";
import { directoryContext } from "../contexts/DirectoryContext";

export default function UploadPage({ progress }) {
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  // const [progress, setProgress] = useState(null); // null = no upload yet
  const [abortController, setAbortController] = useState(null);

  const { state: directoryState } = useContext(directoryContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { dispatch: uiDispatch } = useContext(uiContext);
  const fileInputRef = useRef(null);

  const parentId = directoryState?.currentDirectory?.id || null;
  const isUploading = fileState?.isUploading;

  // Handle file selection
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setThumbnail(null);
    e.target.value = ""; // <-- Reset so same file can be picked again
    if (selectedFile.type.startsWith("video")) {
      const th = await getVideoThumbnail(selectedFile);
      setThumbnail(th);
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFile(null);
    setThumbnail(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Close upload page
  const handleClose = () => {
    uiDispatch({ type: "CLOSE_UPLOADPAGE" });
  };

  // Trigger file picker
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset so same file can be picked again
      fileInputRef.current.click();
    }
  };

  // Handle upload process
  const handleUpload = () => {
    if (!file) return;
    if (!parentId) {
      console.log("no parentId ");
      return;
    }

    const uploadId = generateUploadId();
    const formData = new FormData();
    formData.append("filename", file.name);
    formData.append("uploadId", uploadId);
    //   formData.append("contentType", file.type);
    formData.append("size", file.size);
    formData.append("file", file);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    uploadFile(parentId, formData)(fileDispatch);
    // const controller = new AbortController();
    // setAbortController(controller);
    // setProgress(0);

    // // Example: Simulated upload process
    // let uploaded = 0;
    // const interval = setInterval(() => {
    //   uploaded += 5;
    //   setProgress(uploaded);
    //   if (uploaded >= 100) {
    //     clearInterval(interval);
    //     setAbortController(null);
    //   }
    // }, 200);
  };

  // Cancel ongoing upload
  const handleCancelUpload = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    // setProgress(null);
  };

  // // Allow parent to control progress
  // useEffect(() => {
  //   if (typeof getPercent === "function") {
  //     getPercent(setProgress);
  //   }
  // }, [getPercent]);

  return (
    <div className="upload_page overlay_page">
      <div className="upload-container">
        <button className="close_button btn" onClick={handleClose}>
          Close
        </button>

        <h1 className="title">Telebit</h1>
        <h2 className="subtitle">Upload Your Files</h2>

        <div className="dropzone" onClick={handleUploadAreaClick}>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            id="uploadFileInput"
            ref={fileInputRef}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="dropzone-text">
            <span className="drop-icon">📤</span>
            <p>Drag & Drop Files Here or Click to Browse</p>
          </div>
        </div>

        {/* Progress bar */}
        {isUploading && (
          <div className="upload-progress">
            <div className="progress-info">
              <span>{progress}%</span>
              <span className="progress-text">
                {progress < 100 ? "Upload in progress" : "Upload complete"}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {progress < 100 && (
              <button className="cancel-btn" onClick={handleCancelUpload}>
                Cancel
              </button>
            )}
          </div>
        )}

        {/* File info */}
        {file && (
          <div className="file-item">
            <span>{file.name}</span>
            <button className="remove-file" onClick={handleRemoveFile}>
              ✕
            </button>
          </div>
        )}

        {/* Video thumbnail preview */}
        {thumbnail && (
          <div className="thumbnail-preview">
            <img src={thumbnail} alt="Video thumbnail" />
          </div>
        )}

        {!isUploading && (
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </button>
        )}

        <footer className="footer">© 2023 Telebit. All rights reserved.</footer>
      </div>
    </div>
  );
}
