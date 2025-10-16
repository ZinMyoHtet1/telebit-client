import React from "react";
import getFileIcon from "../utils/getFileIcon";

import formatName from "../utils/formatName";
import formatFileSize from "../utils/formatFileSize";

import "./../styles/downloadedItem.css";
function DownloadItem({ content, state = "downloaded", ...rest }) {
  const image = content?.thumbnail
    ? content?.thumbnail
    : getFileIcon(content?.type, content?.name?.split(".").at(-1));
  return (
    <div className="download_item" {...rest}>
      <img src={image} alt={content.name} className="content_img" />
      <div className="content_detail">
        <div className="content_name">{formatName(content.name, 100)}</div>
        <div className="content_size">{formatFileSize(content.size)}</div>
      </div>
      {state === "pending" && (
        <div className="content_state pending">Pending</div>
      )}

      {state === "downloading" && (
        <div className="content_state pending">downloading</div>
      )}
    </div>
  );
}

export default DownloadItem;
