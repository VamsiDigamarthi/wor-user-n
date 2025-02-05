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

export const bookingRide = async ({ token, orderDetails }) => {
  try {
    const response = await API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.notifiedTime) {
      Toast.show({
        text1: "Future Order Placed ...!",
        type: "success",
        position: "bottom",
      });
      return;
    }

    return response?.data?.order?._id;
  } catch (error) {
    console.log(error?.response?.data);
    Toast.show({
      text1: error?.response?.data?.message ?? "Failed to book ride",
      type: "error",
      position: "bottom",
    });
    return false;
  }
};


export const getFormattedDateTime = () => {
  // Get current time in "Asia/Kolkata" timezone
  const indiaDateTime = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  }).format(new Date());

  // Split the date and time parts
  const [datePart, timePart] = indiaDateTime.split(", ");
  
  // Extract day, month, and year from date
  const [day, month, year] = datePart.split("/");
  const formattedDate = `${day}-${month}-${year}`;

  // Return formatted date and time
  return { formattedDate, formattedTime: timePart };
};


// Utility function to create order details for both parcel and ride screens
export const createOrderDetails = ({
  isParcel,
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
}) => {
  return isParcel
    ? {
        vehicleType: selectedVehicleType,
        price,
        parcelType,
        orderPlaceDate: formattedDate,
        orderPlaceTime: formattedTime,
        pickupLangitude:
          isSendOrReceiveParcel === "send"
            ? pickUpDetails?.location?.lat
            : dropDetails?.location?.lat,
        pickupLongitude:
          isSendOrReceiveParcel === "send"
            ? pickUpDetails?.location?.lng
            : dropDetails?.location?.lng,
        dropLangitude:
          isSendOrReceiveParcel === "send"
            ? dropDetails?.location?.lat
            : pickUpDetails?.location?.lat,
        dropLongitude:
          isSendOrReceiveParcel === "send"
            ? dropDetails?.location?.lng
            : pickUpDetails?.location?.lng,
        pickupAddress:
          isSendOrReceiveParcel === "send"
            ? pickUpDetails?.name
            : dropDetails?.name,
        pickupVicinity:
          isSendOrReceiveParcel === "send"
            ? pickUpDetails?.vicinity
            : dropDetails?.vicinity,
        dropAddress:
          isSendOrReceiveParcel === "send"
            ? dropDetails?.name
            : pickUpDetails?.name,
        dropVicinity:
          isSendOrReceiveParcel === "send"
            ? dropDetails?.vicinity
            : pickUpDetails?.vicinity,
        isSendOrReceiveParcel,
        paymentMethod,
        sendReceiverData: [
          {
            personName: profile?.name,
            mobile: profile?.mobile,
            address: profile?.address,
            typeUser: isSendOrReceiveParcel === "send" ? "Sender" : "Receiver",
          },
          {
            personName: dropDetails?.senderName,
            mobile: dropDetails?.mobile,
            address: dropDetails?.address,
            typeUser: isSendOrReceiveParcel === "send" ? "Receiver" : "Sender",
          },
        ],
      }
    : {
        vehicleType: selectedVehicleType,
        price,
        orderPlaceDate: formattedDate,
        orderPlaceTime: formattedTime,
        pickupLangitude: pickUpDetails?.location?.lat,
        pickupLongitude: pickUpDetails?.location?.lng,
        dropLangitude: dropDetails?.location?.lat,
        dropLongitude: dropDetails?.location?.lng,
        pickupAddress: pickUpDetails?.name,
        pickupVicinity: pickUpDetails?.vicinity,
        dropAddress: dropDetails?.name,
        dropVicinity: dropDetails?.vicinity,
        howManyMens,
        isSendOrReceiveParcel,
        time,
        paymentMethod,
      };
};
