import Toast from "react-native-toast-message";
import { API } from "../../../../../Constants/url";

export const addedQueryToDb = async ({ token, formData }) => {
  try {
    const res = await API.post("/new-chat-box/query", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.log(error);

    Toast.show({
      text1: "chat message error",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
