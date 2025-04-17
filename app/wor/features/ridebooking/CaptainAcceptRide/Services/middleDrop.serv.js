import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const middleDropRejection = async ({ orderId, token }) => {
  try {
    await API.patch(
      `/user/middle-drop-rejection/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Toast.show({
      text1: "Middle Drop Request Rejected",
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    console.log(error?.response?.data);
    Toast.show({
      text1: "Middle Drop Request Rejected Failed",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const middleDropAccept = async ({ orderId, token }) => {
  try {
    await API.patch(
      `/user/middle-drop-accept/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Toast.show({
      text1: "Re-Place Order success",
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    console.log(error?.response?.data);
    Toast.show({
      text1: "Failed to Accept the middle drop request",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
