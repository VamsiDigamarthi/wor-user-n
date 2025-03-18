import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentMethod,
  setPrice,
} from "../../sharedLogics/rideDetailsSlice";
import { vehicles } from "../vehicleData";
import { useNavigation } from "@react-navigation/native";
import { getTravelDetails } from "../../../../../../Constants/displaylocationmap";

import moment from "moment-timezone";

export const useShowPriceScreenHook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);

  const { priceDetails } = useSelector((state) => state.priceDetails); // this is complete price details from admin panel

  const { location } = useSelector((state) => state.location);

  const { dropDetails, selectedVehicleType, isParcScreen, time } = useSelector(
    (state) => state.allRideDetails
  );

  // console.log("dropDetails", dropDetails);
  // console.log("selectedVehicleType", selectedVehicleType);

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

  const filteredVehicleList = useMemo(() => {
    if (!vehicleInfoWithDistanceDura) return [];

    // console.log("sderftgh", vehicleInfoWithDistanceDura);
    return isParcScreen
      ? vehicleInfoWithDistanceDura.filter(
          (vehicle) => vehicle.vehicleType === "Scooty"
        )
      : time
      ? vehicleInfoWithDistanceDura.filter(
          (vehicle) => vehicle.vehicleType === "Car"
        )
      : vehicleInfoWithDistanceDura;
  }, [vehicleInfoWithDistanceDura, isParcScreen, time]);

  useEffect(() => {
    setFilteredVehicles(filteredVehicleList);
  }, [filteredVehicleList, vehicleInfoWithDistanceDura]);

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

          // console.log(result , "-----");

          const newPrice = handleCalculatePrices(result, vehicle?.vehicleType);

          console.log(newPrice);

          if (
            selectedVehicleType?.toLowerCase() ===
            vehicle.vehicleType?.toLowerCase()
          ) {
            await dispatch(setPrice(newPrice));

            let paymentMethod =
              +newPrice >= +profile?.walletBalance ? "cash" : "wallet";
            await dispatch(setPaymentMethod(paymentMethod));
          }

          return {
            ...vehicle,
            distance: result?.distance || "N/A",
            duration: result?.duration || "N/A",
            price: newPrice,
          };
        })
      );
      // console.log("result: " + JSON.stringify(results));

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

  const handleCalculatePrices = (result, vehicleType) => {
    console.log(result, "----inside -----");

    const { distance = "0.0 km", duration = 0 } = result || {};

    const [distanceValue] = distance?.split(" ").map(Number);
    const baseFare = +priceDetails?.baseFare || 5;

    // console.log(priceDetails ,"----priceDetails=====");

    // const nightFare = +priceDetails?.nightFare || 0;
    const platFormPrice = +priceDetails?.platformFee;

    const price = calculateDistanceFare(distanceValue, baseFare);
    const timeFare = calculateTimeFare(duration);

    const isNightTime = checkNightTime();
    const finalPrice = isNightTime
      ? applyNightFare(price, timeFare, platFormPrice, baseFare)
      : Math.ceil(price + timeFare + baseFare + platFormPrice);

    return finalPrice;
  };

  const calculateDistanceFare = (distance, baseFare) => {
    if (distance <= 2) {
      return 24 + baseFare - 5;
    }
    if (distance > 2 && distance <= 5) {
      return distance * 7.2 + baseFare - 5;
    }
    if (distance > 5 && distance <= 10) {
      return distance * 7.2 + baseFare;
    }
    return distance * 8.2 + baseFare;
  };

  const calculateTimeFare = (duration) => {
    return +duration * 0.5;
  };

  const checkNightTime = () => {
    const currentHour = moment().tz("Asia/Kolkata").hour();
    return currentHour >= 23 || currentHour < 6;

    // return false
  };

  const applyNightFare = (price, timeFare, platFormPrice, baseFare) => {
    const totalPrice = Math.ceil(price + timeFare + platFormPrice, baseFare);
    const randomPerc = getRandomNightFare();
    const increasedAmount = Math.ceil((randomPerc / 100) * totalPrice);
    return totalPrice + increasedAmount;
  };

  const getRandomNightFare = () => {
    const [min, max] = priceDetails?.nightFarePercentage || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  };

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
