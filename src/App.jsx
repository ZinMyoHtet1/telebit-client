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
import { useEffect, useReducer } from "react";
import fileReducer from "./reducers/fileReducer";
import { FileProvider } from "./contexts/FileContext";
import UploadPage from "./pages/UploadPage";
import uiReducer from "./reducers/uiReducer";
import { UIProvider } from "./contexts/UIContext";
import ViewMode from "./components/ViewMode";
import Downloads from "./pages/Downloads";
import UploadFile from "./pages/UploadFile";
import { UploadProvider } from "./contexts/UploadContext.jsx";
import Uploads from "./pages/Uploads.jsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/">
      <Route index element={<Home />} />
    </Route>,
    <Route path="/downloads">
      <Route index element={<Downloads />} />
    </Route>,
    <Route path="/uploads">
      <Route index element={<Uploads />} />
    </Route>,
    <Route path="/upload/:dirId">
      <Route index element={<UploadFile />} />
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
  errorMessage: null,
  currentDirectory: null,
  childDirectories: [],
  parentDirectories: [],
  activeContent: null,
};

const fileInitialValues = {
  isLoading: false,
  isDeleting: false,
  isUploading: false,
  isRenaming: false,
  uploadPercent: 0,
  errorMessage: null,
  mediaContent: null,
  files: [],
  parentId: "root",
  pendingContents: [],
  donwloadingContent: null,
  uploadingContents: [],
};

const uiInitialValues = {
  isLoading: false,
  isDeleting: false,
  isUploading: false,
  isRenaming: false,
  activeRenaming: false,
  creatingFolder: false,
  actionBar: false,
  uploadPage: false,
  sideDrawer: false,
  mediaViewer: false,
  uploadingStatus: false,
  overlayPage: false,
  viewMode: "thumbnail",
};

function App() {
  const [directoryState, directoryDispatch] = useReducer(
    directoryReducer,
    directoryInitialValues
  );
  const [fileState, fileDispatch] = useReducer(fileReducer, fileInitialValues);
  const [uiState, uiDispatch] = useReducer(uiReducer, uiInitialValues);

  useEffect(() => {
    function setRealHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setRealHeight();
    window.addEventListener("resize", setRealHeight);
  }, []);

  return (
    <DirectoryProvider
      value={{ state: directoryState, dispatch: directoryDispatch }}
    >
      <FileProvider value={{ state: fileState, dispatch: fileDispatch }}>
        <UIProvider value={{ state: uiState, dispatch: uiDispatch }}>
          <UploadProvider>
            <RouterProvider router={router} />
          </UploadProvider>
        </UIProvider>
      </FileProvider>
    </DirectoryProvider>
  );
}

export default App;
