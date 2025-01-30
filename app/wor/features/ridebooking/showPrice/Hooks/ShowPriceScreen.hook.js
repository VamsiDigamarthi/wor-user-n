import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { haversineDistance } from "../../../../../../Constants/calculateKM";
import { setPrice, setPriceDetails } from "../../sharedLogics/rideDetailsSlice";
import { calculatePriceDetails, vehicles } from "../vehicleData";
import { useNavigation } from "@react-navigation/native";

export const useShowPriceScreenHook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);

  const { location } = useSelector((state) => state.location);
  const { dropDetails, selectedVehicleType, isParcScreen } = useSelector(
    (state) => state.allRideDetails
  );
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // this state stored selected vehicle is bottom sheet down display at top this selected vehicle
  const [storedSelectedVehicle, setStoredSelectedVehicle] = useState(null);
  const [knowMoveDownOrUp, setKnowMoveDonwOrUp] = useState("moved up");

  // shcedule order state
  const [shceduleOrderModal, setShceduleOrderModal] = useState(false);
  const timerSetModalOpen = () => {
    setShceduleOrderModal(!shceduleOrderModal);
  };

  const handlePriceCalculation = () => {
    if (!location || !dropDetails?.location) return;

    const distance = haversineDistance(location, dropDetails.location);
    const calculatedPriceDetails = calculatePriceDetails(distance);
    let price = +calculatedPriceDetails[selectedVehicleType];

    if (profile?.donationActive) {
      Object.keys(calculatedPriceDetails).forEach((vehicleType) => {
        calculatedPriceDetails[vehicleType] =
          +calculatedPriceDetails[vehicleType] + 2;
      });
      price += 2;
    }

    dispatch(setPrice(price));
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

  const kownBotSheetChangeUpOrDown = (changedValue) => {
    setKnowMoveDonwOrUp(changedValue);
  };

  useEffect(() => {
    const filterVichle = vehicles.filter(
      (vehicle) =>
        vehicle.vehicleType?.toLowerCase() ===
        selectedVehicleType?.toLowerCase()
    );
    setStoredSelectedVehicle(filterVichle);
  }, [selectedVehicleType]);

  return {
    location,
    dropDetails,
    filteredVehicles,
    selectedVehicleType,
    isParcScreen,
    onNavigateConfirmLocationScreen,
    kownBotSheetChangeUpOrDown,
    knowMoveDownOrUp,
    storedSelectedVehicle,
    timerSetModalOpen,
    shceduleOrderModal,
  };
};

// const vehicles = useMemo(() => {
//   return VEHICLES.map((vehicle) => ({
//     ...vehicle,
//     price: priceDetails?.[vehicle.vehicleType.toLowerCase()],
//   }));
// }, [priceDetails]);
