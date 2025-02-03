import { showMessage } from "react-native-flash-message";
import { API } from "../../../../../../Constants/url";

export const emergencyContact = async ({ token }) => {
  try {
    const response = await API.get("/captain/emergency-contact", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    showMessage({
      message:
        error?.response?.data?.message || "Failed to fetch contact numbers",
      type: "danger",
      icon: "auto",
    });
    return false;
  }
};
