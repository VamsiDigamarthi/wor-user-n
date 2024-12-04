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
    orderPlaceTime, // orderPlaceTime in IST
    futureTime, // future order is IST
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

  console.log("orderPlaceTime", orderPlaceTime);

  useEffect(() => {
    if (futureTime) {
      const futureDate = new Date(futureTime);
      const currentDate = new Date();

      // If futureTime is in the future, stop here and avoid animation
      if (futureDate > currentDate) {
        startApiPolling();
        return;
      }
    }

    startAnimation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      progress.stopAnimation();
    };
  }, [isAccepted]);

  const startApiPolling = () => {
    intervalRef.current = setInterval(() => {
      const currentTime = new Date();
      const futureDate = new Date(futureTime);

      if (futureDate > currentTime) {
        callApiEvery5Seconds();
      } else {
        clearInterval(intervalRef.current);
        // startAnimation(); // Start animation once futureTime has passed
      }
    }, 30000); // Poll every 30 seconds
  };

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
      const [time, ampm] = normalizedOrderTime.split(" "); // "12:00:57" and "PM"
      const [hours, minutes, seconds] = time.split(":"); // "12", "00", "57"

      // Adjust hours for 12-hour clock
      let adjustedHours = parseInt(hours, 10);
      if (ampm === "PM" && adjustedHours !== 12) {
        adjustedHours += 12; // Convert PM hours to 24-hour format
      } else if (ampm === "AM" && adjustedHours === 12) {
        adjustedHours = 0; // Midnight case (12 AM is 00:00)
      }

      // Construct the full date-time string in ISO format
      const fullDateString = `${currentDate}T${String(adjustedHours).padStart(
        2,
        "0"
      )}:${minutes}:${seconds}.000+05:30`;
      console.log("fullDateString", fullDateString);
      // Parse the full date string into a valid Date object
      const orderTime = new Date(fullDateString); // Now this will create a valid Date object

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
        if (!isAccepted && finished) {
          console.log("Ride not accepted, calling final API...");
          setShowCancelWithReOrderBtn(false);
          clearInterval(intervalRef.current);
        }
      });
    } else {
      // If no orderPlaceTime, start the animation from 0
      Animated.timing(progress, {
        toValue: 100,
        duration: 180000, // 3 minutes duration
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (!isAccepted && finished) {
          console.log("Ride not accepted, calling final API...");
          setShowCancelWithReOrderBtn(false);
          clearInterval(intervalRef.current);
        }
      });
    }

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
      time: null,
      futureTime: null,
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
    futureTime,
  };
};
