import * as TRASH from "./../api/trashApi.js";

const fetchTrashes =
  () =>
  async (dispatch, callback = () => {}) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await TRASH.getTrashes();
      dispatch({ type: "FETCH_TRASHES", payload: response.data.data });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const retrieveTrash =
  (content) =>
  async (dispatch, callback = () => {}) => {
    try {
      dispatch({ type: "START_LOADING" });
      // const { userId, contentId, parentId, type, _id: id } = content;
      // const updatedContent = {
      //   userId,
      //   contentId,
      //   parentId,
      //   type,
      //   id,
      // };
      // console.log(updatedContent, "up conte");
      const response = await TRASH.retrieveTrash(content);

      dispatch({ type: "RETRIEVE_TRASH", payload: content._id });
      console.log(response.data.data, "response");
      callback(response.data.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

const deleteTrash =
  (id) =>
  async (dispatch, callback = () => {}) => {
    try {
      dispatch({ type: "START_LOADING" });
      await TRASH.deleteTrash(id);

      dispatch({ type: "DELETE_TRASH", payload: id });
      callback();
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

export { fetchTrashes, retrieveTrash, deleteTrash };
