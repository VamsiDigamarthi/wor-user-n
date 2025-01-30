import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelRide,
  rePlaceOrder,
} from "./components/services/lookingForRideServices";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useSocket } from "../../../../../SocketContext";
import { setCompleteRideDetails } from "../sharedLogics/rideDetailsSlice";

export const useLookingForRideScreenHook = () => {
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const { token } = useSelector((state) => state.token);
  const {
    orderId,
    orderPlaceTime,
    isDirectNavigation = false,
    futureTime = false,
  } = useRoute().params;
  const progress = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [showCancelWithReOrderBtn, setShowCancelWithReOrderBtn] =
    useState(true);

  console.log("orderId", orderId, "orderPlaceTime", orderPlaceTime);

  const startAnimation = () => {
    progress.setValue(0);

    // If orderPlaceTime exists, calculate the elapsed time
    if (orderPlaceTime) {
      // Normalize the time to uppercase AM/PM
      const normalizedOrderTime = orderPlaceTime.toUpperCase(); // Converts 'am' to 'AM' and 'pm' to 'PM'
      console.log("normalizedOrderTime", normalizedOrderTime);

      // Create the full datetime string with the current date
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      console.log("currentDate", currentDate);

      // Separate hours, minutes, and AM/PM
      const [time, ampm] = normalizedOrderTime.split(" "); // "3:29" and "PM"
      const [hours, minutes] = time.split(":"); // "3" and "29" - no seconds part

      // Adjust hours for 12-hour clock
      let adjustedHours = parseInt(hours, 10);
      if (ampm === "PM" && adjustedHours !== 12) {
        adjustedHours += 12; // Convert PM hours to 24-hour format
      } else if (ampm === "AM" && adjustedHours === 12) {
        adjustedHours = 0; // Midnight case (12 AM is 00:00)
      }

      // Since the orderPlaceTime only has hours and minutes, set seconds to '00'
      const seconds = "00";

      // Construct the full date-time string in ISO format
      const fullDateString = `${currentDate}T${String(adjustedHours).padStart(
        2,
        "0"
      )}:${minutes}:${seconds}.000+05:30`;
      console.log("fullDateString", fullDateString);

      // Parse the full date string into a valid Date object
      const orderTime = new Date(fullDateString);
      console.log("orderTime", orderTime); // Log to check if it's correctly parsed

      const currentTime = new Date(); // Get current time
      const elapsedTime = currentTime - orderTime; // Time difference in milliseconds
      console.log("elapsedTime:", elapsedTime); // Log to check elapsed time

      // Calculate remaining time (total 3 minutes - elapsed time)
      const remainingTime = Math.max(0, 180000 - elapsedTime);
      console.log("remainingTime:", remainingTime); // Log to check remaining time

      // Update progress bar
      progress.setValue((elapsedTime / 180000) * 100); // Update progress bar based on elapsed time

      // Run the animation from the remaining time
      Animated.timing(progress, {
        toValue: 100,
        duration: remainingTime,
        useNativeDriver: false,
      }).start(({ finished }) => {
        console.log("finished");
      });
    } else {
      // If no orderPlaceTime, start the animation from 0
      Animated.timing(progress, {
        toValue: 100,
        duration: 180000, // 3 minutes duration
        useNativeDriver: false,
      }).start(({ finished }) => {
        console.log("finished");
      });
    }
  };

  useEffect(() => {
    startAnimation();
    return () => {
      progress.stopAnimation();
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const handleCancelRide = async () => {
    const rideCancel = await cancelRide({ token, orderId });
    if (rideCancel) navigation?.goBack();
  };

  const handleRplaceRide = async () => {
    const replaceOrder = await rePlaceOrder({ token, orderId });
    if (replaceOrder) {
      setShowCancelWithReOrderBtn(true);
      progress.setValue(0);
      startAnimation();
    }
  };

  const onNewCancelHandle = () => {
    if (isDirectNavigation) {
      navigation.reset([
        {
          index: 0,
          routes: [{ name: "AuthenticatedStack" }],
        },
      ]);
    } else {
      navigation.goBack();
    }
  };

  const orderCancelledListener = (orderId) => {
    console.log("-------------- cancel ---------------------");

    console.log("order-cancelled", orderId);
    setShowCancelWithReOrderBtn(false);
  };

  const orderAcceptListener = (order) => {
    console.log("----------------accepted----------------------");

    dispatch(setCompleteRideDetails(order));
    progress.stopAnimation();
    navigation.navigate("captaineacceptride");
  };

  useEffect(() => {
    if (isConnected && socket) {
      socket.on("order-cancelled", orderCancelledListener);
      socket.on("order-accept", orderAcceptListener);
    }
    return () => {
      socket.off("order-cancelled", orderCancelledListener);
      socket.off("order-accept", orderAcceptListener);
    };
  }, [socket, isConnected]);

  return {
    progressWidth,
    handleCancelRide,
    handleRplaceRide,
    showCancelWithReOrderBtn,
    onNewCancelHandle,
    futureTime,
  };
};
