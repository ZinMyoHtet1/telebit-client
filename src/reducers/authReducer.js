const initialValues = {
  isLoading: false,
  errorMessage: null,
  // user: null,
};

function authReducer(state, action) {
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
    // case "LOGIN":
    //   return {
    //     ...state,
    //     user: JSON.parse(sessionStorage.getItem("user")),
    //   };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    case "RESET":
      return initialValues;
    default:
      return state;
  }
}

export default authReducer;
