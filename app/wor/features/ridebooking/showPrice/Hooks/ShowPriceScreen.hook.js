import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHowManyMens,
  setPaymentMethod,
  setPrice,
} from "../../sharedLogics/rideDetailsSlice";
import { vehicles } from "../vehicleData";
import { useNavigation } from "@react-navigation/native";
import { getTravelDetails } from "../../../../../../Constants/displaylocationmap";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import moment from "moment-timezone";

export const useShowPriceScreenHook = () => {
  const travelDetailsCache = useRef({});
  // dispatch(setPaymentMethod(method));

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);

  const { priceDetails } = useSelector((state) => state.priceDetails); // this is complete price details from admin panel

  const { location } = useSelector((state) => state.location);

  const { dropDetails, selectedVehicleType, isParcScreen, time } = useSelector(
    (state) => state.allRideDetails
  );

  const insets = useSafeAreaInsets();

  const hasSoftwareNavigationBar = insets.bottom > 0;

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
    dispatch(setHowManyMens(0));
  }, []);

  const filteredVehicleList = useMemo(() => {
    if (!vehicleInfoWithDistanceDura) return [];

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
  }, [filteredVehicleList]);

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

  useEffect(() => {
    calcPriceDetails();
  }, [location, dropDetails]);

  const calcPriceDetails = async () => {
    try {
      // Fetch travel details for all vehicles in parallel
      const travelDetails = await Promise.all(
        vehicles.map(async (vehicle) => {
          const result = await calDisFromPickToDrop(vehicle.vehicleType);
          return {
            ...vehicle,
            distance: result?.distance || "N/A",
            duration: result?.duration || "N/A",
          };
        })
      );

      // Calculate prices for all vehicles
      const results = travelDetails.map((vehicle) => {
        // console.log("priceDetails", priceDetails);

        let vehcilePrices = priceDetails?.find(
          (priceDe) =>
            priceDe.vehicleType?.toLowerCase() ===
            vehicle.vehicleType?.toLowerCase()
        );

        // console.log("vehcilePrices", vehcilePrices);

        const newPrice = handleCalculatePrices(
          vehicle,
          vehicle.vehicleType,
          vehcilePrices
        );
        // console.log("newPrice", newPrice);

        if (
          selectedVehicleType?.toLowerCase() ===
          vehicle.vehicleType?.toLowerCase()
        ) {
          dispatch(setPrice(newPrice));
          let paymentMethod =
            +newPrice >= +profile?.walletBalance ? "cash" : "wallet";
          dispatch(setPaymentMethod(paymentMethod));
        }

        return {
          ...vehicle,
          price: newPrice,
        };
      });

      const carPrice = results.find(
        (v) => v.vehicleType.toLowerCase() === "car"
      )?.price;

      const worPremiumPrice = results.find(
        (v) => v.vehicleType.toLowerCase() === "wor-premium"
      )?.price;

      const updatedResults = results.map((vehicle) => {
        if (vehicle.vehicleType.toLowerCase() === "bookany") {
          //
          let price =
            carPrice && worPremiumPrice
              ? `${carPrice}-${worPremiumPrice}`
              : "N/A";

          if (selectedVehicleType?.toLowerCase() === "bookany") {
            dispatch(setPrice(price));
            let paymentMethod =
              +worPremiumPrice >= +profile?.walletBalance ? "cash" : "wallet";

            dispatch(setPaymentMethod(paymentMethod));
          }
          return {
            ...vehicle,
            price: price,
          };
        }
        return vehicle;
      });

      setVehicleInfoWithDistanceDura(updatedResults);
    } catch (error) {
      console.error("Error fetching travel details:", error);
    }
  };

  // completed
  const calDisFromPickToDrop = async (vehicleType) => {
    try {
      const cacheKey = `${location?.lat}-${location?.lng}-${dropDetails?.location?.lat}-${dropDetails?.location?.lng}-${vehicleType}`;
      if (travelDetailsCache.current[cacheKey]) {
        return travelDetailsCache.current[cacheKey];
      }

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

      travelDetailsCache.current[cacheKey] = newData;
      return newData;
    } catch (error) {
      console.error("Error calculating distance from pickup to drop:", error);
      return null;
    }
  };

  const handleCalculatePrices = (result, vehicleType, vehcilePrices) => {
    const { distance = "0.0 km", duration = 0 } = result || {};

    const [distanceValue] = distance?.split(" ").map(Number);

    const baseFare =
      vehcilePrices?.vehicleType === "scooty"
        ? +vehcilePrices?.baseFare || 5
        : +vehcilePrices?.baseFare * 1.14 || 10;

    const platFormPrice = +vehcilePrices?.platformFee;

    const price = calculateDistanceFare(
      distanceValue,
      baseFare,
      vehcilePrices,
      vehicleType
    );

    const timeFare = calculateTimeFare(duration, vehcilePrices);

    const isNightTime = checkNightTime();
    let finalPrice;
    const beforeNightSurgePrice = Math.ceil(price + timeFare + platFormPrice);

    if (isNightTime) {
      finalPrice = applyNightFare(beforeNightSurgePrice, vehcilePrices);
    } else {
      finalPrice = surgeFare(beforeNightSurgePrice, vehcilePrices);
    }

    // const finalPrice = isNightTime
    //   ? applyNightFare(price, timeFare, platFormPrice, baseFare)
    //   : Math.ceil(price + timeFare + baseFare + platFormPrice);

    return finalPrice;
  };

  const calculateDistanceFare = (
    distance,
    baseFare,
    vehcilePrices,
    vehicleType
  ) => {
    if (
      vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
    ) {
      console.log("distance", distance);

      if (distance <= 2) {
        return +vehcilePrices?.forTwoKm + baseFare - 5;
      }
      if (distance > 2 && distance <= 10) {
        return distance * +vehcilePrices?.twoToTenKmPrice + baseFare;
      }
      return distance * +vehcilePrices?.tenToHunderPrice + baseFare;
    } else if (
      vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
    ) {
      if (distance <= 2) {
        return +vehcilePrices?.forTwoKm + baseFare - 5;
      }
      if (distance > 2 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice + baseFare;
      }
      return distance * +vehcilePrices?.tenToHunderPrice + baseFare;
    } else if (
      vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
    ) {
      if (distance <= 2) {
        return +vehcilePrices?.forTwoKm + baseFare - 5;
      }
      if (distance > 2 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice + baseFare;
      }
      return distance * +vehcilePrices?.tenToHunderPrice + baseFare;
    } else if (
      vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
    ) {
      if (distance <= 2) {
        return +vehcilePrices?.forTwoKm + baseFare - 5;
      }
      if (distance > 2 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice + baseFare;
      }
      return distance * +vehcilePrices?.tenToHunderPrice + baseFare;
    } else if (
      vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
    ) {
      if (distance <= 2) {
        return +vehcilePrices?.forTwoKm + baseFare - 5;
      }
      if (distance > 2 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice + baseFare;
      }
      return distance * +vehcilePrices?.tenToHunderPrice + baseFare;
    } else if (
      vehcilePrices?.vehicleType?.toLowerCase() ===
        vehicleType?.toLowerCase() ||
      "bookany"
    ) {
      return 56;
    }

    // if (distance <= 2) {
    //   return 24 + baseFare - 5;
    // }
    // if (distance > 2 && distance <= 10) {
    //   return distance * +priceDetails?.twoToTenKmPrice + baseFare;
    // }
    // // if (distance > 5 && distance <= 10) {
    // //   return distance * 7.2 + baseFare;
    // // }
    // return distance * +priceDetails?.tenToHunderPrice + baseFare;
  };

  const calculateTimeFare = (duration, vehcilePrices) => {
    return +duration * +vehcilePrices?.timeFace;
  };

  const checkNightTime = () => {
    const currentHour = moment().tz("Asia/Kolkata").hour();
    return currentHour >= 23 || currentHour < 6;

    // return false
  };

  const applyNightFare = (beforeNightSurgePrice, vehcilePrices) => {
    // const totalPrice = Math.ceil(price + timeFare + platFormPrice, baseFare);
    const randomPerc = getRandomNightFare(vehcilePrices);
    const increasedAmount = Math.ceil(
      (randomPerc / 100) * beforeNightSurgePrice
    );
    return beforeNightSurgePrice + increasedAmount;
  };

  const surgeFare = (beforeNightSurgePrice, vehcilePrices) => {
    const randomPerc = getRandomSurgeFare(vehcilePrices);
    const increasedAmount = Math.ceil(
      (randomPerc / 100) * beforeNightSurgePrice
    );
    return beforeNightSurgePrice + increasedAmount;
  };

  const getRandomNightFare = (vehcilePrices) => {
    const [min, max] = vehcilePrices?.nightFarePercentage || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  };

  const getRandomSurgeFare = (vehcilePrices) => {
    const [min, max] = vehcilePrices?.surgePricePercentage || [0, 0];
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
    hasSoftwareNavigationBar,
  };
};
