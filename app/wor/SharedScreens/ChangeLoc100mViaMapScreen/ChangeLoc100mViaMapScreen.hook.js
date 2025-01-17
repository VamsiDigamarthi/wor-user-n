import { useNavigation, useRoute } from "@react-navigation/native";
import { computeDestinationPoint } from "geolib";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { haversineDistance } from "../../../../Constants/calculateKM";
import { fetchNameAndVicinity } from "../../../../Constants/displaylocationmap";

export const useChangeLoc100mViaMapScreenHook = () => {
  const navigation = useNavigation();
  const {
    place,
    isPickLocationFromParc = false,
    parcelDetails,
    selectedCard,
    // ride booking props
    isRideBookingScreen = false,
    rideDropDetails,
    selectedVehicle,
    time,
    ridePrice,
  } = useRoute().params || {};

  const { profile } = useSelector((state) => state.profileSlice);
  const { token } = useSelector((state) => state.token);

  const { lat, lng } = place?.location || {};
  const [price, setPrice] = useState(0);
  const [howManyMans, setHowManyMans] = useState(0);

  const [newMarker, setNewMarker] = useState({ latitude: lat, longitude: lng });
  // if change location 100 meter new coordinates place name stored in this state
  const [placeName, setPlaceName] = useState({
    placeName: place?.name,
    placeVicinity: place?.vicinity,
  });

  // ride booking state
  const [rideBookBeforeCheckMPinAddhar, setRideBookBeforeCheckPinAddhar] =
    useState(false);
  const onChangeRideBookBeforeCheckPinAddharHandler = () => {
    setRideBookBeforeCheckPinAddhar(!rideBookBeforeCheckMPinAddhar);
  };

  const [isOpenEnterConfirmMPinModal, setIsOpenEnterConfirmMPinModal] =
    useState(false);

  const onOpenIsEnterConfirmPinModal = () => {
    setIsOpenEnterConfirmMPinModal(!isOpenEnterConfirmMPinModal);
  };

  // Function to handle the drag end of the marker
  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const distance = getDistanceFromLatLonInKm(lat, lng, latitude, longitude);

    // Only update the marker if it's within the 100-meter radius (0.1 km)
    if (distance <= 0.1) {
      setNewMarker({ latitude, longitude });
    } else {
      const newPosition = computeDestinationPoint(
        { latitude: lat, longitude: lng },
        100, // 100 meters
        getCompassDirection(
          { latitude: lat, longitude: lng },
          { latitude, longitude }
        )
      );

      setNewMarker({
        latitude: newPosition.latitude,
        longitude: newPosition.longitude,
      });
    }
  };

  useEffect(() => {
    const fetchNewPlaceName = async () => {
      const data = await fetchNameAndVicinity(
        newMarker.latitude,
        newMarker.longitude
      );
      setPlaceName({ placeName: data?.name, placeVicinity: data?.vicinity });
    };
    lat !== newMarker.latitude && fetchNewPlaceName();
  }, [newMarker]);

  useEffect(() => {
    if (parcelDetails) {
      const distance = haversineDistance(
        place?.location,
        parcelDetails?.location
      );
      let fixedDis = (distance * 7).toFixed(0);
      setPrice(fixedDis); // Assume price per 100 meters is $10
    }
  }, [parcelDetails]);

  const onNavigateSavedAddressScreen = () => {
    // places the order
    if (isPickLocationFromParc || isRideBookingScreen) {
      //   handleBookingParcelRide();
      // } else if (isRideBookingScreen) {
      handleCheckMPinSetOrNot();
    } else {
      navigation.navigate("ParSavedUsers", {
        place: {
          name: placeName?.placeName,
          vicinity: placeName?.placeVicinity,
          location: { lat: newMarker.latitude, lng: newMarker.longitude },
        },
      });
    }
  };

  const handleCheckMPinSetOrNot = () => {
    if (profile?.mpin === null || profile?.adhar === null) {
      onChangeRideBookBeforeCheckPinAddharHandler();
      return;
    }

    if (!isOpenEnterConfirmMPinModal) {
      onOpenIsEnterConfirmPinModal();
      return;
    }
  };

  return {
    onNavigateSavedAddressScreen,
    handleMarkerDragEnd,
    isPickLocationFromParc,
    newMarker,
    lat,
    lng,
    place,
    placeName,
    selectedCard,
    parcelDetails,
    // ride booking states
    isRideBookingScreen,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
    rideDropDetails,
    selectedVehicle,
    time,
    ridePrice,
    price,
    howManyMans,
    setHowManyMans,
  };
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};
