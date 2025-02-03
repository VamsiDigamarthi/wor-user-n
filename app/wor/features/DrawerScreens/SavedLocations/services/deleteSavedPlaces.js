import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const onDeleteSavedPlaces = async ({ token, id }) => {
  try {
    const response = await API.delete(`/auth/home-place/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    Toast.show({
      text1: response?.data?.message,
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    console.log(error);

    Toast.show({
      text1: "Failed to delete saved places",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
