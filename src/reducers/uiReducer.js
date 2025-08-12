const initialValues = {
  isLoading: false,
  actionBar: false,
  uploadPage: false,
  isRenaming: false,
  sideDrawer: false,
  mediaViewer: false,
  viewMode: "thumbnail",
};

function uiReducer(state, action) {
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

    case "OPEN_MEDIAVIEWER":
      return {
        ...state,
        mediaViewer: true,
      };

    case "CLOSE_MEDIAVIEWER":
      return {
        ...state,
        mediaViewer: false,
      };

    case "OPEN_SIDEDRAWER":
      return {
        ...state,
        sideDrawer: true,
      };

    case "CLOSE_SIDEDRAWER":
      return {
        ...state,
        sideDrawer: false,
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

    case "SET_LIST_VIEW":
      return {
        ...state,
        viewMode: "list",
      };
    case "SET_THUMBNAIL_VIEW":
      return {
        ...state,
        viewMode: "thumbnail",
      };
    case "RESET":
      return initialValues;

    default:
      return state;
  }
}

export default uiReducer;
