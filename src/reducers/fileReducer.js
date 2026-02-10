const initialValues = {
  isLoading: false,
  isUploading: false,
  isDeleting: false,
  isRenaming: false,
  uploadPercent: 0,
  errorMessage: null,
  parentId: "root",
  files: [],
  mediaFiles: [],
  mediaContent: null,
  pendingContents: [],
  uploadingContents: [],
  currentUploadContent: null,
  downloadingContent: null,
};

function fileReducer(state, action) {
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
    case "SET_PARENTID":
      return {
        ...state,
        parentId: action.payload,
      };
    case "SET_DOWNLOADING_CONTENT":
      return {
        ...state,
        downloadingContent: action.payload,
      };

    case "SET_PENDING_CONTENTS":
      return {
        ...state,
        pendingContents: action.payload,
      };
    case "ADD_UPLOADING_CONTENTS":
      return {
        ...state,
        uploadingContents: [...state.uploadingContents, ...action.payload],
        currentUploadContent: state.currentUploadContent
          ? state.currentUploadContent
          : action.payload[0] || null,
      };
    case "SET_UPLOADING_CONTENTS":
      return {
        ...state,
        uploadingContents: action.payload,
        currentUploadContent: action.payload[0] || null,
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
    case "MEDIA_FILES":
      return {
        ...state,
        mediaFiles: action.payload,
      };
    case "NEXT_UPLOAD":
      return {
        ...state,
        uploadingContents: state.uploadingContents.slice(1),
        currentUploadContent: state.uploadingContents[1] || null,
      };

    case "UPLOAD_FILE":
      return {
        ...state,
        files:
          state.parentId === action.payload.parentId
            ? [...state.files, action.payload.file]
            : state.files,
      };
    case "RETRIEVE_TRASH":
      return {
        ...state,
        files:
          state.parentId === "root"
            ? [...state.files, action.payload]
            : state.files,
      };

    case "RENAME_FILE":
      return {
        ...state,
        files: state.files.map((file) =>
          file.uploadId === action.payload.uploadId ? action.payload : file,
        ),
      };

    case "DELETE_FILE":
      return {
        ...state,
        files: state.files.filter((file) => file.uploadId !== action.payload),
      };
    case "REFRESH":
      return {
        ...initialValues,
        isUploading: state.isUploading,
        uploadingContents: state.uploadingContents,
        currentUploadContent: state.currentUploadContent,
        uploadPercent: state.uploadPercent,
        pendingContents: state.pendingContents,
        downloadingContent: state.downloadingContent,
      };
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

export default fileReducer;
