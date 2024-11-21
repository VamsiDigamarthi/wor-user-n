import { useRoute } from "@react-navigation/native";

export const useParcelMapWithBottomSheetHook = () => {
  const route = useRoute();
  const { pickUpLocationCoorWithName,typeOfLocation } = route.params || {};

  return {
    pickUpLocationCoorWithName,
    typeOfLocation
  };
};
