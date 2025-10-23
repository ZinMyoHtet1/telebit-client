const initialValues = {
  isLoading: false,
  isDeleting: false,
  isRetrieving: false,
  trashes: [],
};
function trashReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "FETCH_TRASHES":
      // console.log("passing..", action.payload);
      return {
        ...state,
        trashes: action.payload,
      };

    case "START_DELETING":
      return {
        ...state,
        isDeleting: true,
      };
    case "STOP_DELETING":
      return {
        ...state,
        isDeleting: false,
      };

    case "START_RETRIEVING":
      console.log("start retrieving...");
      return {
        ...state,
        isRetrieving: true,
      };
    case "STOP_RETRIEVING":
      console.log("stop retrieving...");

      return {
        ...state,
        isRetrieving: false,
      };

    case "RETRIEVE_TRASH":
    case "DELETE_TRASH":
      console.log("passing..", action.payload);
      return {
        ...state,
        trashes: state.trashes.filter((trash) => trash._id !== action.payload),
      };
    case "RESET":
      return initialValues;
    default:
      return state;
  }
}

export default trashReducer;
