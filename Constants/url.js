import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.31.87:5051",
});

export const imageUrl = "http://192.168.31.87:5051";
