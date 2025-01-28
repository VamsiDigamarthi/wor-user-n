import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeScreenServices, {
  checkDeviceId,
  onFetchRideRating,
  ratingNotGivenByUser,
} from "../services/HomeScreenServices";
import { onProfileSection } from "../redux/profileSlice";
import messaging from "@react-native-firebase/messaging";
import { fetchNearbyPlaces } from "../../../../../../Constants/displaylocationmap";
import { fetchLocation } from "../../../../../../redux/Features/Location/LocationSlice";
import { setNearPlaces } from "../redux/nearPlaceSlice";
import { homePlace } from "../redux/homePlace";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { clearDropData } from "../../sharedLogics/rideDetailsSlice";
import DeviceInfo from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useHomeScreenHook = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);
  const { location } = useSelector((state) => state.location);
  const { nearPlaces } = useSelector((state) => state.nearPlaces);
  const [fbToken, setFbToken] = useState("");
  const [captainMarkers, setCaptainMarkers] = useState([]);

  const [penRatOrderIdCaptainId, setPenRatOrderIdCaptainID] = useState(null);
  const [openRatingModal, setOpenRatingModal] = useState(false);

  const handleCloseRatModAndUpdRatNotGivenToserver = async () => {
    setOpenRatingModal(false);
    await ratingNotGivenByUser({
      token,
      orderId: penRatOrderIdCaptainId?.orderId,
    });
  };

  const handleCheckDeviceId = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const data = await checkDeviceId({ token, deviceId });
    if (!data.status && data.errorMsg === "device id not matched") {
      AsyncStorage.removeItem("token");
      navigation.navigate("AuthStack");
    }
  };

  // fetch profile data
  useEffect(() => {
    handleCheckDeviceId();
    dispatch(fetchLocation());
    dispatch(onProfileSection({ token }));
    dispatch(homePlace({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    async function allMix() {
      await getToken();
    }
    allMix();
  }, []);

  // Get the Firebase token for the device
  async function getToken() {
    const token = await messaging().getToken();
    // console.log("firebase token", token);
    setFbToken(token);
  }

  useEffect(() => {
    fbToken && HomeScreenServices.onAddFbTokenToServer(token, fbToken);
  }, [fbToken]);

  useEffect(() => {
    const onFetchNearPlaces = async () => {
      const markers = HomeScreenServices.generateRandomMarkers(location);
      setCaptainMarkers(markers);
      let nearbyPlaces = await fetchNearbyPlaces(location.lat, location.lng);
      dispatch(setNearPlaces(nearbyPlaces));
    };

    location && onFetchNearPlaces();
  }, [location]);

  const nearByRandomItems = useMemo(() => {
    if (nearPlaces.length === 0) return [];
    return [...nearPlaces].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [nearPlaces]);

  const fetchPendingOrderRating = async () => {
    const data = await onFetchRideRating({ token });

    if (data) {
      setOpenRatingModal(true);
      setPenRatOrderIdCaptainID(data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(clearDropData());
      fetchPendingOrderRating();
    }
  }, [isFocused]);

  return {
    captainMarkers,
    nearByRandomItems,
    // rating modal states
    openRatingModal,
    setOpenRatingModal,
    handleCloseRatModAndUpdRatNotGivenToserver,
    penRatOrderIdCaptainId,
  };
};
