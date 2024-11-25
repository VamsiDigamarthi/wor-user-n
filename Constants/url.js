import axios from "axios";

export const API = axios.create({
  baseURL: "https://testnarasimha.nuhvin.com",
});

export const imageUrl = "https://testnarasimha.nuhvin.com";

// 192.168.106.167

// export const API = axios.create({
//   baseURL: "http://192.168.1.197:5050",
// });

// export const imageUrl = "http://192.168.1.197:5050";
