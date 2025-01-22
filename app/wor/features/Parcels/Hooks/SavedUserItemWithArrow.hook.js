import { useEffect, useState } from "react";
import { fetchSavedAddress } from "../services/parSavedAddressServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { mergeDropDetails } from "../../ridebooking/sharedLogics/rideDetailsSlice";

export const useSavedUserItemWithArrowHook = () => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showHideSavedAddress, setShowHideSavedAddress] = useState(true);
  const [savedAddressFromApi, setSavedAddressFromApi] = useState(null);

  const onShowHideSavedAddress = () => {
    setShowHideSavedAddress(!showHideSavedAddress);
  };

  const onFetchSavedAddress = async () => {
    const data = await fetchSavedAddress({ token });
    if (!data) return setSavedAddressFromApi(null);
    setSavedAddressFromApi(data);
  };

  useEffect(() => {
    onFetchSavedAddress();
  }, []);

  const onHandlerClickSaveAddress = (address) => {
    dispatch(mergeDropDetails(address));
    navigation.navigate("ParcelHome");
  };

  return {
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedAddressFromApi,
    onHandlerClickSaveAddress,
  };
};
