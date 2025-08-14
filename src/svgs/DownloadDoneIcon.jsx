import React from "react";

function DownloadDoneIcon({ width = 20, height = 20, fillColor = "#000" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={fillColor}
        d="M5 18h14v2H5zm4.6-2.7L5 10.7l2-1.9l2.6 2.6L17 4l2 2z"
      ></path>
    </svg>
  );
}

export default DownloadDoneIcon;
