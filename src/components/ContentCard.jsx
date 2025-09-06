// import React, { useContext, useEffect, useRef, useState } from "react";
// import getFileIcon from "../utils/getFileIcon";
// import formatName from "../utils/formatName";

// import FolderSolid from "../svgs/FolderSolid";

// import "./../styles/contentCard.css";
// import { useNavigate } from "react-router-dom";
// import { directoryContext } from "../contexts/DirectoryContext";
// import { createDirectory, renameDirectory } from "../actions/directoryActions";
// import { renameFile } from "../actions/fileActions";
// import { fileContext } from "../contexts/FileContext";
// import { uiContext } from "../contexts/UIContext";
// import { mediaQueryContext } from "../contexts/MediaQueryContext";
// import Skeleton from "./Skeleton";

// function ContentCard({ content, ...rest }) {
//   const { state, dispatch } = useContext(directoryContext);
//   const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
//   const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
//   const { windowWidth } = useContext(mediaQueryContext);

//   const [contentName, setContentName] = useState("");
//   const [showCard, setShowCard] = useState(false);
//   const [clickCount, setClickCount] = useState(0);

//   const navigate = useNavigate();
//   const cardRef = useRef(null);
//   const imageRef = useRef(null);

//   const currentDirId = state?.currentDirectory?.id;
//   const isActive = content?.id
//     ? state?.activeContent?.id === content?.id
//     : state?.activeContent?.uploadId === content.uploadId;

//   const activeRenaming = uiState?.activeRenaming;
//   const isLoading = state?.isLoading || fileState?.isLoading;

//   const folderIconSize =
//     uiState?.viewMode === "list"
//       ? windowWidth < 660
//         ? 26
//         : windowWidth < 820
//         ? 28
//         : 30
//       : windowWidth < 380
//       ? 60
//       : windowWidth < 660
//       ? 50
//       : windowWidth < 820
//       ? 60
//       : 70;

//   // --- Click handling ---
//   const handleOpenActive = () => {
//     dispatch({ type: "SET_ACTIVE_CONTENT", payload: content });
//   };

//   const handleCloseActive = () => {
//     dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
//   };

//   const handleClick = () => {
//     if (isLoading) return;
//     setClickCount((prev) => prev + 1);
//   };

//   useEffect(() => {
//     imageRef.current.onload = () => setShowCard(true);
//   }, []);

//   // Handle single/double clicks safely
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (clickCount === 1) handleOpenActive();
//       if (clickCount === 2) handleCloseActive();
//     }, 200);
//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [clickCount]);

//   // --- Outside click handling ---
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isLoading) return;
//       if (cardRef.current && !cardRef.current.contains(e.target)) {
//         dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });
//         uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dispatch, isLoading, uiDispatch]);

//   const handleChangeInput = (e) => {
//     if (isLoading) return;
//     e.preventDefault();
//     setContentName(e.target.value.trimStart());
//   };

//   const handleKeyDown = (e) => {
//     if (isLoading) return;
//     if (e.key === "Enter") {
//       if (activeRenaming) handleRenameContent();
//       else handleCreateFolder();
//     }
//     if (e.key === "Escape") {
//       dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
//     }
//   };

//   const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
//   const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

//   const handleCreateFolder = () => {
//     if (!currentDirId || isLoading) return;
//     if (!contentName.trim()) {
//       dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
//       return;
//     }

//     const callback = () => {
//       uiDispatch({ type: "STOP_CREATING_FOLDER" });
//       closeOverlayPage();
//     };

//     openOverlayPage();
//     uiDispatch({ type: "START_CREATING_FOLDER" });
//     createDirectory({ name: contentName, parentId: currentDirId })(
//       dispatch,
//       callback
//     );
//   };

//   const handleRenameContent = () => {
//     if (!contentName.trim()) {
//       uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
//       return;
//     }

//     const callback = () => {
//       uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
//       setContentName("");
//       uiDispatch({ type: "STOP_RENAMING" });
//       closeOverlayPage();
//     };

//     uiDispatch({ type: "START_RENAMING" });
//     openOverlayPage();

//     if (content?.id)
//       renameDirectory(content.id, contentName)(dispatch, callback);
//     else renameFile(content.uploadId, contentName)(fileDispatch, callback);
//   };

//   const handleDoubleClickOnMedia = (e) => {
//     e.stopPropagation();
//     handleCloseActive();
//     uiDispatch({ type: "OPEN_MEDIAVIEWER" });
//     fileDispatch({ type: "SET_MEDIA_CONTENT", payload: content });
//   };

