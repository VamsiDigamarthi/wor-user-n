import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNameAndVicinity } from "../../../../../Constants/displaylocationmap";
import {
  setIsBeforeBook,
  setIsParcScreen,
} from "../../ridebooking/sharedLogics/rideDetailsSlice";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useParcelHomeScreenHook = () => {
  const insets = useSafeAreaInsets();

  const hasSoftwareNavigationBar = insets.bottom > 0;

  const { location, placeName, placeVicinity } = useSelector(
    (state) => state.location
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dropDetails } = useSelector((state) => state.allRideDetails);
  const [isProtectedParcel, setIsProtectedParcel] = useState(false);

  const handleProtectedParcel = () => {
    setIsProtectedParcel(!isProtectedParcel);
  };

  const onNavigateParcelPickUpLocationScreen = () => {
    console.log("asdhashdkhskdh");

    dispatch(setIsBeforeBook(true));
    dispatch(setIsParcScreen(true));
    navigation.navigate("ShowPrice");
  };

  return {
    dropDetails,
    handleProtectedParcel,
    isProtectedParcel,
    onNavigateParcelPickUpLocationScreen,
    hasSoftwareNavigationBar,
  };
};
