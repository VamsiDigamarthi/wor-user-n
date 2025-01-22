import { useDispatch, useSelector } from "react-redux";
import { getCoordinatesFromPlaceId } from "../../../Constants/displaylocationmap";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { API } from "../../../Constants/url";
import { onFavoritePlace } from "../features/ridebooking/selectdroplocation/redux/favoritePlaces.slice";

export const useLocationItemHook = () => {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

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
      dispatch(onFavoritePlace({ token }));
    } catch (error) {
      Toast.show({
        text1: "Added favorite failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const addedFavoritePlace = async (place) => {
    let newDropLocation = null;
    if (place?.placeId) {
      let location = await getCoordinatesFromPlaceId(place?.placeId);
      newDropLocation = {
        ...place,
        location,
      };
      onAdddFavoriteApi(newDropLocation);
    } else {
      onAdddFavoriteApi(place);
    }
  };

  useEffect(() => {
    // onFetchFavoritePlaces();
    token && dispatch(onFavoritePlace({ token }));
  }, [token]);

  return { addedFavoritePlace };
};