//   const handleDoubleClickOnFolder = (e) => {
//     e.stopPropagation();
//     navigate(`/${content.id}`);
//     handleCloseActive();
//   };

//   // --- Render logic ---
//   if (content.mimeType) {
//     // File card
//     return (
//       <div
//         className={`content_card ${isActive ? "active" : ""} ${
//           uiState?.viewMode === "list" ? "list" : ""
//         }`}
//         ref={cardRef}
//         onClick={handleClick}
//         onDoubleClick={handleDoubleClickOnMedia}
//         {...rest}
//       >
//         {!showCard && (
//           <Skeleton className="skeleton block w-100 content_icon_skeleton" />
//         )}
//         <img
//           className={`content_icon ${
//             content.mimeType.startsWith("video") ? "video" : ""
//           } ${
//             content.mimeType.startsWith("video") ||
//             content.mimeType.startsWith("image")
//               ? "media"
//               : ""
//           } ${showCard ? "" : "hidden"}`}
//           ref={imageRef}
//           src={
//             content.thumbnail
//               ? content.thumbnail
//               : content.mimeType.startsWith("image")
//               ? content.watch
//               : getFileIcon(
//                   content.mimeType,
//                   content.filename.split(".").at(-1)
//                 )
//           }
//         />
//         {isActive && activeRenaming ? (
//           <input
//             type="text"
//             className="folder_name_input"
//             autoFocus
//             value={contentName}
//             onBlur={handleRenameContent}
//             onChange={handleChangeInput}
//             onKeyDown={handleKeyDown}
//           />
//         ) : !showCard ? (
//           <Skeleton className="skeleton block w-100 content_name_skeleton" />
//         ) : (
//           <div className={`content_name ${showCard ? "" : "hidden"}`}>
//             {formatName(content.filename, 15)}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Folder card
//   if (!content?.id.startsWith("temp-")) {
//     return (
//       <div
//         className={`content_card ${isActive ? "active" : ""} ${
//           uiState?.viewMode === "list" ? "list" : ""
//         }`}
//         ref={cardRef}
//         onClick={handleClick}
//         onDoubleClick={handleDoubleClickOnFolder}
//         {...rest}
//       >
//         <FolderSolid
//           className="content_icon"
//           width={folderIconSize}
//           height={folderIconSize}
//         />
//         {activeRenaming && isActive ? (
//           <input
//             type="text"
//             className="folder_name_input"
//             autoFocus
//             value={contentName}
//             onBlur={handleRenameContent}
//             onChange={handleChangeInput}
//             onKeyDown={handleKeyDown}
//           />
//         ) : (
//           <div className="content_name folder_name">{content.name}</div>
//         )}
//       </div>
//     );
//   }

//   // Temporary new folder input
//   return (
//     <div
//       className={`content_card ${uiState?.viewMode === "list" ? "list" : ""}`}
//       {...rest}
//     >
//       <FolderSolid
//         className="content_icon folder"
//         width={folderIconSize}
//         height={folderIconSize}
//       />
//       <input
//         type="text"
//         className="folder_name_input"
//         autoFocus
//         value={contentName}
//         onBlur={handleCreateFolder}
//         onChange={handleChangeInput}
//         onKeyDown={handleKeyDown}
//       />
//     </div>
//   );
// }

// export default ContentCard;

import React, { useContext, useRef, useState } from "react";
import getFileIcon from "../utils/getFileIcon";
import formatName from "../utils/formatName";
import FolderSolid from "../svgs/FolderSolid";
import Skeleton from "./Skeleton";

import "./../styles/contentCard.css";

import { useNavigate } from "react-router-dom";
import { directoryContext } from "../contexts/DirectoryContext";
import { createDirectory, renameDirectory } from "../actions/directoryActions";
import { renameFile } from "../actions/fileActions";
import { fileContext } from "../contexts/FileContext";
import { uiContext } from "../contexts/UIContext";
import { mediaQueryContext } from "../contexts/MediaQueryContext";

