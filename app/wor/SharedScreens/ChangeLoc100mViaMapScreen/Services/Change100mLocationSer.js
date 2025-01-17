import Toast from "react-native-toast-message";
import { API } from "../../../../../Constants/url";

export const onCheckMPin = async ({ token, mpin }) => {
  try {
    await API.patch(
      "/user/check-mpin",
      {
        mpin: mpin?.join(""),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to add saved address",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const finallyBookRide = async ({
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
}) => {
  const orderDetails = {
    vehicleType: selectedVehicle,
    price: ridePrice,
    orderPlaceDate: formattedDate,
    orderPlaceTime: formattedTime,
    pickupLangitude: newMarker.lat,
    pickupLongitude: newMarker?.lng,
    dropLangitude: dropDetails?.location?.lat,
    dropLongitude: dropDetails?.location?.lng,
    pickupAddress: pickUpPlace?.placeName,
    pickupVicinity: pickUpPlace?.placeVicinity,
    dropAddress: dropDetails?.name,
    dropVicinity: dropDetails?.vicinity,
    time,
    howManyMans,
  };

  try {
    const response = await API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (time) {
      return;
    }
    // console.log("response?.data?.order?._id", response?.data);
    return response?.data?.order?._id;
  } catch (error) {
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to book ride",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};

export const onBookParcel = async ({
  token,
  parcelPrice,
  formattedTime,
  formattedDate,
  parcelDetails,
  selectedCard,
  pickUpPlace,
  newMarker,
  profile,
}) => {
  const orderDetails = {
    vehicleType: "scooty",
    price: +parcelPrice + 5,
    orderPlaceDate: formattedDate,
    orderPlaceTime: formattedTime,
    pickupLangitude:
      selectedCard === "send" ? newMarker?.lat : parcelDetails?.location?.lat,
    pickupLongitude:
      selectedCard === "send" ? newMarker.lng : parcelDetails?.location?.lng,

    dropLangitude:
      selectedCard === "send" ? parcelDetails?.location?.lat : newMarker.lat,
    dropLongitude:
      selectedCard === "send" ? parcelDetails?.location?.lng : newMarker.lng,
    pickupAddress:
      selectedCard === "send" ? pickUpPlace?.placeName : parcelDetails?.name,
    pickupVicinity:
      selectedCard === "send"
        ? pickUpPlace?.placeVicinity
        : parcelDetails?.vicinity,
    dropAddress:
      selectedCard === "send" ? parcelDetails?.name : pickUpPlace?.placeName,
    dropVicinity:
      selectedCard === "send"
        ? parcelDetails?.vicinity
        : pickUpPlace?.placeVicinity,

    sendReceiverData:
      selectedCard === "send"
        ? [
            {
              personName: profile?.name,
              mobile: profile?.mobile,
              landMark: "",
              address: profile?.address,
              typeUser: "Sender",
            },
            {
              personName: parcelDetails?.senderName,
              mobile: parcelDetails?.mobile,
              landMark: parcelDetails?.landMark,
              address: parcelDetails?.address,
              typeUser: "Receiver",
            },
          ]
        : [
            {
              personName: profile?.name,
              mobile: profile?.mobile,
              landMark: "",
              address: profile.address,
              typeUser: "Receiver",
            },
            {
              personName: parcelDetails?.senderName,
              mobile: parcelDetails?.mobile,
              landMark: parcelDetails?.landMark,
              address: parcelDetails?.address,
              typeUser: "Sender",
            },
          ],
  };

  try {
    const response = await API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("response?.data?.order?._id", response?.data);
    return response?.data?.order?._id;
  } catch (error) {
    console.error(error?.response);
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to book ride",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};
