import axios from "axios";
const BASE_URL = "http://localhost:4000/projects";
const token = sessionStorage.getItem("token");

export default axios.create({
  baseURL: BASE_URL,
  headers: { Authorisation: `Bearer ${token}` },
});
