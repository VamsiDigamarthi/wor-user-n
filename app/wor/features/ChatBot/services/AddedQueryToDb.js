import Toast from "react-native-toast-message";
import { API } from "../../../../../Constants/url";

export const addedQueryToDb = async ({ token, formData }) => {
  try {
    let dataToSend = formData;
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    // Check if image exists and prepare FormData
    if (formData.image) {
      const form = new FormData();

      // Append all fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") {
          form.append("image", {
            uri: value,
            name: "upload.jpg", // or extract from uri
            type: "image/jpeg", // or use image library to detect type
          });
        } else {
          form.append(key, value);
        }
      });

      dataToSend = form;
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const res = await API.post("/new-chat-box/query", dataToSend, {
      headers,
    });

    return true;
  } catch (error) {
    console.log(error);

    Toast.show({
      text1: "Chat message error",
      type: "error",
      position: "bottom",
    });

    return false;
  }
};
