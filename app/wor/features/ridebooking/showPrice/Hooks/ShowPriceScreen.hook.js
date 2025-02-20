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

  const { priceDetails } = useSelector((state) => state.priceDetails); // this is complete price details from admin panel

  const { location } = useSelector((state) => state.location);
  const { dropDetails, selectedVehicleType, isParcScreen, time } = useSelector(
    (state) => state.allRideDetails
  );
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  // this state stored selected vehicle is bottom sheet down display at top this selected vehicle
  const [storedSelectedVehicle, setStoredSelectedVehicle] = useState(null);
  const [knowMoveDownOrUp, setKnowMoveDonwOrUp] = useState("moved up");

  const [vehicleInfoWithDistanceDura, setVehicleInfoWithDistanceDura] =
    useState(null);

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
    dispatch(setPrice(price));
    dispatch(setPriceDetails(calculatedPriceDetails));
    let paymentMethod = price >= profile?.walletBalance ? "cash" : "wallet";
    dispatch(setPaymentMethod(paymentMethod));
  };

  useEffect(() => {
    handlePriceCalculation();
  }, [location, dropDetails]);

  const onNavigateConfirmLocationScreen = () => {
    navigation.navigate("ChangeLoc100mViaMap");
  };

  const kownBotSheetChangeUpOrDown = (changedValue) => {
    setKnowMoveDonwOrUp(changedValue);
  };

  // calculate price details

  useEffect(() => {
    calcPriceDetails();
  }, [location, dropDetails]);

  useEffect(() => {
    const filteredVehicles = isParcScreen
      ? vehicleInfoWithDistanceDura?.filter(
          (vehicle) => vehicle.vehicleType === "Scooty"
        )
      : time
      ? vehicleInfoWithDistanceDura?.filter(
          (vehicle) => vehicle.vehicleType === "Car"
        )
      : vehicleInfoWithDistanceDura;

    setFilteredVehicles(filteredVehicles);
  }, [isParcScreen, time, vehicleInfoWithDistanceDura]);

  useEffect(() => {
    const filterVichle = vehicleInfoWithDistanceDura?.filter(
      (vehicle) =>
        vehicle.vehicleType?.toLowerCase() ===
        selectedVehicleType?.toLowerCase()
    );
    setStoredSelectedVehicle(filterVichle);
  }, [vehicleInfoWithDistanceDura, selectedVehicleType]);

  const calcPriceDetails = async () => {
    try {
      const results = await Promise.all(
        vehicles.map(async (vehicle) => {
          const result = await calDisFromPickToDrop(vehicle.vehicleType);

          const newPrice = handleCalculatePrices(result);

          return {
            ...vehicle,
            distance: result?.distance || "N/A",
            duration: result?.duration || "N/A",
          };
        })
      );

      setVehicleInfoWithDistanceDura(results);
    } catch (error) {
      console.error("Error fetching travel details:", error);
    }
  };

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

        const newData = {
          distance: data?.distance,
          duration: data?.durationInMinutes,
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

  const handleCalculatePrices = (result) => {
    // distance = 0.4 km this is formate
    const checkDistance = result?.distance?.split(" ");
    const duration = result?.duration;

    let price;
    if (checkDistance <= 2) {
      price = 24 + +priceDetails?.baseFare - 5;
    } else {
      if (checkDistance > 2 && checkDistance <= 10) {
        if (checkDistance <= 5) {
          price = +checkDistance * 7.2 + +priceDetails?.baseFare - 5;
        } else {
          price = +checkDistance * 7.2 + +priceDetails?.baseFare;
        }
      } else {
        price = +checkDistance * 8.2 + +priceDetails?.baseFare;
      }
    }

    let timeFace = +duration * 0.5;

    return price + timeFace + +priceDetails?.platformFee;
  };

  console.log("priceDetails", priceDetails);

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
    setShceduleOrderModal,
  };
};
