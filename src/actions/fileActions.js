import * as FILE from "./../api/fileApi.js";

const fetchFiles = (uploadIds) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const response = await FILE.getFiles(uploadIds);

    dispatch({ type: "FETCH_FILES", payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

const uploadFile = (parentId, form) => async (dispatch) => {
  try {
    dispatch({ type: "START_UPLOADING" });
    const response = await FILE.uploadFile(parentId, form);
    dispatch({ type: "UPLOAD_FILE", payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_UPLOADING" });
  }
};

const renameFile = (uploadId, updatedName) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const response = await FILE.renameFile(uploadId, updatedName);
    dispatch({ type: "RENAME_FILE", payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export { fetchFiles, uploadFile, renameFile };
