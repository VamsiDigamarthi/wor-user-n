import Toast from "react-native-toast-message";
import { API } from "../../../../../../Constants/url";

export const onAddedHomePlace = async ({
  token,
  name,
  vicinity,
  location,
  type,
}) => {
  try {
    await API.post(
      "/auth/home-place",
      {
        name,
        vicinity,
        location,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Toast.show({
      text1: "Home location added successfully",
      type: "success",
      position: "bottom",
    });
  } catch (error) {
    console.log(error);
    Toast.show({
      text1: "Failed to add home location",
      type: "error",
      position: "bottom",
    });
  }
};
