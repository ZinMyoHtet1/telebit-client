import React, { useState } from "react";
import "./../styles/imageViewer.css";

import TubeSpinner from "./../svgs/TubeSpinner";

function ImageViewer({ content }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div id="image_viewer">
      {loading && <TubeSpinner fillColor="#aca3a3" width={32} height={32} />}
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
