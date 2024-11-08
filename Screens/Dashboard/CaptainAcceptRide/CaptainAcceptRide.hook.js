import { useRoute } from "@react-navigation/native";

export const useCaptainAcceptRideHook = () => {
  const route = useRoute();
  const { orderDetails } = route.params;
  return {
    orderDetails,
  };
};
