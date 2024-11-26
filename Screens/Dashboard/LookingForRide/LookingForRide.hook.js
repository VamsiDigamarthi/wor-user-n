import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { API } from "../../../Constants/url";
import Toast from "react-native-toast-message";
import BackgroundService from "react-native-background-actions";

export const useLookingForRideHook = () => {
  const { token } = useSelector((state) => state.token);
  const route = useRoute();
  const navigation = useNavigation();

  const sleep = (time) =>
    new Promise((resolve) => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    let elapsedTime = 0;
    const maxTime = 63 * 1000; // 63 seconds

    while (BackgroundService.isRunning()) {
      // Call API with background flag
      callApiEvery5Seconds(true);

      // Sleep for the specified delay before checking again
      await sleep(delay);
      elapsedTime += delay;

      // After 63 seconds, call the final API if ride is not accepted
      if (elapsedTime >= maxTime && !isAccepted) {
        console.log("Time expired in background, calling final API...");
        callFinalApi(true); // Pass true for background
        BackgroundService.stop();
      }
    }
  };

  const options = {
    taskName: "Location",
    taskTitle: "Running Background Task",
    taskDesc: "Executing background task description",
    taskIcon: {
      name: "ic_launcher",
      type: "mipmap",
    },
    color: "#ff00ff",
    linkingURI: "yourSchemeHere://chat/jane",
    parameters: {
      delay: 1000, // Delay between each API call in background
    },
  };

  const {
    vehicleType,
    price,
    placeName,
    dropAddress,
    pickUpCoordinated,
    orderId,
  } = route.params;
  const [showCancelWithReOrderBtn, setShowCancelWithReOrderBtn] =
    useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start the background task when the hook is initialized and isAccepted is false
    if (!isAccepted) {
      BackgroundService.start(veryIntensiveTask, options);
    }

    startAnimation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      BackgroundService.stop(); // Stop the background task when the hook is cleaned up or ride is accepted
    };
  }, [isAccepted]); // Re-run when the isAccepted state changes

  const startAnimation = () => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 100,
      duration: 63 * 1000, // 63 seconds duration
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (!isAccepted && finished) {
        console.log("Ride not accepted, calling final API...");
        setShowCancelWithReOrderBtn(false);
        clearInterval(intervalRef.current);
        // Call final API in the foreground
        callFinalApi(false); // Foreground, pass false for `isBackground`
      }
    });

    intervalRef.current = setInterval(() => {
      if (!isAccepted) {
        // Call API every 5 seconds in the foreground
        callApiEvery5Seconds(false); // Foreground call with isBackground = false
      }
    }, 5000);
  };

  const callApiEvery5Seconds = async (isBackground = false) => {
    try {
      const response = await API.patch(
        `/user/order-status/${orderId}`,
        { isBackground },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            isBackground, // Pass the background flag to the API
          },
        }
      );

      if (response?.data?.status === "accept") {
        setIsAccepted(true);
        clearInterval(intervalRef.current);
        BackgroundService.stop(); // Stop background service when ride is accepted
        navigation.replace("captaineacceptride", {
          orderDetails: response.data,
        });
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "API call failed",
        type: "error",
        position: "bottom",
      });
    }
  };

  const callFinalApi = async (isBackground = false) => {
    if (isAccepted) return; // Ensure this function does not execute if the ride is accepted

    try {
      await API.patch(
        `/user/cancel-order/${orderId}`,
        { isBackground }, // Pass the background flag in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowCancelWithReOrderBtn(false);
      Toast.show({
        text1: "No one accepted the order. Please reorder.",
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      console.log(error.response?.data);
      Toast.show({
        text1: "Automatic cancellation failed",
        type: "error",
        position: "bottom",
      });
    }
  };

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
    progressWidth: progress.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    showCancelWithReOrderBtn,
    onRePlaceOrder,
    onNewCancelHandle,
  };
};