function ContentCard({ content, ...rest }) {
  const { state, dispatch } = useContext(directoryContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { windowWidth } = useContext(mediaQueryContext);

  const [contentName, setContentName] = useState("");
  const [showCard, setShowCard] = useState(false);

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const clickTimeout = useRef(null);

  const currentDirId = state?.currentDirectory?.id;
  const isActive = content?.id
    ? state?.activeContent?.id === content?.id
    : state?.activeContent?.uploadId === content.uploadId;

  const activeRenaming = uiState?.activeRenaming;
  const isLoading = state?.isLoading || fileState?.isLoading;

  const folderIconSize =
    uiState?.viewMode === "list"
      ? windowWidth < 660
        ? 26
        : windowWidth < 820
        ? 28
        : 30
      : windowWidth < 660
      ? 60
      : windowWidth < 820
      ? 60
      : 70;

  // --- Event Handlers ---

  const handleClick = () => {
    if (isLoading) return;

    // Clear any existing timeout
    if (clickTimeout.current) clearTimeout(clickTimeout.current);

    // Set a timeout for single-click action
    clickTimeout.current = setTimeout(() => {
      dispatch({ type: "SET_ACTIVE_CONTENT", payload: content });
      clickTimeout.current = null;
    }, 200); // 250ms is a good delay for differentiating clicks
  };

  const handleDoubleClick = () => {
    if (isLoading) return;

    // Cancel single-click timeout when double-click happens
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }

    dispatch({ type: "SET_ACTIVE_CONTENT", payload: null });

    if (content.mimeType) {
      uiDispatch({ type: "OPEN_MEDIAVIEWER" });
      fileDispatch({ type: "SET_MEDIA_CONTENT", payload: content });
    } else {
      navigate(`/${content.id}`);
    }
  };

  const handleChangeInput = (e) => setContentName(e.target.value.trimStart());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeRenaming) handleRenameContent();
      else handleCreateFolder();
    }
    if (e.key === "Escape") dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
  };

  const openOverlayPage = () => uiDispatch({ type: "OPEN_OVERLAYPAGE" });
  const closeOverlayPage = () => uiDispatch({ type: "CLOSE_OVERLAYPAGE" });

  const handleCreateFolder = () => {
    if (!currentDirId || !contentName.trim()) {
      dispatch({ type: "REMOVE_TEMP_DIRECTORY" });
      return;
    }

    openOverlayPage();
    uiDispatch({ type: "START_CREATING_FOLDER" });

    createDirectory({ name: contentName, parentId: currentDirId })(
      dispatch,
      () => {
        uiDispatch({ type: "STOP_CREATING_FOLDER" });
        closeOverlayPage();
      }
    );
  };

  const handleRenameContent = () => {
    if (!contentName.trim()) {
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      return;
    }

    openOverlayPage();
    uiDispatch({ type: "START_RENAMING" });

    const callback = () => {
      uiDispatch({ type: "REMOVE_ACTIVE_RENAMING" });
      setContentName("");
      uiDispatch({ type: "STOP_RENAMING" });
      closeOverlayPage();
    };

    if (content?.id)
      renameDirectory(content.id, contentName)(dispatch, callback);
    else renameFile(content.uploadId, contentName)(fileDispatch, callback);
  };

  // --- Render ---
  if (content.mimeType) {
    return (
      <div
        className={`content_card ${isActive ? "active" : ""} ${
          uiState?.viewMode === "list" ? "list" : ""
        }`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        {...rest}
      >
        {!showCard && (
          <div className="content_card_skeleton">
            <Skeleton className="skeleton-thumb" />
            <Skeleton className="skeleton-text" />
          </div>
        )}
        <img
          className={`content_icon ${showCard ? "" : "hidden"} ${
            content.mimeType.startsWith("video") ? "video" : ""
          }`}
          src={
            content.thumbnail
              ? content.thumbnail
              : content.mimeType.startsWith("image")
              ? content?.thumbnail || content.watch
              : getFileIcon(
                  content.mimeType,
                  content.filename.split(".").at(-1)
                )
          }
          onLoad={() => setShowCard(true)}
        />
        {isActive && activeRenaming ? (
          <input
            type="text"
            className="folder_name_input"
            autoFocus
            value={contentName}
            onBlur={handleRenameContent}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        ) : showCard ? (
          <div className="content_name">{formatName(content.filename, 15)}</div>
        ) : null}
      </div>
    );
  }

  // Folder card
  if (!content?.id.startsWith("temp-")) {
    return (
      <div
        className={`content_card ${isActive ? "active" : ""} ${
          uiState?.viewMode === "list" ? "list" : ""
        }`}
        ref={cardRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        {...rest}
      >
        <FolderSolid width={folderIconSize} height={folderIconSize} />
        {activeRenaming && isActive ? (
          <input
            type="text"
            className="folder_name_input"
            autoFocus
            value={contentName}
            onBlur={handleRenameContent}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="folder_name">{content.name}</div>
        )}
      </div>
    );
  }

  // Temporary new folder input
  return (
    <div className="content_card">
      <FolderSolid width={folderIconSize} height={folderIconSize} />
      <input
        type="text"
        className="folder_name_input"
        autoFocus
        value={contentName}
        onBlur={handleCreateFolder}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default ContentCard;
