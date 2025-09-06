import axios from "axios";

// const userId = "dusoshsuofusfjjcso";

// const api = "https://telebit-api.onrender.com";
const api = "http://localhost:4040";

const instance = axios.create({
  baseURL: `${api}/files`,
});

const getAll = () =>
  instance.get("/find", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const getFile = (uploadId) =>
  instance.get(`/${uploadId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const getFiles = (uploadIds) =>
  instance.post(
    "/find",
    { uploadIds },
    {
      headers: {
        userId: JSON.parse(sessionStorage.getItem("user")).userId,
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
    },
  });
const deleteFile = (uploadId, parentId) =>
  instance.get(`/delete/${uploadId}?directory=${parentId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });

export { getAll, getFile, getFiles, uploadFile, renameFile, deleteFile };
