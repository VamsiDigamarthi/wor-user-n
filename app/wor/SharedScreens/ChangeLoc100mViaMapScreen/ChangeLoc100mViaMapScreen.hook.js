import { useNavigation } from "@react-navigation/native";
import { computeDestinationPoint, getCompassDirection, getDistance } from "geolib";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNameAndVicinity } from "../../../../Constants/displaylocationmap";
import {
  setDropDetails,
  setPickUpDetails,
} from "../../features/ridebooking/sharedLogics/rideDetailsSlice";

// Function to generate dashed circle coordinates
const generateDashedCircleCoordinates = (lat, lng, radius, numberOfDashes) => {
  const dashes = [];
  const angleIncrement = (2 * Math.PI) / numberOfDashes;

  for (let i = 0; i < numberOfDashes; i++) {
    const startAngle = i * angleIncrement;
    const endAngle = startAngle + angleIncrement / 2;

    const startLat = lat + (radius / 111320) * Math.cos(startAngle);
    const startLng =
      lng +
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
        Math.sin(startAngle);

    const endLat = lat + (radius / 111320) * Math.cos(endAngle);
    const endLng =
      lng +
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
        Math.sin(endAngle);

    dashes.push([
      { latitude: startLat, longitude: startLng },
      { latitude: endLat, longitude: endLng },
    ]);
  }

  return dashes;
};

// Restricts marker movement within 100 meters
const limitMarkerToCircle = (lat, lng, newLat, newLng, radius) => {
  const distance = getDistance(
    { latitude: lat, longitude: lng },
    { latitude: newLat, longitude: newLng }
  );

  if (distance <= radius) {
    return { latitude: newLat, longitude: newLng };
  } else {
    const angle = Math.atan2(newLng - lng, newLat - lat);
    const limitedPosition = computeDestinationPoint(
      { latitude: lat, longitude: lng },
      radius,
      (angle * 180) / Math.PI
    );
    return {
      latitude: limitedPosition.latitude,
      longitude: limitedPosition.longitude,
    };
  }
};

export const useChangeLoc100mViaMapScreenHook = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { location, placeName: pick, placeVicinity } = useSelector((state) => state.location);
  const { initialDropDetails, isBeforeBook } = useSelector((state) => state.allRideDetails);
  const { profile } = useSelector((state) => state.profileSlice);

  const { lat, lng } = isBeforeBook ? location : initialDropDetails?.location || {};

  const dashedCircleCoordinates = generateDashedCircleCoordinates(lat, lng, 100, 60);
  const [newMarker, setNewMarker] = useState({ latitude: lat, longitude: lng });

  // If changed, update location name
  const [placeName, setPlaceName] = useState({
    placeName: isBeforeBook ? pick : initialDropDetails?.name,
    placeVicinity: isBeforeBook ? placeVicinity : initialDropDetails?.vicinity,
  });

  // Ride booking state
  const [rideBookBeforeCheckMPinAddhar, setRideBookBeforeCheckPinAddhar] = useState(false);
  const onChangeRideBookBeforeCheckPinAddharHandler = () => {
    setRideBookBeforeCheckPinAddhar(!rideBookBeforeCheckMPinAddhar);
  };

  const [isOpenEnterConfirmMPinModal, setIsOpenEnterConfirmMPinModal] = useState(false);
  const onOpenIsEnterConfirmPinModal = () => {
    setIsOpenEnterConfirmMPinModal(!isOpenEnterConfirmMPinModal);
  };

  // Function to handle the drag end of the marker
  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const validPosition = limitMarkerToCircle(lat, lng, latitude, longitude, 100);
    setNewMarker(validPosition);
  };

  useEffect(() => {
    const fetchNewPlaceName = async () => {
      const data = await fetchNameAndVicinity(newMarker.latitude, newMarker.longitude);
      dispatch(
        setPickUpDetails({
          location: { lat: newMarker.latitude, lng: newMarker.longitude },
          name: data?.name,
          vicinity: data?.vicinity,
        })
      );
      setPlaceName({ placeName: data?.name, placeVicinity: data?.vicinity });
    };
    fetchNewPlaceName();
  }, [newMarker]);

  const onNavigateSavedAddressScreen = () => {
    if (isBeforeBook) {
      handleCheckMPinSetOrNot();
    } else {
      let place = {
        name: placeName?.placeName,
        vicinity: placeName?.placeVicinity,
        location: { lat: newMarker.latitude, lng: newMarker.longitude },
      };
      dispatch(setDropDetails(place));
      navigation.navigate("ParSavedUsers");
    }
  };

  const handleCheckMPinSetOrNot = () => {
    if (profile?.mpin === null || profile?.aadharCarVerificaation === null) {
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
    isBeforeBook,
    newMarker,
    placeName,
    rideBookBeforeCheckMPinAddhar,
    onChangeRideBookBeforeCheckPinAddharHandler,
    isOpenEnterConfirmMPinModal,
    onOpenIsEnterConfirmPinModal,
    dashedCircleCoordinates,
    lat,
    lng,
  };
};
