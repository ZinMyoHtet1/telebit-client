import React from "react";

import "./../styles/imageViewer.css";
function ImageViewer({ content }) {
  return (
    <div id="image_viewer">
      <img src={content?.watch} alt={content?.filename} />
    </div>
  );
}

export default ImageViewer;
