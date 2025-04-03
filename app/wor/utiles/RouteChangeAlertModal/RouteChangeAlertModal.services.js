import Toast from "react-native-toast-message";
import { API } from "../../../../Constants/url";

export const wrongRouteSafeAndSecure = async ({ orderId, token }) => {
  try {
    await API.patch(
      `/road/change-router-modal/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("==========================");
  } catch (error) {
    console.log(error);

    Toast.show({
      text1: "Failed to fetch favorite places",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const quickAlertButtonClick = async ({ orderId, token }) => {
  try {
    await API.patch(
      `/road/change-router-quick-alert/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    Toast.show({
      text1: "Failed to fetch favorite places",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
