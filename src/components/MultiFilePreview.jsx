import React, { useEffect, useState } from "react";
import getFileIcon from "../utils/getFileIcon.js";
import formatFileSize from "../utils/formatFileSize.js";
import formatName from "./../utils/formatName.js";
import cancelCircle_outline_icon from "./../assets/cancelCircle_outline_icon.png";
import getVideoThumbnail from "../utils/getVideoThumbnail.js";

import "./../styles/multiFilePreview.css";

function MultiFilePreview({ files, handleClear, handleRemoveFromList }) {
  const [previews, setPreviews] = useState({}); // store fileName -> preview URL

  useEffect(() => {
    const newPreviews = {};

    files.forEach((fl) => {
      const file = fl["file"];
      const ext = file.name?.split(".").at(-1);
      const isImage = file?.type.startsWith("image/");
      const isVideo = file?.type.startsWith("video/");

      if (isImage) {
        const url = URL.createObjectURL(file);
        newPreviews[file.name] = url;
      } else if (isVideo) {
        getVideoThumbnail(file).then((thumbnail) => {
          setPreviews((prev) => ({ ...prev, [file.name]: thumbnail }));
        });
      } else {
        newPreviews[file.name] = getFileIcon(file.type, ext);
      }
    });

    setPreviews((prev) => ({ ...prev, ...newPreviews }));

    return () => {
      Object.values(newPreviews).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  return (
    <div id="multi_file_preview">
      <div className="content_item">
        <h3 className="name">Selected File</h3>
        <button className="clear_btn btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {files.map(({ file }) => {
        return (
          <div key={file.name} className="preview_content">
            <img
              src={
                previews[file.name] ||
                getFileIcon(file.type, file.name?.split(".").at(-1))
              }
              alt="file_preview"
              className="content_image"
            />
            <div className="content">
              <div className="content_name">{formatName(file.name, 30)}</div>
              <div className="content_size">{formatFileSize(file.size)}</div>
            </div>
            <button
              className="remove_btn btn"
              onClick={() => handleRemoveFromList(file)}
            >
              <img src={cancelCircle_outline_icon} alt="cancel_icon" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MultiFilePreview;
