import Toast from "react-native-toast-message";
import { API } from "../../../../../Constants/url";

export const onSavedParcelAddress = async ({ token, formData }) => {
  try {
    await API.post(
      "/saved-address",
      {
        name: formData.senderName,
        mobile: formData.mobile,
        landMark: formData.landmark,
        address: formData.address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Toast.show({
      text1: "successfully added address",
      type: "success",
      position: "bottom",
    });
  } catch (error) {
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to add saved address",
      type: "error",
      position: "bottom",
    });
  }
};

// not using convert in to redux
export const fetchSavedAddress = async ({ token }) => {
  try {
    const response = await API.get("/saved-address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to fetch saved address",
      type: "error",
      position: "bottom",
    });
    return null;
  }
};

export const deleteSavedAddress = async ({ token, id }) => {
  try {
    await API.delete(`/saved-address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Toast.show({
      text1: "successfully added address",
      type: "success",
      position: "bottom",
    });
    return true;
  } catch (error) {
    console.log(error);

    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to fetch saved address",
      type: "error",
      position: "bottom",
    });
    return null;
  }
};
