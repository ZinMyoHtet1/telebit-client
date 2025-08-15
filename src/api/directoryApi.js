import axios from "axios";

const userId = "dusoshsuofusfjjcso";

const api = "https://telebit-api.onrender.com";

const instance = axios.create({
  baseURL: `${api}/directories`,
  headers: {
    userId,
  },
  //   withCredentials: true,
});

const getRootDirectory = () => instance.get("/root");
const getAll = () => instance.get("/find");
const getDirectory = (dirId) => instance.get(`/${dirId}`);
const getDirectories = (dirIds) => instance.post("/find", { dirIds });
const createDirectory = (form) => instance.post("/create", form);
const renameDirectory = (dirId, updatedName) =>
  instance.get(`/rename/${dirId}?name=${updatedName}`);
const deleteDirectory = (dirId) => instance.get(`/delete/${dirId}`);
export {
  getAll,
  getRootDirectory,
  getDirectory,
  getDirectories,
  createDirectory,
  renameDirectory,
  deleteDirectory,
};
