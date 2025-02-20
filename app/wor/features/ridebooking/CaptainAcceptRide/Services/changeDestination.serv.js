import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const changeDestinaton = async ({ token, orderId, place }) => {
  try {
    const response = await API.patch(
      "/user/change-destination",
      { place, orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Toast.show({
      text1: "Please Wait untill your riding partner accept the your request",
      type: "success",
      position: "bottom",
    });
    return response?.data?.order;
  } catch (error) {
    console.log("change destination failed");
    Toast.show({
      text1: "Failed to add Tip",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
