const initialValues = {
  actionBar: false,
  uploadPage: false,
  isRenaming: false,
};

function uiReducer(state, action) {
  switch (action.type) {
    case "OPEN_ACTIONBAR":
      return {
        ...state,
        actionBar: true,
      };

    case "CLOSE_ACTIONBAR":
      return {
        ...state,
        actionBar: false,
      };

    case "OPEN_UPLOADPAGE":
      return {
        ...state,
        uploadPage: true,
      };

    case "CLOSE_UPLOADPAGE":
      return {
        ...state,
        uploadPage: false,
      };

    case "ACTIVE_RENAMING":
      return {
        ...state,
        isRenaming: true,
      };

    case "REMOVE_ACTIVE_RENAMING":
      return {
        ...state,
        isRenaming: false,
      };
    case "RESET":
      return initialValues;

    default:
      return state;
  }
}

export default uiReducer;
