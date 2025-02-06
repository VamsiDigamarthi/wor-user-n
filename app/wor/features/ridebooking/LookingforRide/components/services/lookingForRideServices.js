import Toast from "react-native-toast-message";
import { API } from "../../../../../../../Constants/url";

export const cancelRide = async ({ token, orderId, reason = "" }) => {
  try {
    const response = await API.patch(
      `user/cancel-order/${orderId}`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
    console.log(error);
    Toast.show({
      text1: "Cancel Order failed",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const rePlaceOrder = async ({ token, orderId }) => {
  const indiaDateTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const datePart = indiaDateTime.split(",")[0];
  const [day, month, year] = datePart.split("/");
  const formattedDate = `${day}-${month}-${year}`;
  const timePart = indiaDateTime.split(",")[1].trim();

  const orderDetails = {
    orderPlaceDate: formattedDate,
    orderPlaceTime: timePart,
    time: null,
    futureTime: null,
  };

  try {
    await API.patch(`/user/re-place-order/${orderId}`, orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    Toast.show({
      text1: "Re-Place Order success",
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    console.log(error?.response?.data);
    Toast.show({
      text1: "Re-Place Order failed",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
