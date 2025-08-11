import * as DIRECTORY from "./../api/directoryApi.js";

const fetchDirectory = (dirId) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const response = await DIRECTORY.getDirectory(dirId);

    dispatch({ type: "FETCH_CURRENTDIRECTORY", payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

const fetchDirectories =
  (dirIds, type = "FETCH_CHILDDIRECTORIES") =>
  async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await DIRECTORY.getDirectories(dirIds);

      dispatch({ type, payload: response.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const createDirectory = (form) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const response = await DIRECTORY.createDirectory(form);
    dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
    dispatch({ type: "CREATE_DIRECTORY", payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

const renameDirectory = (dirId, updatedName) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const response = await DIRECTORY.renameDirectory(dirId, updatedName);
    dispatch({ type: "RENAME_DIRECTORY", payload: response.data.data });
    // dispatch({ type: "REMOVE_ACTIVE_RENAMING" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

const deleteDirectory = (dirId) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    await DIRECTORY.deleteDirectory(dirId);
    dispatch({ type: "DELETE_DIRECTORY", payload: dirId });
    // dispatch({ type: "REMOVE_ACTIVE_RENAMING" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.message });
  } finally {
    dispatch({ type: "STOP_LOADING" });
  }
};

export {
  fetchDirectory,
  fetchDirectories,
  createDirectory,
  renameDirectory,
  deleteDirectory,
};
