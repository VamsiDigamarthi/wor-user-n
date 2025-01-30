import Toast from "react-native-toast-message";
import { API } from "../../../../../Constants/url";

export const changeDonationStatus = async ({ token }) => {
  try {
    const response = await API.patch(
      "/auth/donation-active",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Toast.show({
      text1: response?.data?.message,
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    console.log(error?.response?.data);

    Toast.show({
      text1: "Failed",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
