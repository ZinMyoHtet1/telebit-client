async function getImageThumbnail(file, maxWidth = 200) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = maxWidth / img.width;
      const canvasWidth = maxWidth;
      const canvasHeight = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      const dataURL = canvas.toDataURL("image/jpeg", 0.6);
      resolve(dataURL);
    };

    img.onerror = (err) => reject(`Error processing image file: ${err}`);

    img.src = URL.createObjectURL(file);
  });
}

export default getImageThumbnail;
