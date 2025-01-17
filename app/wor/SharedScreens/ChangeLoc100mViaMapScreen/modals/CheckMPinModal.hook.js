import { useRef, useState } from "react";
import {
  finallyBookRide,
  onBookParcel,
  onCheckMPin,
} from "../Services/Change100mLocationSer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export const useCheckMPinModalHook = ({
  dropDetails,
  selectedVehicle,
  time,
  ridePrice,
  selectedCard,
  parcelDetails,
  isPickLocationFromParc,
  isRideBookingScreen,
  pickUpPlace,
  newMarker,
  onOpenIsEnterConfirmPinModal,
  parcelPrice,
  howManyMans,
}) => {
  const navigation = useNavigation();
  const [mPin, setMPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);

  const handleChange = (value, index) => {
    const newPin = [...mPin];

    // If value is not empty, update and move forward
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
    if (data) {
      const indiaDateTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      const datePart = indiaDateTime.split(",")[0];
      const [day, month, year] = datePart.split("/");
      const formattedDate = `${day}-${month}-${year}`;
      const timePart = indiaDateTime.split(",")[1].trim();
      const formattedTime = timePart;
      if (isPickLocationFromParc) {
        let parcelId = await onBookParcel({
          token,
          formattedTime,
          formattedDate,
          parcelPrice,
          parcelDetails,
          selectedCard,
          pickUpPlace,
          newMarker,
          profile,
        });
        onOpenIsEnterConfirmPinModal();
        if (parcelId) {
          navigation.navigate("lookingforride", {
            price: +parcelPrice + 5,
            vehicleType: selectedVehicle,
            placeName: pickUpPlace?.placeVicinity?.name,
            dropAddress: {
              location: parcelDetails?.location,
              name: parcelDetails?.name,
              vicinity: parcelDetails?.vicinity,
            },
            pickUpCoordinated: newMarker,
            orderId: parcelId,
          });
        }
      }
      if (isRideBookingScreen) {
        // book ride
        let bookRide = await finallyBookRide({
          token,
          formattedDate,
          formattedTime,
          dropDetails,
          selectedVehicle,
          time,
          ridePrice,
          pickUpPlace,
          newMarker,
          howManyMans,
        });
        onOpenIsEnterConfirmPinModal();
        if (bookRide) {
          navigation.navigate("lookingforride", {
            price: ridePrice,
            vehicleType: selectedVehicle,
            placeName: pickUpPlace?.placeName,
            dropAddress: dropDetails,
            pickUpCoordinated: newMarker,
            orderId: bookRide,
          });
        }
      }
      console.log("m pin correct");
    }
  };

  return {
    mPin,
    inputRefs,
    handleChange,
  };
};
