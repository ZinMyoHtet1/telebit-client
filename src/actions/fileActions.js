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
    dispatch({ type: "SET_PERCENT", payload: 0 });
    const response = await FILE.uploadFile(parentId, form);
    dispatch({ type: "UPLOAD_FILE", payload: response.data.data });
    dispatch({ type: "SET_PERCENT", payload: 100 });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_UPLOADING" });
  }
};

const renameFile = (uploadId, updatedName) => async (dispatch, callback) => {
  try {
    dispatch({ type: "START_LOADING" });
    const response = await FILE.renameFile(uploadId, updatedName);
    dispatch({ type: "RENAME_FILE", payload: response.data.data });
    callback();
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

const deleteFile = (uploadId, parentId) => async (dispatch, callback) => {
  try {
    dispatch({ type: "START_LOADING" });
    await FILE.deleteFile(uploadId, parentId);
    dispatch({ type: "DELETE_FILE", payload: uploadId });
    // dispatch({ type: "REMOVE_ACTIVE_RENAMING" });
    callback();
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export { fetchFiles, uploadFile, renameFile, deleteFile };
