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
import MyMediaPage from "./pages/MyMediaPage";
import uiReducer from "./reducers/uiReducer";
import { UIProvider } from "./contexts/UIContext";
import ViewMode from "./components/ViewMode";
import Downloads from "./pages/Downloads";
import UploadFile from "./pages/UploadFile";
import { UploadProvider } from "./contexts/UploadContext.jsx";
import Uploads from "./pages/Uploads.jsx";
import { MediaQueryProvider } from "./contexts/MediaQueryContext.jsx";
import Login from "./pages/Login.jsx";
import OTPVerification from "./pages/OTPVerification.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import TrashPage from "./pages/TrashPage.jsx";
import { TrashProvider } from "./contexts/TrashContext.js";
import trashReducer from "./reducers/trashReducer.js";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/">
      <Route index element={<Home />} />
      <Route path=":dirId" element={<Home />} />,
    </Route>,
    <Route path="/home">
      <Route index element={<Home />} />
      {/* <Route path=":dirId" element={<Home />} />, */}
    </Route>,
    <Route path="/getStarted">
      <Route index element={<LandingPage />} />
    </Route>,

    <Route path="/auth">
      <Route path="forgot-password" element={<ForgetPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      {/* <Route path="register" element={<Login />} /> */}
      <Route path="verifyEmail" element={<OTPVerification />} />
    </Route>,
    <Route path="/auth/:mode">
      <Route index element={<Login />} />
    </Route>,
    <Route path="/my_media">
      <Route index element={<MyMediaPage />} />
    </Route>,
    <Route path="/downloads">
      <Route index element={<Downloads />} />
    </Route>,
    <Route path="/uploads">
      <Route index element={<Uploads />} />
    </Route>,
    <Route path="/trashes">
      <Route index element={<TrashPage />} />
    </Route>,
    <Route path="/upload/:dirId">
      <Route index element={<UploadFile />} />
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
  ]),
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
  mediaFiles: [],
  parentId: "root",
  pendingContents: [],
  donwloadingContent: null,
  uploadingContents: [],
};

const trashInitialValues = {
  isLoading: false,
  isDeleting: false,
  isRetrieving: false,
  trashes: [],
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
  messagePage: false,
  message: null,
  isError: false,
  viewMode: "thumbnail",
};

function App() {
  const [directoryState, directoryDispatch] = useReducer(
    directoryReducer,
    directoryInitialValues,
  );
  const [fileState, fileDispatch] = useReducer(fileReducer, fileInitialValues);
  const [trashState, trashDispatch] = useReducer(
    trashReducer,
    trashInitialValues,
  );
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
    <AuthProvider>
      <DirectoryProvider
        value={{ state: directoryState, dispatch: directoryDispatch }}
      >
        <FileProvider value={{ state: fileState, dispatch: fileDispatch }}>
          <TrashProvider value={{ state: trashState, dispatch: trashDispatch }}>
            <UIProvider value={{ state: uiState, dispatch: uiDispatch }}>
              <UploadProvider>
                <MediaQueryProvider>
                  <RouterProvider router={router} />
                </MediaQueryProvider>
              </UploadProvider>
            </UIProvider>
          </TrashProvider>
        </FileProvider>
      </DirectoryProvider>
    </AuthProvider>
  );
}

export default App;
