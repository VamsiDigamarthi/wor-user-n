import { useSelector } from "react-redux";
import { getCoordinatesFromPlaceId } from "../../../../../Constants/displaylocationmap";
import { API } from "../../../../../Constants/url";
import Toast from "react-native-toast-message";

export const useDropLocationItemHook = () => {
  const { token } = useSelector((state) => state.token);

  const onAdddFavoriteApi = async (place) => {
    try {
      const response = await API.post("/user/favorites-places", place, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // console.log(response.data);
      Toast.show({
        text1: response?.data?.message,
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        text1: "Added favorite failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const onAddPlaceToFavoriteHandler = async (place) => {
    if (place.placeId) {
      let location = await getCoordinatesFromPlaceId(place?.placeId);
      let newDropLocation = {
        ...place,
        location,
      };
      onAdddFavoriteApi(newDropLocation);
    } else {
      onAdddFavoriteApi(place);
    }
  };
  return {
    onAddPlaceToFavoriteHandler,
  };
};
