import "./App.css";
import { DirectoryProvider } from "./contexts/DirectoryContext";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import directoryReducer from "./reducers/directoryReducer";
import { useReducer } from "react";
import fileReducer from "./reducers/fileReducer";
import { FileProvider } from "./contexts/FileContext";
import UploadPage from "./pages/UploadPage";
import uiReducer from "./reducers/uiReducer";
import { UIProvider } from "./contexts/UIContext";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/">
      <Route index element={<Home />} />
    </Route>,
    <Route path="/upload/:dirId">
      <Route index element={<UploadPage />} />
    </Route>,
    <Route path="/:dirId">
      <Route index element={<Home />} />
    </Route>,

    // <Route path="/drive">
    //   <Route index element={<Home />} />
    //   <Route path=":driveId" element={<Home />} />
    //   <Route path=":driveId/:dirnameId" element={<Home />} />
    // </Route>,
    // <Route path="/auth">
    //   <Route path="login" element={<Login />} />
    //   <Route path="register" element={<Login />} />
    //   <Route path="verifyEmail" element={<OTPVerification />} />
    // </Route>,
  ])
);

const directoryInitialValues = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  currentDirectory: null,
  childDirectories: [],
  parentDirectories: [],
  activeContent: null,
};

const fileInitialValues = {
  isLoading: false,
  isUploading: false,
  isError: false,
  errorMessage: null,
  files: [],
};

const uiInitialValues = {
  actionBar: false,
  uploadPage: false,
  isRenaming: false,
};

function App() {
  const [directoryState, directoryDispatch] = useReducer(
    directoryReducer,
    directoryInitialValues
  );
  const [fileState, fileDispatch] = useReducer(fileReducer, fileInitialValues);
  const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialValues);

  return (
    <DirectoryProvider
      value={{ state: directoryState, dispatch: directoryDispatch }}
    >
      <FileProvider value={{ state: fileState, dispatch: fileDispatch }}>
        <UIProvider value={{ state: uiState, dispatch: uiDispatch }}>
          <RouterProvider router={router} />
        </UIProvider>
      </FileProvider>
    </DirectoryProvider>
  );
}

export default App;
