import * as DIRECTORY from "./../api/directoryApi.js";

const fetchDirectory =
  (dirId) =>
  async (dispatch, callback = () => {}) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await DIRECTORY.getDirectory(dirId);

      dispatch({ type: "FETCH_CURRENTDIRECTORY", payload: response.data.data });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const fetchDirectories =
  (dirIds, type = "FETCH_CHILDDIRECTORIES", callback = () => {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await DIRECTORY.getDirectories(dirIds);

      dispatch({ type, payload: response.data.data });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const createDirectory =
  (form) =>
  async (dispatch, callback = () => {}) => {
    try {
      // dispatch({ type: "START_LOADING" });
      const response = await DIRECTORY.createDirectory(form);
      dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
      dispatch({ type: "CREATE_DIRECTORY", payload: response.data.data });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

const renameDirectory =
  (dirId, updatedName) =>
  async (dispatch, callback = () => {}) => {
    try {
      // dispatch({ type: "START_LOADING" });
      const response = await DIRECTORY.renameDirectory(dirId, updatedName);
      dispatch({ type: "RENAME_DIRECTORY", payload: response.data.data });
      // dispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

const deleteDirectory =
  (dirId) =>
  async (dispatch, callback = () => {}) => {
    try {
      // dispatch({ type: "START_LOADING" });
      await DIRECTORY.deleteDirectory(dirId);
      dispatch({ type: "DELETE_DIRECTORY", payload: dirId });
      // dispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

export {
  fetchDirectory,
  fetchDirectories,
  createDirectory,
  renameDirectory,
  deleteDirectory,
};
