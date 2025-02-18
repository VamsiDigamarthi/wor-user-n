import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../../../SocketContext";
import { getTravelDetails } from "../../../../../../Constants/displaylocationmap";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { setCompleteRideDetails } from "../../sharedLogics/rideDetailsSlice";

export const useCaptainAcceptRideScreenHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { socket, isConnected } = useSocket();
  const { completeRideDetails } = useSelector((state) => state.allRideDetails);

  const [otpVerified, setOtpVerified] = useState(
    completeRideDetails?.orderOtpVerified ?? false
  );

  const [isArrived, setIsArrived] = useState(
    completeRideDetails?.isArrived ?? false
  );

  const [disFromCaptainLocToPick, setDisFromCaptainLocPick] = useState(null);
  const [disFromPickToDrop, setDisFromPickToDrop] = useState(null);
  const [liveCoordinates, setLiveCoordinates] = useState({
    lat: null,
    lng: null,
  });

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
    console.log("coordinates", coordinates);
    setLiveCoordinates(coordinates);
  };

  const handleCompleteRide = () => {
    console.log("--------- ride completed -------------");

    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Ensures the specified route is the only route in the stack
        routes: [{ name: "AuthenticatedStack" }], // Replace 'Home' with your target screen name
      })
    );
  };

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("order-otp-verified", onVerifiedOtp);
      socket.on("order-arrived", onOrderArrived);
      socket.on("order-completed", handleCompleteRide);
      socket.on("new-receive-coordinates", handleLiveCoordinates);
    }
    return () => {
      socket.off("order-otp-verified", onVerifiedOtp);
      socket.off("order-arrived", onOrderArrived);
      socket.off("order-completed", handleCompleteRide);
      socket.off("new-receive-coordinates", handleLiveCoordinates);
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
          completeRideDetails.drop.coordinates,
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
    liveCoordinates,
    kownBotSheetChangeUpOrDown,
  };
};
