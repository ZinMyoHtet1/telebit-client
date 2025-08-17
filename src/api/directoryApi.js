import axios from "axios";

// const userId = "dusoshsuofusfjjcso";

// const api = "https://telebit-api.onrender.com";
const api = "http://localhost:4040";

const instance = axios.create({
  baseURL: `${api}/directories`,
  // headers: {
  //   userId,
  // },
  //   withCredentials: true,
});

const getRootDirectory = () =>
  instance.get("/root", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // uploadSessionId: sessionStorage.getItem("uploadSessionId"),
    },
  });
const getAll = () =>
  instance.get("/find", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // uploadSessionId: sessionStorage.getItem("uploadSessionId"),
    },
  });
const getDirectory = (dirId) =>
  instance.get(`/${dirId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // uploadSessionId: sessionStorage.getItem("uploadSessionId"),
    },
  });
const getDirectories = (dirIds) =>
  instance.post(
    "/find",
    { dirIds },
    {
      headers: {
        userId: JSON.parse(sessionStorage.getItem("user")).userId,
        // user: sessionStorage.getItem("user"),
      },
    }
  );
const createDirectory = (form) =>
  instance.post("/create", form, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // user: sessionStorage.getItem("user"),
    },
  });
const renameDirectory = (dirId, updatedName) =>
  instance.get(`/rename/${dirId}?name=${updatedName}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // user: sessionStorage.getItem("user"),
    },
  });
const deleteDirectory = (dirId) =>
  instance.get(`/delete/${dirId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
      // user: sessionStorage.getItem("user"),
    },
  });
export {
  getAll,
  getRootDirectory,
  getDirectory,
  getDirectories,
  createDirectory,
  renameDirectory,
  deleteDirectory,
};
