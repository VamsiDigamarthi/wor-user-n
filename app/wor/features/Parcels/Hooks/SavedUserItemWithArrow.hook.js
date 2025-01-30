import { useEffect, useState } from "react";
import { fetchSavedAddress } from "../services/parSavedAddressServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { mergeDropDetails } from "../../ridebooking/sharedLogics/rideDetailsSlice";
import { fetchSavedPlace } from "../redux/parcelSavedPlace.slice";

export const useSavedUserItemWithArrowHook = () => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { savedPlaces } = useSelector((state) => state.parcelSavedPlace);

  const [showHideSavedAddress, setShowHideSavedAddress] = useState(true);

  const onShowHideSavedAddress = () => {
    setShowHideSavedAddress(!showHideSavedAddress);
  };

  useEffect(() => {
    dispatch(fetchSavedPlace({ token }));
  }, []);

  const onHandlerClickSaveAddress = (address) => {
    dispatch(mergeDropDetails(address));
    navigation.navigate("ParcelHome");
  };

  return {
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedPlaces,
    onHandlerClickSaveAddress,
  };
};
