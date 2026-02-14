// import React, { useContext } from "react";

// import "./../styles/mediaViewer.css";
// import { uiContext } from "../contexts/UIContext";
// import { fileContext } from "../contexts/FileContext";
// import VideoPlayer from "../components/VideoPlayer";
// import ImageViewer from "../components/ImageViewer";

// function MediaViewer() {
//   const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
//   const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);

//   const hidden = !uiState?.mediaViewer;
//   const currentContent = fileState?.mediaContent;
//   const files = fileState?.files || [];

//   const isVideo = currentContent?.mimeType?.startsWith("video");

//   const mediaContents =
//     files.length > 0 &&
//     files.filter(
//       (file) =>
//         file.mimeType.startsWith("video") || file.mimeType.startsWith("image")
//     );

//   const handleClose = () => {
//     uiDispatch({ type: "CLOSE_MEDIAVIEWER" });
//     fileDispatch({ type: "SET_MEDIA_CONTENT", payload: null });
//   };

//   return (
//     <div id="media_viewer" className={`overlay_page ${hidden ? "hidden" : ""}`}>
//       <button className="close_btn" onClick={handleClose}>
//         close
//       </button>
//       <div className="slide_page">
//         <button className="left_arrow_btn">left</button>
//         {isVideo ? (
//           <VideoPlayer content={currentContent} />
//         ) : (
//           <ImageViewer content={currentContent} />
//         )}

//         <button className="right_arrow_btn">right</button>
//       </div>
//     </div>
//   );
// }

// export default MediaViewer;

import React, { useContext, useState, useEffect } from "react";
import "./../styles/mediaViewer.css";
import { uiContext } from "../contexts/UIContext";
import { fileContext } from "../contexts/FileContext";
import VideoPlayer from "../components/VideoPlayer";
import ImageViewer from "../components/ImageViewer";
import formatName from "../utils/formatName";

function MediaViewer() {
  const { state: uiState, dispatch: uiDispatch } = useContext(uiContext);
  const { state: fileState, dispatch: fileDispatch } = useContext(fileContext);
  const [currentContent, setCurrentContent] = useState(null);

  const hidden = !uiState?.mediaViewer;
  const files = fileState?.mediaFiles || [];
  // const files = fileState?.files || [];
  const mediaContents = files?.filter(
    (file) =>
      file.mimeType.startsWith("video") || file?.mimeType?.startsWith("image"),
  );

  const initialIndex = mediaContents?.findIndex(
    (file) => file?.uploadId === fileState?.mediaContent?.uploadId,
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Keep sync with opening media
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    setCurrentContent(mediaContents[currentIndex]);
  }, [currentIndex, mediaContents]);

  const isVideo = currentContent?.mimeType?.startsWith("video");

  const handleClose = () => {
    uiDispatch({ type: "CLOSE_MEDIAVIEWER" });
    fileDispatch({ type: "SET_MEDIA_CONTENT", payload: null });
  };
  // const handleClose = () => {
  //   if (uiState?.MediaViewer) {
  //     uiDispatch({ type: "CLOSE_MEDIAVIEWER" });
  //     fileDispatch({ type: "SET_MEDIA_CONTENT", payload: null });
  //   }
  // };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaContents.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mediaContents.length) % mediaContents.length,
    );
  };

  // Touch swipe handling
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 80) handleNext(); // swipe left
    if (touchEndX - touchStartX > 80) handlePrev(); // swipe right
  };

  useEffect(() => {
    // Push a new history state when the component mounts
    history.pushState({ mediaOpen: true }, "");
    window.addEventListener("popstate", handleClose);

    return () => {
      window.removeEventListener("popstate", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="media_viewer"
      className={`overlay_page ${hidden ? "hidden" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="media_navbar">
        <div className="content_name">
          {formatName(currentContent?.filename, 100)}
        </div>
        <button className="close_btn" onClick={handleClose}>
          ✖
        </button>
      </div>

      <div className="slide_page">
        <button className="left_arrow_btn" onClick={handlePrev}>
          ◀
        </button>

        {isVideo ? (
          <VideoPlayer
            key={currentContent?.uploadId}
            content={currentContent}
          />
        ) : (
          <ImageViewer
            key={currentContent?.uploadId}
            content={currentContent}
          />
        )}

        <button className="right_arrow_btn" onClick={handleNext}>
          ▶
        </button>
      </div>
    </div>
  );
}

export default MediaViewer;
