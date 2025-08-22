import generateUploadId from "./generateUploadId";
import getImageThumbnail from "./getImageThumbnail";
import getVideoThumbnail from "./getVideoThumbnail";

async function createFormData(file) {
  const uploadId = generateUploadId();
  const formData = new FormData();
  formData.append("filename", file.name);
  formData.append("uploadId", uploadId);
  //   formData.append("contentType", file.type);
  formData.append("size", String(file.size));
  formData.append("file", file);
  if (file.type.startsWith("video")) {
    const thumbnail = await getVideoThumbnail(file);
    formData.append("thumbnail", thumbnail);
  }

  if (file.type.startsWith("image")) {
    const thumbnail = await getImageThumbnail(file);
    formData.append("thumbnail", thumbnail);
  }

  return formData;
}

export default createFormData;
