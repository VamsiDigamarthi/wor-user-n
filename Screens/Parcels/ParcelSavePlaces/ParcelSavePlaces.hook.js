import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { API } from "../../../Constants/url";
import { useSelector } from "react-redux";

export const useParcelSavePlacesHook = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { token } = useSelector((state) => state.token);

  const [showHideSavedAddress, setShowHideSavedAddress] = useState(true);
  const [savedAddressFromApi, setSavedAddressFromApi] = useState([]);

  const onShowHideSavedAddress = () => {
    setShowHideSavedAddress(!showHideSavedAddress);
  };

  const { pickUpLocationCoorWithName, typeOfLocation } = route.params || {};

  const onFetchSavedAddress = async () => {
    try {
      const res = await API.get("/saved-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedAddressFromApi(res.data);
    } catch (error) {
      Toast.show({
        text1:
          error?.response?.data?.message ?? "Failed to fetch saved address",
        type: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    onFetchSavedAddress();
  }, []);

  const onHandlerClickSaveAddress = (address) => {
    console.log(address);
    if (typeOfLocation === "Pick Up") {
      navigation.navigate("ParcelHome", {
        pickUpLocationCoorWithName: {
          ...pickUpLocationCoorWithName,
          personName: address.name,
          mobile: address.mobile,
          landMark: address.landMark,
          address: address.address,
        },
      });
    } else {
      navigation.navigate("ParcelHome", {
        dropLocationCoorWithName: {
          ...pickUpLocationCoorWithName,
          personName: address.name,
          mobile: address.mobile,
          landMark: address.landMark,
          address: address.address,
        },
      });
    }
  };

  return {
    navigation,
    pickUpLocationCoorWithName,
    typeOfLocation,
    // show or hide saved address
    showHideSavedAddress,
    onShowHideSavedAddress,
    savedAddressFromApi,
    onHandlerClickSaveAddress,
  };
};
