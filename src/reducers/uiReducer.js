const initialValues = {
  isLoading: false,
  isDeleting: false,
  isRenaming: false,
  creatingFolder: false,
  activeRenaming: false,
  actionBar: false,
  uploadPage: false,
  uploadingStatus: false,
  sideDrawer: false,
  mediaViewer: false,
  overlayPage: false,
  isError: null,
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

    case "START_CREATING_FOLDER":
      return {
        ...state,
        creatingFolder: true,
      };
    case "STOP_CREATING_FOLDER":
      return {
        ...state,
        creatingFolder: false,
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
    case "START_RENAMING":
      return {
        ...state,
        isRenaming: true,
      };
    case "STOP_RENAMING":
      return {
        ...state,
        isRenaming: false,
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

    case "OPEN_OVERLAYPAGE":
      return {
        ...state,
        overlayPage: true,
      };

    case "CLOSE_OVERLAYPAGE":
      return {
        ...state,
        overlayPage: false,
      };

    case "OPEN_UPLOADINGSTATUS":
      return {
        ...state,
        uploadingStatus: true,
      };

    case "CLOSE_UPLOADINGSTATUS":
      return {
        ...state,
        uploadingStatus: false,
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
        activeRenaming: true,
      };

    case "REMOVE_ACTIVE_RENAMING":
      return {
        ...state,
        activeRenaming: false,
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
