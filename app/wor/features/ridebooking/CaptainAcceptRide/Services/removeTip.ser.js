import { API } from "../../../../../../Constants/url";
import { showMessage } from "react-native-flash-message";

export const removeTip = async ({ token, orderId }) => {
  try {
    const response = await API.patch(
      `/user/remove-tip/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("resssssssssssssssssssssss"?.response?.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    showMessage({
      message: error?.response?.data?.message || "Failed to delete tip",
      type: "danger",
      icon: "auto",
    });
    return false;
  }
};
