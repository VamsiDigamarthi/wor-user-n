import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../../../SocketContext";
import { getTravelDetails } from "../../../../../../Constants/displaylocationmap";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { setCompleteRideDetails } from "../../sharedLogics/rideDetailsSlice";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { AppState, BackHandler, Platform } from "react-native";

export const useCaptainAcceptRideScreenHook = () => {
  const handleBackButtonPress = () => {
    // Move the app to the background (minimize it)
    AppState.currentState === "active" && BackHandler.exitApp();
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    // Add event listener for hardware back button
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);

    // Cleanup the event listener on component unmount
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );
  }, []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const markerRef = useRef(null);

  const [otpVerified, setOtpVerified] = useState(
    completeRideDetails?.orderOtpVerified ?? false
  );

  const [isArrived, setIsArrived] = useState(
    completeRideDetails?.isArrived ?? false
  );

  const [disFromCaptainLocToPick, setDisFromCaptainLocPick] = useState(null);
  const [disFromPickToDrop, setDisFromPickToDrop] = useState(null);

  // const [liveCoordinates, setLiveCoordinates] = useState({
  //   lat: 0,
  //   lng: 0,
  //   heading: 0,
  // });

  const [newLiveCoordinates, setNewLiveCoordinates] = useState({
    latitude: completeRideDetails?.captainCoor?.[1] ?? 0,
    longitude: completeRideDetails?.captainCoor?.[0] ?? 0,
    heading: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [cancelOrderByUseSt, setCancelOrderByUseSt] = useState(false);

  const onVerifiedOtp = ({ status, order }) => {
    console.log("--------------verified ----------------", status);
    setOtpVerified(status ?? false);
    if (status) {
      dispatch(setCompleteRideDetails(order));
    }
  };
  const onOrderArrived = (value) => {
    console.log("-------- arrived ------------");
    setIsArrived(value);
  };

  const handleLiveCoordinates = (coordinates) => {
    // if (!otpVerified) {
    animateTheMarker(coordinates?.lat, coordinates?.lng);
    // setLiveCoordinates(coordinates, "----------from captain --------------");
    setNewLiveCoordinates({
      ...newLiveCoordinates,
      latitude: coordinates?.lat,
      longitude: coordinates?.lng,
      heading: coordinates?.heading,
    });
    // }
  };

  const handleCompleteRide = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Ensures the specified route is the only route in the stack
        routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
      })
    );
  };

  const handleChangeDestCaptainResponse = (newOrderDetails) => {
    if (newOrderDetails?.newDesitionOrderStatus === "accept") {
      dispatch(setCompleteRideDetails(newOrderDetails));

      Toast.show({
        text1: "Captain  accept your request",
        type: "success",
        position: "bottom",
      });
    } else {
      Toast.show({
        text1: "Captain not accept your request",
        type: "success",
        position: "bottom",
      });
    }
  };

  const cancelOrderByUser = (status) => {
    console.log("--- order cancel socket---");
    setCancelOrderByUseSt(status ?? false);
  };

  // console.log(newLiveCoordinates, "-------------------");

  const animateTheMarker = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };

    if (markerRef.current) {
      if (Platform.OS === "android") {
        // Android-specific smooth animation
        console.log("marker animated", newCoordinate);

        markerRef.current.animateMarkerToCoordinate(newCoordinate, 4500);
      }
    }
  };

  const getLiveLocation = async () => {
    if (otpVerified) {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      animateTheMarker(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );

      setNewLiveCoordinates({
        ...newLiveCoordinates,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        heading: currentLocation.coords.heading,
      });
    }
  };

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     if (otpVerified) {
  //       getLiveLocation();
  //     }
  //   }, 3000);

  //   return () => clearInterval(id);
  // });

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("order-otp-verified", onVerifiedOtp);
      socket.on("order-arrived", onOrderArrived);
      socket.on("order-completed", handleCompleteRide);

      // if (!otpVerified)
      socket.on("new-receive-coordinates", handleLiveCoordinates);

      socket.on("change-destination-status", handleChangeDestCaptainResponse);
      socket.on("accept-order-cancelled", cancelOrderByUser);
    }
    return () => {
      socket.off("order-otp-verified", onVerifiedOtp);
      socket.off("order-arrived", onOrderArrived);
      socket.off("order-completed", handleCompleteRide);
      socket.off("new-receive-coordinates", handleLiveCoordinates);
      socket.off("change-destination-status", handleChangeDestCaptainResponse);
      socket.on("accept-order-cancelled", cancelOrderByUser);
    };
  }, [socket, isConnected]);

  useEffect(() => {
    if (completeRideDetails) {
      calculatePickUpDistance();
      calDisFromPickToDrop();
    }
  }, [completeRideDetails]);

  const calculatePickUpDistance = async () => {
    try {
      if (
        completeRideDetails?.captainCoor &&
        completeRideDetails?.pickup?.coordinates &&
        completeRideDetails?.vehicleType
      ) {
        const data = await getTravelDetails(
          completeRideDetails.captainCoor,
          completeRideDetails.pickup.coordinates,
          completeRideDetails.vehicleType
        );
        setDisFromCaptainLocPick(data);
      } else {
        console.warn("Incomplete captain or pickup details");
      }
    } catch (error) {
      console.error("Error calculating pickup distance:", error);
    }
  };

  const calDisFromPickToDrop = async () => {
    try {
      if (
        completeRideDetails?.pickup?.coordinates &&
        completeRideDetails?.drop?.coordinates &&
        completeRideDetails?.vehicleType
      ) {
        const data = await getTravelDetails(
          completeRideDetails.pickup.coordinates,
          completeRideDetails?.newDesitionOrderStatus === "accept"
            ? completeRideDetails?.newDropLocation?.coordinates
            : completeRideDetails.drop.coordinates,
          completeRideDetails.vehicleType
        );
        setDisFromPickToDrop(data);
      } else {
        console.warn("Incomplete pickup or drop details");
      }
    } catch (error) {
      console.error("Error calculating distance from pickup to drop:", error);
    }
  };

  const kownBotSheetChangeUpOrDown = (changedValue) => {
    console.log(changedValue);
  };

  return {
    otpVerified,
    isArrived,
    completeRideDetails,
    disFromCaptainLocToPick,
    disFromPickToDrop,
    // liveCoordinates,
    kownBotSheetChangeUpOrDown,
    cancelOrderByUseSt,
    setCancelOrderByUseSt,

    newLiveCoordinates,
    markerRef,
  };
};
