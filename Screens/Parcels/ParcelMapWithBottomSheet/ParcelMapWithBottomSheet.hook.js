import { useRoute } from "@react-navigation/native";

export const useParcelMapWithBottomSheetHook = () => {
  const route = useRoute();
  const { pickUpLocationCoorWithName } = route.params || {};

  return {
    pickUpLocationCoorWithName,
  };
};
