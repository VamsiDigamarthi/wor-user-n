import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.11.167:5051",
});

export const imageUrl = "http://192.168.11.167:5051";

// export const API = axios.create({
//   baseURL: "https://womenrapido.nuhvin.com",
// });

// export const imageUrl = "https://ws.nuhvin.com";
