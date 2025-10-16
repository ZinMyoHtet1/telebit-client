const initialValues = {
  isLoading: false,
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
