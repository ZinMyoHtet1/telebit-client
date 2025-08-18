import axios from "axios";

// const userId = "dusoshsuofusfjjcso";

const api = "https://telebit-api.onrender.com";

const instance = axios.create({
  baseURL: `${api}/directories`,
});

const getRootDirectory = () =>
  instance.get("/root", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const getAll = () =>
  instance.get("/find", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const getDirectory = (dirId) =>
  instance.get(`/${dirId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const getDirectories = (dirIds) =>
  instance.post(
    "/find",
    { dirIds },
    {
      headers: {
        userId: JSON.parse(sessionStorage.getItem("user")).userId,
      },
    }
  );
const createDirectory = (form) =>
  instance.post("/create", form, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const renameDirectory = (dirId, updatedName) =>
  instance.get(`/rename/${dirId}?name=${updatedName}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const deleteDirectory = (dirId) =>
  instance.get(`/delete/${dirId}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
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
