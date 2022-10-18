import axios from "axios";
const BASE_URL = "http://localhost:4000/users";

export default axios.create({
  baseURL: BASE_URL,
});
