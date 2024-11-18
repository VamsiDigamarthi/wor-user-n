import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { API } from "../../../Constants/url";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { getTravelDetails } from "../../../Constants/displaylocationmap";

export const useCaptainAcceptRideHook = () => {
  const route = useRoute();
  const { orderDetails } = route.params;
  const { token } = useSelector((state) => state.token);
  const [travellingTimeAndDistnace, setTravellingTimeAndDistnace] =
    useState(null);

  // State to track if OTP has been verified
  const [otpVerified, setOtpVerified] = useState(false);

  const fetchApiData = async () => {
    try {
      const response = await API.get(
        `/user/order-otp-verified/${orderDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "OTP verified successfully") {
        setOtpVerified(true);
        Toast.show({
          text1: "OTP verified successfully",
          type: "success",
          position: "bottom",
        });
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching API data:", error);
      Toast.show({
        text1: "OTP Verification failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchApiData();

    const intervalId = setInterval(() => {
      if (!otpVerified) {
        fetchApiData();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [otpVerified]);

  useEffect(() => {
    const calculateDistanceAndRideTime = async () => {
      const data = await getTravelDetails(
        orderDetails?.pickup?.coordinates,
        orderDetails?.drop?.coordinates,
        orderDetails?.vehicleType
      );
      console.log(data);
      setTravellingTimeAndDistnace(data);
    };
    orderDetails && calculateDistanceAndRideTime();
  }, [orderDetails]);

  return {
    orderDetails,
    otpVerified,
    travellingTimeAndDistnace,
  };
};
