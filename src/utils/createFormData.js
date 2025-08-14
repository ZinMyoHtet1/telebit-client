import generateUploadId from "./generateUploadId";
import getVideoThumbnail from "./getVideoThumbnail";

async function createFormData(file) {
  const uploadId = generateUploadId();
  const formData = new FormData();
  formData.append("filename", file.name);
  formData.append("uploadId", uploadId);
  //   formData.append("contentType", file.type);
  formData.append("size", file.size);
  formData.append("file", file);
  const thumbnail = await getVideoThumbnail(file);
  formData.append("thumbnail", thumbnail);

  return formData;
}

export default createFormData;
