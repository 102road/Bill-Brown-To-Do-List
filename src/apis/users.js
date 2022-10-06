import axios from "axios";
const BASE_URL = "https://project-pursuit-database.herokuapp.com/users";

export default axios.create({
  baseURL: BASE_URL,
});
