import { useRoute } from "@react-navigation/native";

export const useSendAndReceiveParcelHook = () => {
  const route = useRoute();
  const { selectedCard, pickUpLocationCoorWithName } = route.params || {}; // Safely access params

  return {
    selectedCard,
    pickUpLocationCoorWithName,
  };
};
