import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const onChangePaymentMethod = async ({
  token,
  orderId,
  paymentMethod,
}) => {
  try {
    const response = await API.patch(
      `/user/change-payment-method/${orderId}`,
      { paymentMethod },
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
    return { status: true, order: response?.data?.order };
  } catch (error) {
    Toast.show({
      text1: "Change Payment Method Failed..!",
      type: "error",
      position: "bottom",
    });
    return { status: false };
  }
};
