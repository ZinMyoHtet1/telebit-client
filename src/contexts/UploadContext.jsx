// UploadContext.jsx
import React, { createContext, useContext, useEffect } from "react";

import { uploadFile } from "../actions/fileActions";
import { fileContext } from "./FileContext";
import createFormData from "../utils/createFormData";
import { deleteFiles, getFiles, saveFiles } from "../utils/fileDB";
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
      await deleteFiles("uploadingFiles");
      await saveFiles("uploadingFiles", uploadingFiles);
    })();
  }, [uploadingFiles]);

  // useEffect(() => {
  //   startWebSocket((data) => {
  //     fileDispatch({ type: "SET_PERCENT", payload: data.percent });
  //   });
  // }, [fileDispatch]);

  useEffect(() => {
    if (isLoading || currentFile) return;
    (async () => {
      // await clearFiles();

      const uploadingContents = await getFiles("uploadingFiles");
      fileDispatch({
        type: "SET_UPLOADING_CONTENTS",
        payload: uploadingContents || [],
      });
    })();
  }, [currentFile, fileDispatch, isLoading]);

  useEffect(() => {
    if (currentFile?.parentId)
      startUpload(currentFile.parentId, currentFile["file"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile?.file]);

  return <UploadContextProvider value={{}}>{children}</UploadContextProvider>;
}
