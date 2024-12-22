import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.31.87:5051",
});

export const imageUrl = "http://192.168.31.87:5051";

// export const API = axios.create({
//   baseURL: "https://bbdc-183-82-10-109.ngrok-free.app",
// });

// export const imageUrl = "https://bbdc-183-82-10-109.ngrok-free.app";
