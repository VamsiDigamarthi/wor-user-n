import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.125.167:5051",
});

export const imageUrl = "http://192.168.125.167:5051";
export const socketUrl = "http://192.168.125.167:5051";

// export const imageUrl = "https://192.168.125.167:5051";
