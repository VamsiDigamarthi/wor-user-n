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
  const [isAccepted, setIsAccepted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);
  const [calncelModalInfoOpenClose, setCancelModalInfoOpenClose] =
    useState(false);

  const onOpenCancelOrderInfoHandle = () => {
    setCancelModalInfoOpenClose(!calncelModalInfoOpenClose);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      progress.stopAnimation();
    };
  }, [isAccepted]);

  const startAnimation = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 100,
      // duration: 210000, // 3 minutes 30 seconds
      duration: 180000, // 60 seconds duration
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!isAccepted && finished) {
        console.log("Ride not accepted, calling final API...");
        setShowCancelWithReOrderBtn(false);
        clearInterval(intervalRef.current);
        // callFinalApi();
      }
    });

    intervalRef.current = setInterval(() => {
      if (!isAccepted) {
        callApiEvery5Seconds();
      }
    }, 30000);
  };

  const callApiEvery5Seconds = async () => {
    try {
      const response = await API.patch(
        `/user/order-status/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === "accept") {
        setIsAccepted(true);
        clearInterval(intervalRef.current);
        navigation.navigate("captaineacceptride", {
          orderDetails: response.data,
        });
      } else if (response?.data?.status === "cancelled") {
        setShowCancelWithReOrderBtn(false);
        Toast.show({
          text1: "No one accepted the order. Please reorder.",
          type: "success",
          position: "bottom",
        });
      } else {
        console.log("iuyt", response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      Toast.show({
        text1: error?.response?.data?.message,
        type: "error",
        position: "bottom",
      });
    }
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const onCancelRide = async () => {
    onOpenCancelOrderInfoHandle();
  };

  const onConfirmCancelRide = async () => {
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
      console.log("Manually canceled order");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Cancel Order failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const onRePlaceOrder = async () => {
    const indiaDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const datePart = indiaDateTime.split(",")[0];
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${day}-${month}-${year}`;
    const timePart = indiaDateTime.split(",")[1].trim();

    const orderDetails = {
      orderPlaceDate: formattedDate,
      orderPlaceTime: timePart,
    };

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
      startAnimation();
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Re-Place Order failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const onNewCancelHandle = () => {
    navigation.goBack();
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
    calncelModalInfoOpenClose,
    onOpenCancelOrderInfoHandle,
    onConfirmCancelRide,
    onNewCancelHandle,
  };
};
