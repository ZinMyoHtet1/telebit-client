// import React, { useContext, useEffect, useRef, useState } from "react";

// import uploadCloud_outline_icon from "./../assets/uploadCloud_outline_icon.png";

// import "./../styles/uploadFile.css";
// import SingleFilePreview from "../components/SingleFilePreview.jsx";
// import MultiFilePreview from "../components/MultiFilePreview.jsx";
// import { uiContext } from "../contexts/UIContext.js";
// import removeDuplicateFiles from "../utils/removeDuplicateFiles.js";
// import { fileContext } from "../contexts/FileContext.js";
// import { directoryContext } from "../contexts/DirectoryContext.js";

// function UploadFile() {
//   const [showContent, setShowContent] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [activeUploadArea, setActiveUploadArea] = useState(false);
//   const uploadAreaRef = useRef(null);

//   const { dispatch: uiDispatch } = useContext(uiContext);
//   const { dispatch: fileDispatch } = useContext(fileContext);
//   const { state: directoryState } = useContext(directoryContext);

//   const parentId = directoryState?.currentDirectory?.id;
//   // const uploadingContents = fileState?.uploadingContents;
//   // console.log(directoryState?.currentDirectory, "main directory");

//   // useEffect(() => {
//   //   setUploadingContents(fileState?.uploadingContents);
//   //   setParentId(directoryState?.currentDirectory?.id);
//   // }, [directoryState?.currentDirectory?.id, fileState?.uploadingContents]);

//   // Close upload page
//   const handleClose = () => {
//     uiDispatch({ type: "CLOSE_UPLOADPAGE" });
//   };

//   const handleUploadAreaClick = () => {
//     const uploadFileInput = document.getElementById("uploadFileInput");

//     uploadFileInput.click();
//   };

//   const handleChangeInputFile = (e) => {
//     const fileArray = Array.from(e.target.files).map((file) => ({
//       parentId,
//       file,
//     }));
//     setSelectedFiles((previous) => {
//       if (!previous.length) return fileArray; // always return array ✅
//       const files = [...previous, ...fileArray];
//       const uniqueFiles = removeDuplicateFiles(files);
//       return uniqueFiles;
//     });
//   };

//   function handleRemoveFromList(file) {
//     const result = [];
//     const fileKeyToRemove = `${file.name}-${file.size}-${file.lastModified}`;
//     selectedFiles.forEach((file) => {
//       const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

//       if (fileKey === fileKeyToRemove) return;
//       result.push(file);
//     });
//     setSelectedFiles(result);
//   }

//   const handleUpload = async () => {
//     if (!selectedFiles?.length) return;
//     // await deleteFiles("uploadingFiles");
//     // await saveFiles("uploadingFiles", [...uploadingContents, ...selectedFiles]);
//     fileDispatch({
//       type: "ADD_UPLOADING_CONTENTS",
//       payload: selectedFiles,
//     });
//     handleClose();
//     setSelectedFiles([]);
//   };

//   // Drag and Drop
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setActiveUploadArea(true);
//   };

//   const handleDragLeave = () => {
//     setActiveUploadArea(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setActiveUploadArea(false);
//     if (e.dataTransfer.files.length) {
//       const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
//         parentId,
//         file,
//       }));
//       setSelectedFiles((previous) => {
//         if (!previous.length) return droppedFiles;
//         const files = [...previous, ...droppedFiles];
//         return removeDuplicateFiles(files);
//       });
//     }
//   };

//   useEffect(() => {
//     if (selectedFiles?.length) {
//       setShowContent(true);
//     }
//   }, [selectedFiles]);

//   useEffect(() => {
//     const uploadArea = uploadAreaRef.current;
//     if (uploadArea) {
//       uploadArea.addEventListener("dragover", handleDragOver);
//       uploadArea.addEventListener("dragleave", handleDragLeave);
//       uploadArea.addEventListener("drop", handleDrop);
//     }

//     return () => {
//       if (uploadArea) {
//         uploadArea.removeEventListener("dragover", handleDragOver);
//         uploadArea.removeEventListener("dragleave", handleDragLeave);
//         uploadArea.removeEventListener("drop", handleDrop);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <div className="overlay_page" id="uploadFile_page">
//       <div className="wrapper">
//         <h1>Upload File</h1>
//         <div
//           id="uploadArea"
//           className={`${
//             showContent && selectedFiles.length ? "minimize" : ""
//           } ${activeUploadArea ? "active" : ""}`}
//           onClick={handleUploadAreaClick}
//         >
//           <img src={uploadCloud_outline_icon} alt="upload_icon" />
//           <h4>Click to browse or drag & drop</h4>
//           <input
//             type="file"
//             name="uploadFile"
//             className="hidden"
//             id="uploadFileInput"
//             onChange={handleChangeInputFile}
//             multiple
//           />
//         </div>

