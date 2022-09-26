import axios from "axios";

const api = axios.create({
  baseURL: "https://api-upvote-golang.herokuapp.com",
});

export default api;