import Toast from "react-native-toast-message";
import { API } from "../../../Constants/url";

export const fetchFavoritePlaces = async (token, setFavoritePlace) => {
  try {
    const response = await API.get("/user/favorites-places", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setFavoritePlace(response.data);
  } catch (error) {
    Toast.show({
      text1: "Failed to fetch favorite places",
      type: "error",
      position: "bottom",
    });
  }
};
