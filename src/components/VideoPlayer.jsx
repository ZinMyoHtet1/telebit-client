import React from "react";

import "./../styles/videoPlayer.css";
function VideoPlayer({ content }) {
  return (
    <div id="video_player">
      <video controls autoPlay key={content?.uploadId}>
        <source src={content.watch} type={content.mimeType} />
      </video>
    </div>
  );
}

export default VideoPlayer;
