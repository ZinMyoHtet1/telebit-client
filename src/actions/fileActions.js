import * as FILE from "./../api/fileApi.js";

const fetchFiles =
  (uploadIds) =>
  async (dispatch, callback = () => {}) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await FILE.getFiles(uploadIds);

      dispatch({ type: "FETCH_FILES", payload: response.data.data });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const uploadFile =
  (parentId, form) =>
  async (dispatch, callback = () => {}) => {
    try {
      dispatch({ type: "START_UPLOADING" });
      dispatch({ type: "SET_PERCENT", payload: 0 });
      console.log("start upload");
      const response = await FILE.uploadFile(parentId, form);
      console.log("stop upload");

      dispatch({
        type: "UPLOAD_FILE",
        payload: { parentId, file: response.data.data },
      });
      dispatch({ type: "SET_PERCENT", payload: 100 });
      setTimeout(() => {
        dispatch({ type: "STOP_UPLOADING" });
        callback();
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch({ type: "STOP_UPLOADING" });

      dispatch({ type: "ERROR", payload: error.message });
    }
  };

const renameFile =
  (uploadId, updatedName) =>
  async (dispatch, callback = () => {}) => {
    try {
      // dispatch({ type: "START_RENAMING" });
      const response = await FILE.renameFile(uploadId, updatedName);
      dispatch({ type: "RENAME_FILE", payload: response.data.data });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

const deleteFile =
  (uploadId, parentId) =>
  async (dispatch, callback = () => {}) => {
    try {
      // dispatch({ type: "START_DELETING" });
      await FILE.deleteFile(uploadId, parentId);
      dispatch({ type: "DELETE_FILE", payload: uploadId });
      // dispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

export { fetchFiles, uploadFile, renameFile, deleteFile };
