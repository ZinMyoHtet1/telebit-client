import axios from "axios";

// const userId = "dusoshsuofusfjjcso";

// const api = "https://telebit-api.onrender.com";
const api = "http://localhost:4040";

const instance = axios.create({
  baseURL: `${api}/trashes`,
});

const getTrashes = () =>
  instance.get("/getTrashes", {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });
const retrieveTrash = (content) =>
  instance.post(`/retrieveTrash`, content, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });

const deleteTrash = (id) =>
  instance.delete(`/deleteTrash?id=${id}`, {
    headers: {
      userId: JSON.parse(sessionStorage.getItem("user")).userId,
    },
  });

export { getTrashes, retrieveTrash, deleteTrash };
