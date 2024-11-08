import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { haversineDistance } from "../../../Constants/calculateKM";
import { useSelector } from "react-redux";
import { API } from "../../../Constants/url";

export const useShowPriceHook = () => {
  const navigation = useNavigation();

  const { token } = useSelector((state) => state.token);
  const route = useRoute();
  const { placeName, pickUpCoordinated, dropDetails } = route.params;

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

  const [selectedVehicle, setSelectedVehicle] = useState(null);
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
    };

    API.post("/user/placed-order", orderDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        navigation.navigate("lookingforride", {
          price: beforeOrder.price,
          vehicleType: selectedVehicle,
          placeName,
          dropAddress: dropDetails?.name,
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response?.data?.message);
        setApisError(e.response?.data?.message);
      });
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
  };
};
