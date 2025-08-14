import { useEffect, useState } from "react";
import formatFileSize from "../utils/formatFileSize.js";
import formatName from "./../utils/formatName.js";
import getFileIcon from "./../utils/getFileIcon.js";
import "./../styles/singleFilePreview.css";
import getVideoThumbnail from "../utils/getVideoThumbnail.js";

function SingleFilePreview({ file, handleClear }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isImage = file?.type.startsWith("image/");
  const isVideo = file?.type.startsWith("video/");

  // Generate thumbnail for video or use direct preview for image
  useEffect(() => {
    if (!file) return;

    if (isImage) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    if (isVideo) {
      getVideoThumbnail(file).then((th) => setPreviewUrl(th));
    }

    if (!isImage && !isVideo) {
      setPreviewUrl(null);
    }
  }, [file, isImage, isVideo]);

  return (
    <div className="preview_content" id="single_file_preview">
      <div className="content_item">
        <h3 className="name">Selected File</h3>
        <button className="clear" onClick={handleClear}>
          Clear
        </button>
      </div>

      {previewUrl ? (
        <img src={previewUrl} alt="content_preview" />
      ) : (
        <img
          src={getFileIcon(file.type, file.name.split(".").at(-1))}
          alt="file_icon"
        />
      )}

      <div className="content_item">
        <span className="property">Name:</span>
        <span className="value">{formatName(file.name, 30)}</span>
      </div>
      <div className="content_item">
        <span className="property">Type:</span>
        <span className="value">{file.type}</span>
      </div>
      <div className="content_item">
        <span className="property">Size:</span>
        <span className="value">{formatFileSize(file.size)}</span>
      </div>
      <div className="content_item">
        <span className="property">Last Modified:</span>
        <span className="value">
          {new Date(file.lastModified).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default SingleFilePreview;
