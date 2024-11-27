import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  formatToIndiaISO,
  haversineDistance,
} from "../../../Constants/calculateKM";
import { useSelector } from "react-redux";
import { API } from "../../../Constants/url";

export const useShowPriceHook = () => {
  const navigation = useNavigation();

  const { token } = useSelector((state) => state.token);
  const route = useRoute();
  const { placeName, pickUpCoordinated, dropDetails, selectedVehicleType } =
    route.params;

  const [isTimeModalOpenClose, setIsTimeModalOpenClose] = useState(false);
  const [isDateTimeData, setIsDateTimeData] = useState("");
  const [normalDateFormat, setNormalDateFormat] = useState("");
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
    selectedVehicleType ?? null
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
    console.log("drop", dropDetails);
    if (!selectedVehicle) {
      setApisError("Please select a vehicle");
      return;
    }
    const indiaDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const datePart = indiaDateTime.split(",")[0];
    const [day, month, year] = datePart.split("/");
    const formattedDate = `${day}-${month}-${year}`;
    const timePart = indiaDateTime.split(",")[1].trim();

    const formattedTime = timePart;
    console.log(timePart);

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
    };

    API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res.data?.order);
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
        console.log(e);
        console.log(e.response?.data?.message);
        setApisError(e.response?.data?.message);
      });
  };

  const onHandleTimeValueHandler = (date) => {
    const formattedIndiaTime = formatToIndiaISO(date);
    setIsDateTimeData(formattedIndiaTime);
    setNormalDateFormat(date?.toLocaleString());
    onTimeModalOpenCloseHandler();
  };

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
  };
};
