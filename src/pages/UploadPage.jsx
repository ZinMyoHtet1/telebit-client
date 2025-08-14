import React, { useContext, useEffect, useRef, useState } from "react";
import "./../styles/uploadPage.css";
import { uiContext } from "../contexts/UIContext";
import { fileContext } from "../contexts/FileContext";
import getVideoThumbnail from "../utils/getVideoThumbnail";
import generateUploadId from "../utils/generateUploadId";
import getFileIcon from "../utils/getFileIcon";
import { uploadFile } from "../actions/fileActions";
import { directoryContext } from "../contexts/DirectoryContext";
import formatName from "../utils/formatName";
import CloseIcon from "../svgs/CloseIcon";

export default function UploadPage() {
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
  const progress = fileState?.uploadPercent;

  // const isVideo = file?.type.startsWith("video/") || null;

  const isPhoto = file?.type.startsWith("image/") || null;

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
    // setFileImage(null);
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
  };

  // Cancel ongoing upload
  const handleCancelUpload = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFile(null);
        setThumbnail(null);

        fileDispatch({ type: "SET_PERCENT", payload: 0 });
      }, 3000);
    }
  }, [fileDispatch, progress]);
  console.log("fjlsj");

  return (
    <div className="upload_page overlay_page">
      <div className="upload-container">
        <button className="close_button btn" onClick={handleClose}>
          <CloseIcon />
        </button>

        {/* <h1 className="title">Telebit</h1> */}
        <h1 className="subtitle">Upload Your Files</h1>

        {/* File info */}
        {file ? (
          <>
            <div className="file-item">
              <div>{formatName(file.name, 40)}</div>
              <button className="remove-file" onClick={handleRemoveFile}>
                ✕
              </button>
            </div>
            <div className="thumbnail-preview">
              <img
                src={
                  thumbnail
                    ? thumbnail
                    : isPhoto
                    ? URL.createObjectURL(file)
                    : getFileIcon(file.type, file.name.split(".").at(-1))
                }
                alt="Video thumbnail"
              />
            </div>
          </>
        ) : (
          <div
            className={`dropzone ${file ? "selected" : ""}`}
            onClick={handleUploadAreaClick}
          >
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
        )}

        {/* Video thumbnail preview
        {file && (
          <div className="thumbnail-preview">
            <img
              src={
                isVideoOrPhoto
                  ? URL.createObjectURL(file)
                  : getFileIcon(file.type, file.name.split(".").at(-1))
              }
              alt="Video thumbnail"
            />
          </div>
        )} */}

        {/* Progress bar */}
        {(progress || isUploading) && (
          <>
            <div className="upload-progress">
              <span>{progress}%</span>

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
            <div className="progress-info">
              <span className="progress-text">
                {progress < 100
                  ? "Upload in progress"
                  : "Successfully Upload Complete!"}
              </span>
            </div>
          </>
        )}

        {!isUploading && file && (
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
