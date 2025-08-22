// UploadContext.jsx
import React, { createContext, useContext, useEffect } from "react";

import { uploadFile } from "../actions/fileActions";
import { fileContext } from "./FileContext";
import createFormData from "../utils/createFormData";
import { clearFiles, getFiles, saveFiles } from "../utils/fileDB";
import { uiContext } from "./UIContext";
// import { startWebSocket } from "../utils/socket";
// import generateUploadId from "../utils/generateUploadId";
// import Crypto  from "../utils"

// eslint-disable-next-line react-refresh/only-export-components
export const uploadContext = createContext();
const UploadContextProvider = uploadContext.Provider;

export function UploadProvider({ children }) {
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState } = useContext(uiContext);
  // const [socket, setSocket] = useState(null);

  const isLoading = uiState?.isLoading;
  const uploadingFiles = fileState?.uploadingContents;
  const currentFile = fileState?.currentUploadContent;

  function startUpload(parentId, file) {
    async function callback() {
      // uiDispatch({ type: "CLOSE_UPLOADINGSTATUS" });
      // setTimeout(async () => {
      fileDispatch({
        type: "NEXT_UPLOAD",
      });
      // }, 2000);
    }

    createFormData(file).then((form) => {
      uploadFile(parentId, form)(fileDispatch, callback);
    });
  }

  useEffect(() => {
    (async () => {
      const files = await getFiles("uploadingFiles");
      console.log("save in db", files);
      fileDispatch({ type: "SET_UPLOADING_CONTENTS", payload: files });
    })();
  }, [fileDispatch]);

  useEffect(() => {
    if (isLoading || !currentFile) return;
    (async () => {
      await clearFiles();
      await saveFiles("uploadingFiles", uploadingFiles);
    })();
  }, [uploadingFiles, currentFile, isLoading]);

  useEffect(() => {
    if (currentFile?.parentId)
      startUpload(currentFile.parentId, currentFile["file"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile?.file]);

  return <UploadContextProvider value={{}}>{children}</UploadContextProvider>;
}
