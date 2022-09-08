import axios from "axios";
const BASE_URL = "https://project-pursuit-database.herokuapp.com//projects";
const token = sessionStorage.getItem("token");

export default axios.create({
  baseURL: BASE_URL,
  headers: { Authorisation: `Bearer ${token}` },
});
