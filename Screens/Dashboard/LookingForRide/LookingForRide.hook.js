import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { API } from "../../../Constants/url";
import Toast from "react-native-toast-message";

export const useLookingForRideHook = () => {
  const { token } = useSelector((state) => state.token);

  const route = useRoute();
  const {
    vehicleType,
    price,
    placeName,
    dropAddress,
    pickUpCoordinated,
    orderId,
  } = route.params;
  const navigation = useNavigation();
  const [showCancelWithReOrderBtn, setShowCancelWithReOrderBtn] =
    useState(true);

  //   progress logic
  const [isAccepted, setIsAccepted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const intervalRef = useRef(null);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 60000,
      //   duration: 100000, // 100 seconds
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!isAccepted && finished) {
        console.log("Ride not accepted, calling final API...");
        setShowCancelWithReOrderBtn(false);
        clearInterval(intervalRef.current);
        callFinalApi();
      }
    });

    // Start an interval to call the API every 5 seconds
    intervalRef.current = setInterval(() => {
      if (!isAccepted) {
        callApiEvery5Seconds();
      }
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [isAccepted, progress]);

  const callApiEvery5Seconds = async () => {
    try {
      const response = await API.get(`/user/order-status/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response?.data);
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "API call failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const callFinalApi = async () => {
    try {
      console.log(orderId);
      await API.patch(
        `/user/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowCancelWithReOrderBtn(false);
      Toast.show({
        text1: "No one accept user order please replace the order",
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      console.log(error.response.data);
      Toast.show({
        text1: "Automatic cancellation api faild",
        type: "error",
        position: "bottom",
      });
    }
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  //   this cancel api only user manually cancel there order
  //   added reason also
  const onCancelRide = async () => {
    try {
      const response = await API.patch(
        `user/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Toast.show({
        text1: response?.data?.message,
        type: "success",
        position: "bottom",
      });

      navigation.navigate("AuthenticatedStack");
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Cancel Order failed",
        type: "error",
        position: "bottom",
      });
    }
    // navigation.navigate("captaineacceptride");
  };

  const onRePlaceOrder = async () => {
    const indiaDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const datePart = indiaDateTime.split(",")[0];
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${day}-${month}-${year}`;
    const timePart = indiaDateTime.split(",")[1].trim();

    const formattedTime = timePart;

    const orderDetails = {
      orderPlaceDate: formattedDate,
      orderPlaceTime: formattedTime,
    };

    console.log(orderDetails);

    try {
      await API.patch(`/user/re-place-order/${orderId}`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setShowCancelWithReOrderBtn(true);
      Toast.show({
        text1: "Re-Place Order success",
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Re-Place  Order failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  return {
    onCancelRide,
    dropAddress,
    vehicleType,
    price,
    placeName,
    pickUpCoordinated,
    progressWidth,
    showCancelWithReOrderBtn,
    onRePlaceOrder,
  };
};
