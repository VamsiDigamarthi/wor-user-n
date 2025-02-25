import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.12:5051",
});

export const imageUrl = "http://192.168.1.12:5051";
export const socketUrl = "http://192.168.1.12:5051";



// export const API = axios.create({
//   baseURL: "https://womenrapido.nuhvin.com",
// });

// export const imageUrl = "https://womenrapido.nuhvin.com";
// export const socketUrl = "https://ws.nuhvin.com";
