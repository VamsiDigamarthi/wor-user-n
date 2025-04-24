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
    console.log("type", type);

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
      text1: `${type} location added successfully`,
      type: "success",
      position: "bottom",
    });
    return { status: true, isEdit: false };
  } catch (error) {
    console.log(error);
    Toast.show({
      text1: "Failed to add home location",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const onEditHomePlace = async ({
  token,
  name,
  vicinity,
  location,
  type,
  editPlaceId,
}) => {
  try {
    await API.patch(
      `/auth/home-place/${editPlaceId}`,
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
      text1: "Home location Edited successfully",
      type: "success",
      position: "bottom",
    });
    return { status: true, isEdit: true };
  } catch (error) {
    console.log(error?.response?.data);
    Toast.show({
      text1: "Failed to Edit home location",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
