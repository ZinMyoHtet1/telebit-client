import React from "react";

import "./../styles/videoPlayer.css";
function VideoPlayer({ content }) {
  const safeMimeType = content.mimeType?.split(";")[0] || "video/mp4";
  return (
    <div id="video_player">
      <video controls autoPlay key={content?.uploadId}>
        <source src={content.watch} type={safeMimeType} />
      </video>
    </div>
  );
}

export default VideoPlayer;
