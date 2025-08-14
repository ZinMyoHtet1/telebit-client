import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import API from "./../api/fileApi.js";
import { appContext } from "../contexts/AppContext.js";
import generateUploadId from "./../utils/generateUploadId.js";
import removeDuplicateFiles from "./../utils/removeDuplicateFiles.js";

import {
  CLOSE_UPLOAD_FORM,
  CURRENT_UPLOADING_FILE,
  OPEN_UPLOADING_PROGRESS,
  START_LOADING,
  START_UPLOADING,
  STOP_LOADING,
  STOP_UPLOADING,
  UPLOAD_FILE_CHUNK,
  UPLOAD_FILE_NOCHUNK,
} from "../constants";
import { useParams } from "react-router-dom";

function useUploadFile() {
  const { state, dispatch } = useContext(appContext);
  const { driveId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [activeUploadArea, setActiveUploadArea] = useState(false);

  const CHUNK_SIZE = 1024 * 1024; // 1 MB
  const dirName = state.directory.currentDirectory?.dirName || "./";
  console.log("fjfjlsjf", "from useUploadFile");

  async function uploadFileChunk(chunkFormData) {
    dispatch({ type: START_UPLOADING });
    const response = await API.uploadFile(driveId, chunkFormData);
    if (response.data.status === "pending") {
      console.log("uploading...");
      dispatch({ type: UPLOAD_FILE_CHUNK, payload: response.data.data });
    } else {
      dispatch({ type: UPLOAD_FILE_NOCHUNK, payload: response.data.data });
      dispatch({ type: STOP_LOADING });
    }
  }

  async function uploadFileNoChunk(formData) {
    dispatch({ type: START_UPLOADING });
    const response = await API.uploadFile(driveId, formData);

    dispatch({ type: UPLOAD_FILE_NOCHUNK, payload: response.data.data });
    dispatch({ type: STOP_LOADING });
  }

  const handleClose = () => {
    dispatch({ type: CLOSE_UPLOAD_FORM });
    if (!state.file.isUploading) setSelectedFiles([]);
    setShowContent(false);
  };

  const handleUploadAreaClick = () => {
    const uploadFileInput = document.getElementById("uploadFileInput");
    uploadFileInput.click();
  };

  const handleChangeInputFile = (e) => {
    setSelectedFiles((previous) => {
      if (!previous.length) return Array.from(e.target.files);
      const files = [...previous, ...Array.from(e.target.files)];
      const uniqueFiles = removeDuplicateFiles(files);
      // const uniqueArray = [...new Set(results)];
      return uniqueFiles;
    });
  };

  function handleClearAll() {
    setSelectedFiles([]);
  }

  function handleRemoveFromList(file) {
    const result = [];
    const fileKeyToRemove = `${file.name}-${file.size}-${file.lastModified}`;
    selectedFiles.forEach((file) => {
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

      if (fileKey === fileKeyToRemove) return;
      result.push(file);
    });
    setSelectedFiles(result);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    handleClose();
    for (const selectedFile of selectedFiles) {
      try {
        const uploadId = generateUploadId();
        const fileSize = selectedFile.size;

        // Prepare the initial FormData
        const formData = new FormData();
        formData.append("fileName", selectedFile.name);
        formData.append("dirName", dirName);
        formData.append("uploadId", uploadId);
        formData.append("type", selectedFile.type);
        formData.append("contentLength", selectedFile.size);
        if (fileSize <= CHUNK_SIZE) {
          // Single file upload
          dispatch({ type: START_LOADING });
          dispatch({ type: CURRENT_UPLOADING_FILE, payload: selectedFile });
          formData.append("file", selectedFile);
          await uploadFileNoChunk(formData);
        } else {
          // Chunked upload
          const totalChunkNumber = Math.ceil(fileSize / CHUNK_SIZE);
          let chunkNumber = 0;
          dispatch({ type: START_LOADING });

          while (chunkNumber < totalChunkNumber) {
            const start = chunkNumber * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, fileSize);
            const partFile = selectedFile.slice(start, end);

            // Prepare FormData for the chunk
            const chunkFormData = new FormData();
            chunkFormData.append("uploadId", uploadId);
            chunkFormData.append("chunkSize", partFile.size);
            chunkFormData.append("dirName", dirName);
            chunkFormData.append("deliveredChunks", end);
            chunkFormData.append("file", partFile);
            chunkFormData.append("contentLength", fileSize);
            chunkFormData.append("originalName", selectedFile.name);
            chunkFormData.append("type", selectedFile.type);
            chunkFormData.append(
              "status",
              chunkNumber === totalChunkNumber - 1 ? "success" : "pending"
            );
            dispatch({ type: CURRENT_UPLOADING_FILE, payload: selectedFile });
            await uploadFileChunk(chunkFormData);
            chunkNumber++;
          }
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: STOP_UPLOADING });
        dispatch({ type: STOP_LOADING });
      } finally {
        dispatch({ type: STOP_UPLOADING });
        dispatch({ type: STOP_LOADING });
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setActiveUploadArea(true);
  };

  const handleDragLeave = () => {
    setActiveUploadArea(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setActiveUploadArea(false);
    if (e.dataTransfer.files.length) {
      setSelectedFiles((previous) => {
        if (!previous.length) return Array.from(e.dataTransfer.files);
        const files = [...previous, ...Array.from(e.dataTransfer.files)];
        const uniqueFiles = removeDuplicateFiles(files);
        // const uniqueArray = [...new Set(results)];
        return uniqueFiles;
      });
    }
  };

  useEffect(() => {
    if (!state.directory.isLoading) setSelectedFiles([]);
    dispatch({ type: OPEN_UPLOADING_PROGRESS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.directory.isLoading]);
  return {
    state,
    showContent,
    activeUploadArea,
    selectedFiles,
    handleClose,
    handleUploadAreaClick,
    handleChangeInputFile,
    handleUpload,
    handleClearAll,
    handleRemoveFromList,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

export default useUploadFile;
