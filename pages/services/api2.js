import axios from "axios";

const api2 = axios.create({
  baseURL: "https://economia.awesomeapi.com.br",
});

export default api2;