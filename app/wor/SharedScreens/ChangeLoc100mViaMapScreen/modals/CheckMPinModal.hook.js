import { useRef, useState } from "react";
import {
  bookingRide,
  createOrderDetails,
  getFormattedDateTime,
  onCheckMPin,
} from "../Services/Change100mLocationSer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useSocket } from "../../../../../SocketContext";

export const useCheckMPinModalHook = ({ onOpenIsEnterConfirmPinModal }) => {
  const {
    isParcScreen,
    dropDetails,
    selectedVehicleType,
    isSendOrReceiveParcel,
    parcelType,
    price,
    pickUpDetails,
    howManyMens,
    time,
    paymentMethod,
  } = useSelector((state) => state.allRideDetails);

  const { socket, isConnected } = useSocket();
  const navigation = useNavigation();
  const [mPin, setMPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);

  const handleChange = (value, index) => {
    const newPin = [...mPin];

    if (value) {
      newPin[index] = value;
      setMPin(newPin);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // Move to the next input
      }
      if (index === inputRefs.current.length - 1) {
        onCheckMyPinCorrectOrWrong(newPin);
      }
    } else {
      newPin[index] = "";
      setMPin(newPin);
      if (index > 0) {
        inputRefs.current[index - 1].focus(); // Move to the previous input
      }
    }
  };

  const onCheckMyPinCorrectOrWrong = async (newPin) => {
    const data = await onCheckMPin({ token, mpin: newPin });
    setMPin(["", "", "", ""]);
    onOpenIsEnterConfirmPinModal(); // close the m pin modal

    if (!data) return;

    const { formattedDate, formattedTime } = getFormattedDateTime();

    const orderDetails = createOrderDetails({
      isParcel: isParcScreen,
      pickUpDetails,
      dropDetails,
      profile,
      price,
      selectedVehicleType,
      parcelType,
      formattedDate,
      formattedTime,
      howManyMens,
      isSendOrReceiveParcel,
      time,
      paymentMethod,
    });

    console.log("orderDetails", orderDetails);

    const orderId = await bookingRide({ token, orderDetails });
    if (!orderId) return;

    if (isConnected) {
      socket.emit("ride-live-communication", { orderId, userType: "user" });
    }

    navigation.navigate("lookingforride", {
      orderId,
    });

    // navigation.reset({
    //   index: 1, // Make captaineacceptride the active screen
    //   routes: [
    //     {
    //       name: "lookingforride",
    //       params: { orderId },
    //     },
    //     {
    //       name: "captaineacceptride",
    //     },
    //   ],
    // });
  };

  return {
    mPin,
    inputRefs,
    handleChange,
  };
};
