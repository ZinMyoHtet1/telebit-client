const initialValues = {
  isLoading: false,
  isRenaming: false,
  currentDirectory: null,
  childDirectories: [],
  parentDirectories: [],
  activeContent: null,
  isError: false,
  errorMessage: null,
};

function directoryReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: null,
      };
    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
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

    case "CREATE_DIRECTORY":
      return {
        ...state,
        childDirectories: [...state.childDirectories, action.payload],
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

    case "RESET":
      return initialValues;
    case "ERROR":
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

export default directoryReducer;
