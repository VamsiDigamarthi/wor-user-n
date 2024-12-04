import axios from "axios";

export const API = axios.create({
  baseURL: "https://womenrapido.nuhvin.com",
});

export const imageUrl = "https://womenrapido.nuhvin.com";

// 192.168.106.167

// export const API = axios.create({
//   baseURL: "http://192.168.1.197:5051",
// });

// export const imageUrl = "http://192.168.1.197:5051";

// export const API = axios.create({
//   baseURL: "https://bbdc-183-82-10-109.ngrok-free.app",
// });

// export const imageUrl = "https://bbdc-183-82-10-109.ngrok-free.app";
