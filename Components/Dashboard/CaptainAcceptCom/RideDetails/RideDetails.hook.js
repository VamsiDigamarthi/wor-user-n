import { useRoute } from "@react-navigation/native";

export const useRideDetailsHook = () => {
  const route = useRoute();
  const { orderDetails } = route.params;
  return {
    orderDetails,
  };
};
