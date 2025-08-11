import axios from "axios";

const userId = "dusoshsuofusfjjcso";
// const uploadSessionId = sessionStorage.getItem("uploadSessionId");

const instance = axios.create({
  baseURL: "http://localhost:4040/files",
  headers: {
    userId,
    // uploadSessionId,
  },
  //   withCredentials: true,
});

// const getRootDirectory = () => instance.get("/root");
const getAll = () => instance.get("/find");
const getFile = (uploadId) => instance.get(`/${uploadId}`);
const getFiles = (uploadIds) => instance.post("/find", { uploadIds });
const uploadFile = (parentId, form) =>
  instance.post(`/upload?directory=${parentId}`, form, {
    headers: {
      uploadSessionId: sessionStorage.getItem("uploadSessionId"),
    },
  });

const renameFile = (uploadId, updatedName) =>
  instance.get(`/rename/${uploadId}?name=${updatedName}`);

export { getAll, getFile, getFiles, uploadFile, renameFile };
