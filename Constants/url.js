import axios from "axios";

// <<<<<<< 31-12-sos-changes
// export const API = axios.create({
//   baseURL: "http://192.168.11.167:5051",
// });

// export const imageUrl = "http://192.168.11.167:5051";

// =======
// >>>>>>> master
// export const API = axios.create({
//   baseURL: "http://192.168.31.87:5051",
// });

// export const imageUrl = "http://192.168.31.87:5051";

export const API = axios.create({
  baseURL: "https://womenrapido.nuhvin.com",
});

export const imageUrl = "https://ws.nuhvin.com";
