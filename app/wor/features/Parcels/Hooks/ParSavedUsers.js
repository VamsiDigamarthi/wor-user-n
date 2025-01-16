import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../../../Constants/url";
import { fetchSavedAddress } from "../services/parSavedAddressServices";
import { useNavigation, useRoute } from "@react-navigation/native";

export const useParSavedUsersHook = () => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const { place } = useRoute().params;

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
    navigation.navigate("ParcelHome", {
      parcelDetails: {
        ...place,
        ...address,
      },
    });
  };

  return {
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedAddressFromApi,
    place,
    onHandlerClickSaveAddress,
  };
};