//         {showContent && (
//           <>
//             {selectedFiles?.length === 1 ? (
//               <SingleFilePreview
//                 file={selectedFiles[0]["file"]}
//                 handleClear={() => {
//                   setSelectedFiles([]);
//                   setShowContent(false);
//                 }}
//               />
//             ) : selectedFiles.length > 1 ? (
//               <MultiFilePreview
//                 files={selectedFiles}
//                 // handlers={{ handleClearAll, handleRemoveFromList }}
//                 handleClear={() => {
//                   setSelectedFiles([]);
//                   setShowContent(false);
//                 }}
//                 handleRemoveFromList={handleRemoveFromList}
//               />
//             ) : null}
//             <div className="actions">
//               <button className="cancel_btn btn" onClick={handleClose}>
//                 cancel
//               </button>
//               <button className="upload_btn btn" onClick={handleUpload}>
//                 upload
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UploadFile;

import React, { useContext, useEffect, useRef, useState } from "react";

import uploadCloud_outline_icon from "./../assets/uploadCloud_outline_icon.png";

import "./../styles/uploadFile.css";
import SingleFilePreview from "../components/SingleFilePreview.jsx";
import MultiFilePreview from "../components/MultiFilePreview.jsx";
import { uiContext } from "../contexts/UIContext.js";
import removeDuplicateFiles from "../utils/removeDuplicateFiles.js";
import { fileContext } from "../contexts/FileContext.js";
import { directoryContext } from "../contexts/DirectoryContext.js";

function UploadFile() {
  const [showContent, setShowContent] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]); // [{ parentId, file }]
  const [activeUploadArea, setActiveUploadArea] = useState(false);

  const uploadAreaRef = useRef(null);
  const inputRef = useRef(null);

  const { dispatch: uiDispatch } = useContext(uiContext);
  const { dispatch: fileDispatch } = useContext(fileContext);
  const { state: directoryState } = useContext(directoryContext);

  const parentId = directoryState?.currentDirectory?.id ?? null;

  // Close upload page
  const handleClose = () => {
    uiDispatch({ type: "CLOSE_UPLOADPAGE" });
  };

  const handleUploadAreaClick = () => {
    console.log("click upload area");
    inputRef.current?.click();
  };

  const toWrapped = (filesLike) =>
    Array.from(filesLike || []).map((f) => ({ parentId, file: f }));

  const handleChangeInputFile = (e) => {
    const fileList = e?.target?.files;
    if (!fileList?.length) return;

    const fileArray = toWrapped(fileList);
    setSelectedFiles((previous) => {
      if (!previous?.length) return fileArray;
      const combined = [...previous, ...fileArray];
      return removeDuplicateFiles(combined);
    });
  };

  function handleRemoveFromList(targetFile) {
    // targetFile is a native File object
    const targetKey = `${targetFile.name}-${targetFile.size}-${targetFile.lastModified}`;

    setSelectedFiles((prev) =>
      prev.filter(({ file }) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;
        return key !== targetKey;
      })
    );
  }

  const handleUpload = async () => {
    if (!selectedFiles?.length) return;

    fileDispatch({
      type: "ADD_UPLOADING_CONTENTS",
      payload: selectedFiles,
    });

    handleClose();
    setSelectedFiles([]);
  };

  // Drag and Drop (React-way)
  const handleDragOver = (e) => {
    e.preventDefault();
    setActiveUploadArea(true);
  };

  const handleDragLeave = () => {
    setActiveUploadArea(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setActiveUploadArea(false);

    const dropped = e.dataTransfer?.files;
    if (!dropped || dropped.length === 0) return;

    const wrapped = toWrapped(dropped);
    setSelectedFiles((previous) => {
      if (!previous.length) return wrapped;
      const combined = [...previous, ...wrapped];
      return removeDuplicateFiles(combined);
    });
  };

  useEffect(() => {
    if (selectedFiles?.length) {
      setShowContent(true);
    }
  }, [selectedFiles]);

  return (
    <div className="overlay_page" id="uploadFile_page">
      <div className="wrapper">
        <h1>Upload File</h1>

        <div
          id="uploadArea"
          ref={uploadAreaRef}
          className={`${
            showContent && selectedFiles.length ? "minimize" : ""
          } ${activeUploadArea ? "active" : ""}`}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img src={uploadCloud_outline_icon} alt="upload_icon" />
          <h4>Click to browse or drag & drop</h4>
          <input
            ref={inputRef}
            type="file"
            name="uploadFile"
            className="hidden"
            id="uploadFileInput"
            onChange={handleChangeInputFile}
            multiple
          />
        </div>

        {showContent && (
          <>
            {selectedFiles?.length === 1 ? (
              <SingleFilePreview
                file={selectedFiles[0].file}
                handleClear={() => {
                  setSelectedFiles([]);
                  setShowContent(false);
                }}
              />
            ) : selectedFiles?.length > 1 ? (
              <MultiFilePreview
                files={selectedFiles}
                handleClear={() => {
                  setSelectedFiles([]);
                  setShowContent(false);
                }}
                handleRemoveFromList={handleRemoveFromList}
              />
            ) : null}
          </>
        )}
        <div className="actions">
          <button className="cancel_btn btn" onClick={handleClose}>
            cancel
          </button>
          <button className="upload_btn btn" onClick={handleUpload}>
            upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
