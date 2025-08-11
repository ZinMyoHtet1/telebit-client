async function getVideoThumbnail(file, seekTo = 1, maxWidth = 200) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.src = URL.createObjectURL(file);
    video.playsInline = true;

    video.onloadedmetadata = () => {
      if (seekTo > video.duration) seekTo = video.duration;
      video.currentTime = seekTo;
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      const scale = maxWidth / video.videoWidth;
      const canvasWidth = maxWidth;
      const canvasHeight = video.videoHeight * scale;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);

      const dataURL = canvas.toDataURL("image/jpeg", 0.6);
      URL.revokeObjectURL(video.src);
      resolve(dataURL);
    };

    video.onerror = (err) => reject(`Error processing video file: ${err}`);
  });
}

export default getVideoThumbnail;
