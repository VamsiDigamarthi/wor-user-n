import { useEffect, useState } from "react";
import { API } from "../../../Constants/url";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";

export const useFavoritePlaceHook = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    pickUpCoordinated,
    placeName,
    isParcelScreen = false,
    typeOfLocation,
  } = route.params;
  const { token } = useSelector((state) => state.token);
  const [favoritePlace, setFavoritePlace] = useState(null);

  const onFetchAllFavorites = async () => {
    try {
      const response = await API.get("/user/favorites-places", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavoritePlace(response.data);
    } catch (error) {
      console.error("Error fetching favorites places", error.response.data);
      Toast.show({
        text1: error?.response?.data?.message,
        type: "error",
        position: "bottom",
      });
    }
  };

  const onNavigateToDirectPriceScreen = (place) => {
    if (isParcelScreen) {
      const newPlace = {
        id: place._id,
        name: place.name,
        vicinity: place.vicinity,
        location: {
          lat: place.location.coordinates[1],
          lng: place.location.coordinates[0],
        },
      };

      navigation.navigate("ParcelMapWithBottomSheet", {
        pickUpLocationCoorWithName: newPlace,
        typeOfLocation,
      });
    } else {
      const { name, vicinity, location } = place;
      const transformedData = {
        name: name,
        vicinity: vicinity,
        location: {
          lat: location.coordinates[1],
          lng: location.coordinates[0],
        },
      };
      navigation.navigate("ShowPrice", {
        placeName,
        pickUpCoordinated,
        dropDetails: transformedData,
      });
    }
  };

  useEffect(() => {
    onFetchAllFavorites();
  }, []);

  return {
    favoritePlace,
    onNavigateToDirectPriceScreen,
  };
};
