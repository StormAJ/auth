import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_apiUrl;
axios.defaults.baseURL = apiUrl;
console.log("apiUrl : ", apiUrl);
// const config = require("config");

axios.interceptors.response.use(null, error => {
  const isExpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!isExpectedError) {
    // logService.log(error);
    toast.error("Unexpected error occured", { containerId: "err" });
  }
  return Promise.reject(error);
});

function getUsers() {
  // return axios.get(apiUrl + "/users", {});
  return axios.get("/users", {});
}

function deleteUser(email) {
  return axios.delete("/users/" + email, {});
}

function registerUser(user) {
  this.setApiKey();
  return axios.post("/users", user);
}

function login(email, password) {
  return axios.post("/login", { email, password });
}

function changePW(password) {
  return axios.patch("/users", { password });
}

function getUser() {
  this.setJwt();
  return axios.get("/auth");
}

function setJwt() {
  axios.defaults.headers.common["x-token"] = localStorage.getItem("jwt");
}

function setApiKey() {
  axios.defaults.headers.common["x-api-key"] = localStorage.getItem("apiKey");
}

function clearApiKey() {
  axios.defaults.headers.common["x-api-key"] = "";
}

export default {
  getUsers,
  deleteUser,
  registerUser,
  login,
  changePW,
  getUser,
  setJwt,
  setApiKey,
  // saveJwt,
  clearApiKey
};
