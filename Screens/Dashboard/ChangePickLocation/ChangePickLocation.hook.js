import { useRoute } from "@react-navigation/native";

export const useChangePickLocationHook = () => {
  const { pickUpCoordinated } = useRoute().params;
  return { pickUpCoordinated };
};
