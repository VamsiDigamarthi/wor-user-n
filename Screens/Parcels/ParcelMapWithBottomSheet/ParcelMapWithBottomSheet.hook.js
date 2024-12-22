import { useNavigation, useRoute } from "@react-navigation/native";

export const useParcelMapWithBottomSheetHook = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { pickUpLocationCoorWithName, typeOfLocation } = route.params || {};

  const onNavigateSavedAddressScreen = () => {
    navigation.navigate("ParcelSavePlaces", {
      pickUpLocationCoorWithName,
      typeOfLocation,
    });
  };

  return {
    pickUpLocationCoorWithName,
    typeOfLocation,
    onNavigateSavedAddressScreen,
    navigation,
  };
};
