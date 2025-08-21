const initialValues = {
  isLogin: false,
  isRegistering: false,
  errorMessage: null,
  logout: false,
  // user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "START_LOGIN":
      return {
        ...state,
        isLogin: true,
      };
    case "STOP_LOGIN":
      return {
        ...state,
        isLogin: false,
      };
    case "START_REGISTER":
      return {
        ...state,
        isRegistering: true,
      };
    case "STOP_REGISTER":
      return {
        ...state,
        isRegistering: false,
      };
    // case "LOGIN":
    //   return {
    //     ...state,
    //     user: JSON.parse(sessionStorage.getItem("user")),
    //   };

    case "LOGOUT":
      return {
        ...state,
        logout: true,
      };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    case "REMOVE_ERROR":
      return {
        ...state,
        errorMessage: null,
      };
    case "RESET":
      return initialValues;
    default:
      return state;
  }
}

export default authReducer;
