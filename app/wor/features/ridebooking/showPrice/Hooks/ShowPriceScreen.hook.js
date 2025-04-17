import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBaseCharges,
  setBasefareSet,
  setDistanceFromPickUpToDrop,
  setDistnaceValue,
  setDistnaceValueSet,
  setDuration,
  setHowManyMens,
  setPaymentMethod,
  setPlatFormValue,
  setPlatFormValueSet,
  setPrice,
  setRandomExtraCharge,
  setRandomExtraChrgesWithVehicle,
  setSurgeValue,
  setSurgeValueSet,
  setTimeFareValue,
  setTimeFareValueSet,
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

  const calDisFromPickToDrop = async (vehicleType) => {
    // console.log("vehicleType", vehicleType);

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

  const calcPriceDetails = async () => {
    try {
      // Fetch travel details for all vehicles in parallel
      const travelDetails = await Promise.all(
        vehicles.map(async (vehicle) => {
          const result = await calDisFromPickToDrop(vehicle.vehicleType);
          return {
            ...vehicle,
            distance: result?.distance || 0,
            duration: result?.duration || 0,
          };
        })
      );

      dispatch(
        setDistanceFromPickUpToDrop(
          travelDetails?.[0]?.distance?.split(" ")?.[0]
        )
      );

      // Calculate prices for all vehicles
      const results = travelDetails.map((vehicle) => {
        let vehcilePrices = priceDetails?.find(
          (priceDe) =>
            priceDe.vehicleType?.toLowerCase() ===
            vehicle.vehicleType?.toLowerCase()
        );

        let newPrice = handleCalculatePrices(
          vehicle,
          vehicle.vehicleType,
          vehcilePrices
        );
        console.log("newPrice", newPrice);

        if (profile?.donationActive) {
          newPrice = newPrice + 2;
        }

        if (
          selectedVehicleType?.toLowerCase() ===
          vehicle.vehicleType?.toLowerCase()
        ) {
          dispatch(setPrice(newPrice));
          dispatch(setDuration(vehicle?.duration));

          let paymentMethod =
            +newPrice >= +profile?.userWalletBalance ? "cash" : "wallet";
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
          console.log("profile?.donationActive", profile?.donationActive);

          if (profile?.donationActive) {
            carPrice && worPremiumPrice
              ? `${carPrice + 2}-${worPremiumPrice + 2}`
              : "N/A";
          }

          if (selectedVehicleType?.toLowerCase() === "bookany") {
            dispatch(setPrice(price));
            let paymentMethod =
              +worPremiumPrice >= +profile?.userWalletBalance
                ? "cash"
                : "wallet";

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

  const handleCalBaseFare = ({ vehicleType, distance, newBaseFare }) => {
    if (vehicleType?.toLowerCase() === "scooty") {
      if (distance <= 2) {
        return 0;
      } else if (distance > 2 && distance <= 10) {
        return newBaseFare;
      }
      return newBaseFare;
    } else if (vehicleType?.toLowerCase() === "car") {
      if (distance <= 4) {
        return 0;
      } else if (distance > 4 && distance <= 20) {
        return newBaseFare;
      }
      return newBaseFare;
    } else if (vehicleType?.toLowerCase() === "wor-premium") {
      if (distance <= 4) {
        return 0;
      } else if (distance > 4 && distance <= 20) {
        return newBaseFare;
      }
      return newBaseFare;
    } else if (vehicleType?.toLowerCase() === "promax") {
      if (distance <= 4) {
        return 0;
      } else if (distance > 4 && distance <= 20) {
        return newBaseFare;
      }
      return newBaseFare;
    } else if (vehicleType?.toLowerCase() || "bookany") {
      if (distance <= 4) {
        return 0;
      } else if (distance > 4 && distance <= 20) {
        return newBaseFare;
      }
      return newBaseFare;
    }
  };

  const handleCalculatePrices = (result, vehicleType, vehcilePrices) => {
    const { distance = "0.0 km", duration = 0 } = result || {};

    const [distanceValue] = distance?.split(" ").map(Number);
    // console.log("distanceValue", distanceValue);
    // console.log("duration", duration);

    const baseFare = handleCalBaseFare({
      vehicleType,
      distance: distanceValue,
      newBaseFare:
        vehcilePrices?.vehicleType === "scooty"
          ? +vehcilePrices?.baseFare
          : +vehcilePrices?.baseFare * 1.14 || 10,
    });

    console.log("baseFare----", baseFare);

    const platFormPrice = +vehcilePrices?.platformFee;
    console.log("platFormPrice", platFormPrice);

    const price = calculateDistanceFare(
      distanceValue,
      vehcilePrices,
      vehicleType
    );
    console.log("price", price);

    const timeFare = calculateTimeFare(duration, vehcilePrices);

    const otherCharges = otherServicesCharges(vehcilePrices);
    console.log("otherCharges", otherCharges);

    if (selectedVehicleType?.toLowerCase() === vehicleType?.toLowerCase()) {
      dispatch(setRandomExtraCharge(otherCharges));
      dispatch(setBaseCharges(baseFare));
      dispatch(setTimeFareValue(timeFare));
      dispatch(setPlatFormValue(platFormPrice));
      dispatch(setDistnaceValue(price));
    }

    dispatch(
      setRandomExtraChrgesWithVehicle({
        vehicleType: vehicleType?.toLowerCase(),
        otherCharges,
      })
    );

    dispatch(
      setBasefareSet({
        vehicleType: vehicleType?.toLowerCase(),
        baseFare,
      })
    );

    dispatch(
      setTimeFareValueSet({
        vehicleType: vehicleType?.toLowerCase(),
        timeFare,
      })
    );

    dispatch(
      setPlatFormValueSet({
        vehicleType: vehicleType?.toLowerCase(),
        platFormPrice,
      })
    );

    dispatch(
      setDistnaceValueSet({
        vehicleType: vehicleType?.toLowerCase(),
        price,
      })
    );

    const isNightTime = checkNightTime();
    let finalPrice;

    let previousCalcFees = profile?.cancelCharges ?? 0;
    const beforeNightSurgePrice = Math.ceil(
      price +
        timeFare +
        platFormPrice +
        baseFare +
        otherCharges +
        +previousCalcFees
    );

    console.log("beforeNightSurgePrice", beforeNightSurgePrice);

    if (isNightTime) {
      finalPrice = applyNightFare(beforeNightSurgePrice, vehcilePrices);
    } else {
      if (
        vehcilePrices?.vehicleType?.toLowerCase() === "car" ||
        vehcilePrices?.vehicleType?.toLowerCase() === "wor-premium" ||
        vehcilePrices?.vehicleType?.toLowerCase() === "promax" ||
        vehcilePrices?.vehicleType?.toLowerCase() === "bookany"
      ) {
        finalPrice = beforeNightSurgePrice;
      } else {
        finalPrice = surgeFare(
          beforeNightSurgePrice,
          vehcilePrices,
          vehicleType
        );
      }
    }

    return finalPrice;
  };

  const calculateDistanceFare = (distance, vehcilePrices, vehicleType) => {
    if (vehcilePrices?.vehicleType?.toLowerCase() === "scooty") {
      if (distance <= 2) {
        return +vehcilePrices?.forTwoKm;
      } else if (distance > 2 && distance <= 10) {
        return distance * +vehcilePrices?.twoToTenKmPrice;
      }
      return distance * +vehcilePrices?.tenToHunderPrice;
    } else if (vehcilePrices?.vehicleType?.toLowerCase() === "car") {
      if (distance <= 4) {
        return +vehcilePrices?.forTwoKm;
      } else if (distance > 4 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice;
      }
      return distance * +vehcilePrices?.tenToHunderPrice;
    } else if (vehcilePrices?.vehicleType?.toLowerCase() === "wor-premium") {
      if (distance <= 4) {
        return +vehcilePrices?.forTwoKm;
      } else if (distance > 4 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice;
      }
      return distance * +vehcilePrices?.tenToHunderPrice;
    } else if (vehcilePrices?.vehicleType?.toLowerCase() === "promax") {
      if (distance <= 4) {
        return +vehcilePrices?.forTwoKm;
      } else if (distance > 4 && distance <= 20) {
        return distance * +vehcilePrices?.twoToTenKmPrice;
      }
      return distance * +vehcilePrices?.tenToHunderPrice;
    }
    //  else if (
    //   vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
    // ) {
    //   if (distance <= 2) {
    //     return +vehcilePrices?.forTwoKm;
    //   }
    //   if (distance > 2 && distance <= 20) {
    //     return distance * +vehcilePrices?.twoToTenKmPrice;
    //   }
    //   return distance * +vehcilePrices?.tenToHunderPrice;
    // }
    else if (
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
    console.log("--timfare---", +(+duration * +vehcilePrices?.timeFace));

    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
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

  const surgeFare = (beforeNightSurgePrice, vehcilePrices, vehicleType) => {
    const randomPerc = getRandomSurgeFare(vehcilePrices);
    console.log("randomPerc--", randomPerc);

    const increasedAmount = Math.ceil(
      (randomPerc / 100) * beforeNightSurgePrice
    );

    if (selectedVehicleType?.toLowerCase() === vehicleType?.toLowerCase()) {
      dispatch(setSurgeValue(increasedAmount));
    }

    dispatch(
      setSurgeValueSet({
        vehicleType: vehicleType?.toLowerCase(),
        surgeValue: increasedAmount,
      })
    );

    console.log("increasedAmount", increasedAmount);

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

  const otherServicesCharges = (vehcilePrices) => {
    const [min, max] = vehcilePrices?.otherServices || [0, 0];
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
