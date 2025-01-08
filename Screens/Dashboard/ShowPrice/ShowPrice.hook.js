import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  formatToIndiaISO,
  haversineDistance,
} from "../../../Constants/calculateKM";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../Constants/url";
import { onProfileSection } from "../../../redux/Features/Auth/ProfileSlice";

export const useShowPriceHook = () => {
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);

  const [rideBookBeforeCheckMPinAddhar, setRideBookBeforeCheckPinAddhar] =
    useState(false);
  const onChangeRideBookBeforeCheckPinAddharHandler = () => {
    setRideBookBeforeCheckPinAddhar(!rideBookBeforeCheckMPinAddhar);
  };
  const [isOpenEnterConfirmMPinModal, setIsOpenEnterConfirmMPinModal] =
    useState(false);

  const onOpenIsEnterConfirmPinModal = () => {
    setIsOpenEnterConfirmMPinModal(!isOpenEnterConfirmMPinModal);
  };
  const [mPin, setMPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [mPinError, setMPinError] = useState("");

  const onFinalPlaceOrder = () => {
    console.log("onFinalPlaceOrder");
    const indiaDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const datePart = indiaDateTime.split(",")[0];
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${day}-${month}-${year}`;
    const timePart = indiaDateTime.split(",")[1].trim();

    const formattedTime = timePart;
    // console.log(timePart);

    const orderDetails = {
      vehicleType: selectedVehicle,
      price: beforeOrder.price,
      orderPlaceDate: formattedDate,
      orderPlaceTime: formattedTime,
      pickupLangitude: pickUpCoordinated?.lat,
      pickupLongitude: pickUpCoordinated?.lng,
      dropLangitude: dropDetails?.location?.lat,
      dropLongitude: dropDetails?.location?.lng,
      pickupAddress: placeName,
      dropAddress: dropDetails?.name,
      dropVicinity: dropDetails?.vicinity,
      time: isDateTimeData ?? null,
    };

    API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        onOpenIsEnterConfirmPinModal();
        if (isDateTimeData) {
          console.log("scheduled order placed successfully");
          return;
        }

        navigation.navigate("lookingforride", {
          price: beforeOrder.price,
          vehicleType: selectedVehicle,
          placeName,
          dropAddress: dropDetails,
          pickUpCoordinated,
          orderId: res?.data?.order?._id,
        });
      })
      .catch((e) => {
        console.log("failure");
        console.log(e.response?.data?.message);
        setApisError(e.response?.data?.message);
      });
  };

  const onCheckMyPinCorrectOrWrong = async (newPin) => {
    try {
      await API.patch(
        "/user/check-mpin",
        {
          mpin: newPin?.join(""),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMPin(["", "", "", ""]);
      setMPinError("");
      onFinalPlaceOrder();
    } catch (error) {
      console.log(error?.response?.data);
      setMPinError(error?.response?.data?.message);
    }
  };

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
      // If value is empty (backspace), move backward and clear the current input
      newPin[index] = "";
      setMPin(newPin);
      if (index > 0) {
        inputRefs.current[index - 1].focus(); // Move to the previous input
      }
    }
  };

  const { token } = useSelector((state) => state.token);
  const route = useRoute();

  const dispatch = useDispatch();
  const { placeName, pickUpCoordinated, dropDetails, selectedVehicleType } =
    route.params;

  const [isTimeModalOpenClose, setIsTimeModalOpenClose] = useState(false);
  const [isDateTimeData, setIsDateTimeData] = useState("");
  const [normalDateFormat, setNormalDateFormat] = useState(null);
  const onTimeModalOpenCloseHandler = () => {
    setIsTimeModalOpenClose(!isTimeModalOpenClose);
  };

  // store this price and vehicleType where user selecter corresponsind services
  const [beforeOrder, setBeforeOrder] = useState({
    vehicleType: "",
    price: "",
  });

  const [pricesInKM, setPricesInKm] = useState({
    scooty: 0,
    car: 0,
    auto: 0,
  });

  const [selectedVehicle, setSelectedVehicle] = useState(
    selectedVehicleType ?? "scooty"
  );
  const [apiError, setApisError] = useState("");

  const handleVehiclePress = (vehicle) => {
    setSelectedVehicle(vehicle);
    setBeforeOrder({
      vehicleType: vehicle,
      price: pricesInKM[vehicle]?.toFixed(0),
    });
  };

  // calculate distance
  useEffect(() => {
    if (pickUpCoordinated && dropDetails?.location) {
      let distance = haversineDistance(
        pickUpCoordinated,
        dropDetails?.location
      );
      const scootyRate = 7;
      const carRate = 10;
      const authRate = 8;
      const scootyPrice = distance * scootyRate;
      const carPrice = distance * carRate;
      const authPrice = distance * authRate;

      setPricesInKm({
        scooty: scootyPrice,
        car: carPrice,
        auto: authPrice,
      });
    }
  }, [pickUpCoordinated, dropDetails]);

  const onPlaceTheOrder = () => {
    if (profile?.mpin === null || profile?.adhar === null) {
      onChangeRideBookBeforeCheckPinAddharHandler();
      return;
    }

    if (!selectedVehicle) {
      setApisError("Please select a vehicle");
      return;
    }

    if (!isOpenEnterConfirmMPinModal) {
      onOpenIsEnterConfirmPinModal();
      return;
    }
  };

  const onHandleTimeValueHandler = (date) => {
    const formattedIndiaTime = formatToIndiaISO(date);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      weekday: "short",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    setIsDateTimeData(formattedIndiaTime);
    // console.log("slice", formattedDate);
    setNormalDateFormat(formattedDate);
    onTimeModalOpenCloseHandler();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(onProfileSection({ token }));
    }, [])
  );

  const onNavigateAadharUploadUi = () => {
    navigation.navigate("DashBoardAadharCard", {
      isPriceScreen: true,
    });
  };

  const onMpinScreen = () => {
    navigation.navigate("DashBoardMPinCard", {
      isPriceScreen: true,
    });
  };

  // console.log("dropDetails", dropDetails);
  const vehicles = [
    {
      image: require("../../../assets/images/HomeServiceImages/scooty.png"),
      personCount: 1,
      price: pricesInKM?.scooty,
      vehicleType: "Scooty",
      isDisplayFastTag: true,
      isDisplayBeatTheTraffic: true,
      isDisplayUsericon: true,
      isSelected: selectedVehicle === "scooty",
      onPress: () => handleVehiclePress("scooty"),
      shouldDisplay: !isDateTimeData, // Conditionally display based on `isDateTimeData`
    },
    {
      image: require("../../../assets/images/HomeServiceImages/cab.png"),
      personCount: 4,
      price: pricesInKM?.car,
      vehicleType: "Car",
      isSelected: selectedVehicle === "car",
      onPress: () => handleVehiclePress("car"),
      shouldDisplay: true, // Always display the car
    },
    {
      image: require("../../../assets/images/HomeServiceImages/auto.png"),
      personCount: 3,
      price: pricesInKM?.auto,
      vehicleType: "Auto",
      isSelected: selectedVehicle === "auto",
      onPress: () => handleVehiclePress("auto"),
      shouldDisplay: !isDateTimeData, // Conditionally display based on `isDateTimeData`
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) => vehicle.shouldDisplay);
  // Sort vehicles to place the selected one at the top
  const sortedVehicles = filteredVehicles.sort((a, b) =>
    a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1
  );

  useEffect(() => {
    const onChangeSelectVehicle = () => {
      setSelectedVehicle(sortedVehicles[0]?.vehicleType);
    };
    normalDateFormat && onChangeSelectVehicle();
  }, [normalDateFormat]);

  return {
    placeName,
    pickUpCoordinated,
    dropDetails,
    pricesInKM,
    handleVehiclePress,
    selectedVehicle,
    onPlaceTheOrder,
    apiError,
    // time modal open close
    onTimeModalOpenCloseHandler,
    isTimeModalOpenClose,
    onHandleTimeValueHandler,
    isDateTimeData,
    normalDateFormat,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    profile,
    onNavigateAadharUploadUi,
    onMpinScreen,
    // confirm mpin
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
    handleChange,
    inputRefs,
    mPin,
    mPinError,
    navigation,
    vehicles,
    sortedVehicles,
  };
};
