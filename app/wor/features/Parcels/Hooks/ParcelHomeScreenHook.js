import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchNameAndVicinity } from "../../../../../Constants/displaylocationmap";

export const useParcelHomeScreenHook = () => {
  const { location, placeName, placeVicinity } = useSelector(
    (state) => state.location
  );
  const navigation = useNavigation();

  const [selectedCard, setSelectedCard] = useState("send");
  const [selecteParcelType, setSelectParcelType] = useState(null);
  const { parcelDetails } = useRoute().params || {};
  const [isProtectedParcel, setIsProtectedParcel] = useState(false);

  const handleProtectedParcel = () => {
    setIsProtectedParcel(!isProtectedParcel);
  };

  const onNavigateParcelPickUpLocationScreen = () => {
    // navigation.navigate("ChangeLoc100mViaMap", {
    //   place: {
    //     location,
    //     name: placeName,
    //     vicinity: placeVicinity,
    //   },
    //   isPickLocationFromParc: true,
    //   parcelDetails: {
    //     ...parcelDetails,
    //     selecteParcelType,
    //     isProtectedParcel,
    //   },
    //   selectedCard,
    // });
    console.log(parcelDetails);
    navigation.navigate("ShowPrice", {
      placeName: placeName,
      placeVicinity: placeVicinity,
      pickUpCoordinated: location,
      isPickLocationFromParc: true,
      parcelDetails: parcelDetails,
      selectedCard: selectedCard,
      dropDetails: null,
    });
  };

  return {
    selectedCard,
    setSelectedCard,
    setSelectParcelType,
    parcelDetails,
    handleProtectedParcel,
    isProtectedParcel,
    onNavigateParcelPickUpLocationScreen,
  };
};
