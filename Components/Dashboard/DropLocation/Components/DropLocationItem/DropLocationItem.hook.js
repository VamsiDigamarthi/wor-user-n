import { useSelector } from "react-redux";
import { getCoordinatesFromPlaceId } from "../../../../../Constants/displaylocationmap";
import { API } from "../../../../../Constants/url";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";

export const useDropLocationItemHook = () => {
  const { token } = useSelector((state) => state.token);

  const [favoritePlacesApi, setFavoritePlacesApi] = useState([]);

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
      onFetchFavoritePlaces();
    } catch (error) {
      Toast.show({
        text1: "Added favorite failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const onAddPlaceToFavoriteHandler = async (place, type) => {
    if (type === "previous") {
      let newDropPlace = {
        name: place?.dropAddress,
        vicinity: place?.dropVicinity,
        location: {
          lat: place.drop?.coordinates?.[1],
          lng: place.drop?.coordinates?.[0],
        },
      };
      onAdddFavoriteApi(newDropPlace);
      return;
    }
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

  const onFetchFavoritePlaces = async () => {
    try {
      const response = await API.get("/user/favorites-places", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFavoritePlacesApi(response.data);
    } catch (error) {
      Toast.show({
        text1: "Failed to fetch favorite places",
        type: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    onFetchFavoritePlaces();
  }, []);
  // console.log(favoritePlacesApi);
  return {
    onAddPlaceToFavoriteHandler,
    favoritePlacesApi,
  };
};
