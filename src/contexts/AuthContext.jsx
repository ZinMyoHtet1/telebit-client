// UploadContext.jsx
// import React, { createContext, useEffect, useReducer } from "react";
// import cookie from "../utils/cookie";
// import { verifyToken } from "../actions/authActions";
import { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();
const AuthContextProvider = authContext.Provider;

const initialValues = {
  isLoading: false,
  errorMessage: null,
  // user: null,
};

export function AuthProvider({ children }) {
  // const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialValues);

  // useEffect(() => {
  //   let user = null;
  //   user = sessionStorage.getItem("user");
  //   if (!user) {
  //     const jwt = cookie.getCookie("jwt");
  //     if (!jwt) navigate("/auth/login", { replace: true });

  //     //verify token
  //     verifyToken(jwt)(dispatch);
  //     return;
  //   }
  // }, [navigate]);

  return (
    <AuthContextProvider value={{ state, dispatch }}>
      {children}
    </AuthContextProvider>
  );
}
