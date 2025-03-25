import Toast from "react-native-toast-message";
import { API } from "../../../../../Constants/url";

export const fetchChatMessagesApi = async ({ token, chatId }) => {
  try {
    const response = await API.get(`/support-chat/messages/${chatId}`);

    return response.data;
  } catch (error) {
    console.log(error?.response?.data);

    Toast.show({
      text1: "chat message error",
      type: "error",
      position: "bottom",
    });
    return [];
  }
};

export const handleSendImage = async (formData) => {
  try {
    const res = await API.patch("/support-uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return res?.data?.msg;
  } catch (error) {
    console.log(error?.response?.data);

    Toast.show({
      text1: "chat message error",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
