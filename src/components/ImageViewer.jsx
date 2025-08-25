import React, { useState } from "react";
import "./../styles/imageViewer.css";

import LoadingSpinner from "./../svgs/LoadingSpinner";

function ImageViewer({ content }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div id="image_viewer">
      {loading && <LoadingSpinner fillColor="#aca3a3" />}
      <img
        src={content?.watch}
        alt={content?.filename}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
}

export default ImageViewer;
