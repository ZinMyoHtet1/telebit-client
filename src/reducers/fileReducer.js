const initialValues = {
  isLoading: false,
  isUploading: false,
  uploadPercent: 0,
  isError: false,
  errorMessage: null,
  files: [],
  mediaContent: null,
};

function fileReducer(state, action) {
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
    case "START_UPLOADING":
      return {
        ...state,
        isUploading: true,
        isError: false,
        errorMessage: null,
      };
    case "STOP_UPLOADING":
      return {
        ...state,
        isUploading: false,
      };
    case "SET_PERCENT":
      return {
        ...state,
        uploadPercent: action.payload,
      };
    case "SET_MEDIA_CONTENT":
      return {
        ...state,
        mediaContent: action.payload,
      };
    case "FETCH_FILES":
      return {
        ...state,
        files: action.payload,
      };
    case "UPLOAD_FILE":
      return {
        ...state,
        files: [...state.files, action.payload],
      };

    case "RENAME_FILE":
      return {
        ...state,
        files: state.files.map((file) =>
          file.uploadId === action.payload.uploadId ? action.payload : file
        ),
      };

    case "DELETE_FILE":
      return {
        ...state,
        files: state.files.filter((file) => file.uploadId !== action.payload),
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

export default fileReducer;
