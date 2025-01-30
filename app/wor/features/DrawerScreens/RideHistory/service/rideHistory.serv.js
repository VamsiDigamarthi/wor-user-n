import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const rideDeleteRequest = async ({ token, orderId }) => {
  try {
    await API.patch(
      `/user/ride-delete-request/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    Toast.show({
      text1: "Ride Deleted Successfully",
      type: "success",
      position: "bottom",
    });

    return true;
  } catch (error) {
    console.log(error?.response?.data);

    Toast.show({
      text1: "Failed to delete ride",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
