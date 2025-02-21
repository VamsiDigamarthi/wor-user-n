import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentMethod,
  setPrice,
} from "../../sharedLogics/rideDetailsSlice";
import { vehicles } from "../vehicleData";
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

          const newPrice = handleCalculatePrices(result, vehicle?.vehicleType);

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
    // distance = 0.4 km this is formate
    const checkDistance = result?.distance?.split(" ");
    const duration = result?.duration;

    let price;
    if (checkDistance[0] <= 2) {
      price = 24 + +priceDetails?.baseFare - 5;
    } else {
      if (checkDistance[0] > 2 && checkDistance[0] <= 10) {
        if (checkDistance[0] <= 5) {
          price = +checkDistance[0] * 7.2 + +priceDetails?.baseFare - 5;
        } else {
          price = +checkDistance[0] * 7.2 + +priceDetails?.baseFare;
        }
      } else {
        price = +checkDistance[0] * 8.2 + +priceDetails?.baseFare;
      }
    }

    let timeFare = +duration * 0.5;
    return Math.ceil(price + timeFare + +priceDetails?.platformFee);
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
