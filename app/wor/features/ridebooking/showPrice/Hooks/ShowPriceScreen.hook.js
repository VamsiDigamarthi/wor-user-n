import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { haversineDistance } from "../../../../../../Constants/calculateKM";
import { setPrice, setPriceDetails } from "../../sharedLogics/rideDetailsSlice";
import { calculatePriceDetails, vehicles } from "../vehicleData";
import { useNavigation } from "@react-navigation/native";

export const useShowPriceScreenHook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { location } = useSelector((state) => state.location);
  const { dropDetails, selectedVehicleType, isParcScreen } = useSelector(
    (state) => state.allRideDetails
  );
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const handlePriceCalculation = () => {
    if (!location || !dropDetails?.location) return;

    const distance = haversineDistance(location, dropDetails.location);
    const calculatedPriceDetails = calculatePriceDetails(distance);

    dispatch(setPrice(calculatedPriceDetails[selectedVehicleType]));
    dispatch(setPriceDetails(calculatedPriceDetails));
  };

  useEffect(() => {
    handlePriceCalculation();
  }, [location, dropDetails]);

  useEffect(() => {
    const filteredVehicles = isParcScreen
      ? vehicles.filter((vehicle) => vehicle.vehicleType === "Scooty")
      : vehicles;
    setFilteredVehicles(filteredVehicles);
  }, [isParcScreen]);

  // console.log("dropDetails", dropDetails);
  const onNavigateConfirmLocationScreen = () => {
    navigation.navigate("ChangeLoc100mViaMap");
  };

  return {
    location,
    dropDetails,
    filteredVehicles,
    selectedVehicleType,
    isParcScreen,
    onNavigateConfirmLocationScreen,
  };
};

// const vehicles = useMemo(() => {
//   return VEHICLES.map((vehicle) => ({
//     ...vehicle,
//     price: priceDetails?.[vehicle.vehicleType.toLowerCase()],
//   }));
// }, [priceDetails]);
