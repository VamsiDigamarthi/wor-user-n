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

  const { token } = useSelector((state) => state.token);
  const route = useRoute();

  const dispatch = useDispatch();
  const {
    placeName,
    pickUpCoordinated,
    dropDetails,
    selectedVehicleType,
    // parcel props
    isPickLocationFromParc,
    parcelDetails,
    selectedCard,
  } = route.params;

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
      const worPreminum = distance * 12;

      setPricesInKm({
        scooty: scootyPrice,
        car: carPrice,
        auto: authPrice,
        worPreminum,
      });
      setBeforeOrder({
        vehicleType: "scooty",
        price: scootyPrice,
      });
    }
    if (pickUpCoordinated && parcelDetails?.location) {
      let distance = haversineDistance(
        pickUpCoordinated,
        parcelDetails?.location
      );
      const scootyRate = 7;
      const carRate = 10;
      const authRate = 8;
      const scootyPrice = distance * scootyRate;
      const carPrice = distance * carRate;
      const authPrice = distance * authRate;
      const worPreminum = distance * 12;

      setPricesInKm({
        scooty: scootyPrice,
        car: carPrice,
        auto: authPrice,
        worPreminum,
      });

      setBeforeOrder({
        vehicleType: "scooty",
        price: scootyPrice,
      });
    }
  }, [pickUpCoordinated, dropDetails, parcelDetails]);
  // my default ini

  const onPlaceTheOrder = () => {
    navigation.navigate("ChangeLoc100mViaMap", {
      place: { name: placeName, location: pickUpCoordinated },
      isRideBookingScreen: isPickLocationFromParc ? false : true,
      rideDropDetails: dropDetails,
      selectedVehicle,
      ridePrice: beforeOrder.price,
      time: isDateTimeData ?? null,
      parcelDetails,
      selectedCard,
      isPickLocationFromParc: isPickLocationFromParc,
    });
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
      shouldDisplay: !isPickLocationFromParc, // Conditionally exclude when `isPickLocationFromParc` is true
    },
    {
      image: require("../../../assets/images/HomeServiceImages/cab.png"),
      personCount: 4,
      price: pricesInKM?.worPreminum,
      vehicleType: "wor-premium",
      isSelected: selectedVehicle === "wor-premium",
      onPress: () => handleVehiclePress("wor-premium"),
      shouldDisplay: !isPickLocationFromParc, // Conditionally exclude when `isPickLocationFromParc` is true
    },
    {
      image: require("../../../assets/images/HomeServiceImages/auto.png"),
      personCount: 3,
      price: pricesInKM?.auto,
      vehicleType: "Auto",
      isSelected: selectedVehicle === "auto",
      onPress: () => handleVehiclePress("auto"),
      shouldDisplay: !isDateTimeData && !isPickLocationFromParc, // Conditionally exclude when `isPickLocationFromParc` is true
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

    profile,

    navigation,
    vehicles,
    sortedVehicles,
    parcelDetails,
  };
};
