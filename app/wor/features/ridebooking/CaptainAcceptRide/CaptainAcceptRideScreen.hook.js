import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../../../../SocketContext";
import { getTravelDetails } from "../../../../../Constants/displaylocationmap";

export const useCaptainAcceptRideScreenHook = () => {
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

  const onVerifiedOtp = (value) => {
    console.log("--------------verified ----------------");
    setOtpVerified(value ?? false);
  };
  const onOrderArrived = (value) => {
    console.log("-------- arrived ------------");
    setIsArrived(value);
  };

  const handleLiveCoordinates = (coordinates) => {
    console.log("coordinates", coordinates);
    setLiveCoordinates(coordinates);
  };

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("order-otp-verified", onVerifiedOtp);
      socket.on("order-arrived", onOrderArrived);
      socket.on("new-receive-coordinates", handleLiveCoordinates);
    }
    return () => {
      socket.off("order-otp-verified", onVerifiedOtp);
      socket.off("order-arrived", onOrderArrived);
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

  return {
    otpVerified,
    isArrived,
    completeRideDetails,
    disFromCaptainLocToPick,
    disFromPickToDrop,
    liveCoordinates,
  };
};
