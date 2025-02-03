import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const fetchChatbotMessage = async ({ token, orderId, caterogy }) => {
  console.log("caterogy", caterogy);

  try {
    const res = await API.get(`/chat-bot/${orderId}/${caterogy}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data[0]?.allMessages;
  } catch (error) {
    console.log(error?.response?.data);

    Toast.show({
      text1: "Failed to Fetch Chat bot messages",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const savedNewMessageApi = async ({
  token,
  orderId,
  caterogy,
  message,
}) => {
  try {
    await API.patch(
      `/chat-bot/${orderId}/${caterogy}`,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    Toast.show({
      text1: "Failed Added New Message",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
