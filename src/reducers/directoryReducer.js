const initialValues = {
  isLoading: false,
  isRenaming: false,
  isDeleting: false,
  activeRenaming: false,
  currentDirectory: null,
  childDirectories: [],
  parentDirectories: [],
  activeContent: null,
  errorMessage: null,
};

function directoryReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
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

    case "FETCH_CURRENTDIRECTORY":
      return {
        ...state,
        currentDirectory: action.payload,
      };
    case "FETCH_CHILDDIRECTORIES":
      return {
        ...state,
        childDirectories: action.payload,
      };
    case "FETCH_PARENTDIRECTORIES":
      return {
        ...state,
        parentDirectories: action.payload,
      };

    case "RETRIEVE_TRASH":
    case "CREATE_DIRECTORY":
      return {
        ...state,
        childDirectories: [...state.childDirectories, action.payload],
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

    case "RENAME_DIRECTORY":
      return {
        ...state,
        childDirectories: state.childDirectories.map((dir) =>
          dir.id === action.payload.id ? action.payload : dir
        ),
      };
    case "DELETE_DIRECTORY":
      return {
        ...state,
        childDirectories: state.childDirectories.filter(
          (dir) => dir.id !== action.payload
        ),
      };

    case "ADD_TEMP_DIRECTORY":
      return {
        ...state,
        childDirectories: [
          ...state.childDirectories,
          {
            id: "temp-" + Date.now(),
            name: "New Folder",
            createdAt: Date.now(),
          }, // give it an ID and name
        ],
      };

    case "REMOVE_TEMP_DIRECTORY":
      return {
        ...state,
        childDirectories: state.childDirectories.filter(
          (dir) => !dir.id?.startsWith("temp-") // remove temp dirs
        ),
      };

    case "SET_ACTIVE_CONTENT":
      return {
        ...state,
        activeContent: action.payload,
      };

    case "REFRESH":
    case "RESET":
      return initialValues;
    case "ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

export default directoryReducer;
