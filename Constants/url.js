import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.197:5051",
});

export const imageUrl = "http://192.168.1.197:5051";

// export const API = axios.create({
//   baseURL: "https://womenrapido.nuhvin.com",
// });

// export const imageUrl = "https://ws.nuhvin.com";
