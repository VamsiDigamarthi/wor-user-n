import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { haversineDistance } from "../../../../../../Constants/calculateKM";
import {
  setPaymentMethod,
  setPrice,
  setPriceDetails,
} from "../../sharedLogics/rideDetailsSlice";
import { calculatePriceDetails, vehicles } from "../vehicleData";
import { useNavigation } from "@react-navigation/native";
import { getTravelDetails } from "../../../../../../Constants/displaylocationmap";

export const useShowPriceScreenHook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);

  const { location } = useSelector((state) => state.location);
  const { dropDetails, selectedVehicleType, isParcScreen, time } = useSelector(
    (state) => state.allRideDetails
  );
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // this state stored selected vehicle is bottom sheet down display at top this selected vehicle
  const [storedSelectedVehicle, setStoredSelectedVehicle] = useState(null);
  const [knowMoveDownOrUp, setKnowMoveDonwOrUp] = useState("moved up");

  const [scootyData, setScootyData] = useState(null);

  const [carData, setCarData] = useState(null);

  const [autoData, setAutoData] = useState(null);

  const calDisFromPickToDrop = async (vehicleType) => {
    try {
      if (location && dropDetails?.location) {
        const data = await getTravelDetails(
          [(startLon = location?.lng), (startLat = location?.lat)],
          [
            (endLon = dropDetails?.location?.lng),
            (endLat = dropDetails?.location?.lat),
          ],
          vehicleType
        );

        console.log(data?.distance, data?.durationInMinutes, vehicleType);

        const newData = {
          distance: data?.distance?.toString(),
          duration: data?.durationInMinutes?.toString(),
        };

        return newData;
      } else {
        console.warn("Incomplete pickup or drop details");
        return null;
      }
    } catch (error) {
      console.error("Error calculating distance from pickup to drop:", error);
      return null;
    }
  };

  async function getAll() {
    let scooty = await calDisFromPickToDrop("scooty");
    setScootyData(scooty);
    let car = await calDisFromPickToDrop("car");
    setCarData(car);

    let auto = await calDisFromPickToDrop("auto");
    setAutoData(auto);
  }

  useEffect(() => {
    getAll();
  }, [selectedVehicleType, location]);

  // shcedule order state
  const [shceduleOrderModal, setShceduleOrderModal] = useState(false);
  const timerSetModalOpen = () => {
    setShceduleOrderModal(!shceduleOrderModal);
  };

  const handlePriceCalculation = () => {
    if (!location || !dropDetails?.location) return;

    const distance = haversineDistance(location, dropDetails.location);
    const calculatedPriceDetails = calculatePriceDetails(Math.ceil(distance));
    let price = calculatedPriceDetails[selectedVehicleType];

    // if (profile?.donationActive) {
    //   Object.keys(calculatedPriceDetails).forEach((vehicleType) => {
    //     calculatedPriceDetails[vehicleType] =
    //       +calculatedPriceDetails[vehicleType] + 2;
    //   });
    //   price += 2;
    // }

    dispatch(setPrice(price));
    dispatch(setPriceDetails(calculatedPriceDetails));

    let paymentMethod = price >= profile?.walletBalance ? "cash" : "wallet";

    dispatch(setPaymentMethod(paymentMethod));
  };

  useEffect(() => {
    console.log("from useefects");

    handlePriceCalculation();
  }, [location, dropDetails]);

  useEffect(() => {
    const filteredVehicles = isParcScreen
      ? vehicles.filter((vehicle) => vehicle.vehicleType === "Scooty")
      : time
      ? vehicles.filter((vehicle) => vehicle.vehicleType === "Car")
      : vehicles;

    setFilteredVehicles(filteredVehicles);
  }, [isParcScreen, time]);

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
    time,
    profile,
    scootyData,
    carData,
    autoData,
  };
};

// const vehicles = useMemo(() => {
//   return VEHICLES.map((vehicle) => ({
//     ...vehicle,
//     price: priceDetails?.[vehicle.vehicleType.toLowerCase()],
//   }));
// }, [priceDetails]);
