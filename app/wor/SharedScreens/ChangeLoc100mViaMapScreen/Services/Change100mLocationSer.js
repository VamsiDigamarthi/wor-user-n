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

// Helper function for formatting date and time
// export const getFormattedDateTime = () => {
//   // const indiaDateTime = new Date().toLocaleString("en-IN", {
//   //   timeZone: "Asia/Kolkata",
//   // });
//   const indiaDateTime = new Date().toLocaleString();
//   const datePart = indiaDateTime.split(",")[0];
//   const [day, month, year] = datePart.split("/");
//   const formattedDate = `${day}-${month}-${year}`;
//   const formattedTime = indiaDateTime.split(",")[1].trim();

//   return { formattedDate, formattedTime, indiaDateTime };
// };

export const getFormattedDateTime = () => {
  const now = new Date();
  const offset = 5.5 * 60; // IST is UTC+5:30 in minutes
  const localTime = new Date(now.getTime());

  // Format the date and time
  const day = String(localTime.getDate()).padStart(2, "0");
  const month = String(localTime.getMonth() + 1).padStart(2, "0");
  const year = localTime.getFullYear();
  const hours = localTime.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(localTime.getMinutes()).padStart(2, "0");
  const ampm = localTime.getHours() >= 12 ? "pm" : "am";

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return { formattedDate, formattedTime };
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
      };
};
