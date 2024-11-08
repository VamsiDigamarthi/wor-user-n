import { useSelector } from "react-redux";
import { getCoordinatesFromPlaceId } from "../../../../../Constants/displaylocationmap";
import { API } from "../../../../../Constants/url";

export const useDropLocationItemHook = () => {
  const { token } = useSelector((state) => state.token);

  const onAdddFavoriteApi = async (place) => {
    const response = await API.post("/user/favorites-places", place, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
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
