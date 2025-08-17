import axios from "axios";

// const userId = "dusoshsuofusfjjcso";
// const uploadSessionId = sessionStorage.getItem("uploadSessionId");

// const api = "https://telebit-api.onrender.com";
const api = "http://localhost:4040";

const instance = axios.create({
  baseURL: `${api}/files`,
  // headers: {
  //   userId,
  //   // uploadSessionId,
  // },
  // withCredentials: true,
});

// const getRootDirectory = () => instance.get("/root");
const getAll = () =>
  instance.get("/find", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // user: sessionStorage.getItem("user"),
    },
  });
const getFile = (uploadId) =>
  instance.get(`/${uploadId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,

      // user: sessionStorage.getItem("user"),
    },
  });
const getFiles = (uploadIds) =>
  instance.post(
    "/find",
    { uploadIds },
    {
      headers: {
        userId: JSON.parse(sessionStorage.getItem("user")).userId,

        // uploadSessionId: sessionStorage.getItem("uploadSessionId"),
      },
    }
  );
const uploadFile = (parentId, form) =>
  instance.post(`/upload?directory=${parentId}`, form, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      uploadSessionId: JSON.parse(sessionStorage.getItem("uploadSessionId")),
    },
  });

const renameFile = (uploadId, updatedName) =>
  instance.get(`/rename/${uploadId}?name=${updatedName}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // user: sessionStorage.getItem("user"),
    },
  });
const deleteFile = (uploadId, parentId) =>
  instance.get(`/delete/${uploadId}?directory=${parentId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,

      // uploadSessionId: sessionStorage.getItem("uploadSessionId"),
    },
  });

export { getAll, getFile, getFiles, uploadFile, renameFile, deleteFile };
