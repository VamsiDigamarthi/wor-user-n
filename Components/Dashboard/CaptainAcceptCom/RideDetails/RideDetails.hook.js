import { useRoute } from "@react-navigation/native";

export const useRideDetailsHook = () => {
  const route = useRoute();
  const { orderDetails, travellingTimeAndDistnace } = route.params;
  return {
    orderDetails,
    travellingTimeAndDistnace,
  };
};
