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
import { clearHomeOrWorkPlace } from "../../selectdroplocation/redux/homePlaceType.slice";
import {
  setDisplayAadharModal,
  setDisplayMPinModal,
} from "../redux/initialModals";
import { rideHistoryAsyc } from "../../../DrawerScreens/RideHistory/rideHistory.slice";
import { fetchPriceDetails } from "../redux/priceDetailSlice";

import installations from "@react-native-firebase/installations";
import { supportChat } from "../redux/chatSlice";

// Split into smaller utility functions for readability
const useFirebaseToken = (token) => {
  const [fbToken, setFbToken] = useState("");
  const [fbInstallationId, setFbInstallationId] = useState("");

  useEffect(() => {
    // Fetch the Firebase token for the device
    const fetchFbToken = async () => {
      try {
        

        const apns = await messaging().getAPNSToken()

        console.log("apns ",apns);
        
        
        const token = await messaging().getToken();
        console.log(token, "fbtoken");
        
        const installationId = await installations().getId();

        setFbInstallationId(installationId);
        setFbToken(token);
      } catch (error) {
        console.log("fberror", error);

      } };
    fetchFbToken();
  }, []);

  useEffect(() => {
    if (fbToken && fbInstallationId) {
      HomeScreenServices.onAddFbTokenToServer(token, fbToken, fbInstallationId);
    }
  }, [fbToken, token, fbInstallationId]);

  return fbToken;
};

// Handles verification status checks
const useVerificationCheck = (profile) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile?.aadharCarVerificaation === null) {
      dispatch(setDisplayAadharModal(true));
    } else if (profile?.mpin === null) {
      dispatch(setDisplayMPinModal(true));
    }
  }, [profile, dispatch]);
};

// Handles device ID checks and redirects if mismatched
const useDeviceIdCheck = (token) => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkDeviceIdAndRedirect = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      const data = await checkDeviceId({ token, deviceId });
      if (!data.status && data.errorMsg === "device id not matched") {
        AsyncStorage.removeItem("token");
        navigation.navigate("AuthStack");
      }
    };
    checkDeviceIdAndRedirect();
  }, [token, navigation]);
};

// Fetches and manages location and nearby places
const useNearbyPlaces = (location) => {
  const dispatch = useDispatch();
  const [captainMarkers, setCaptainMarkers] = useState([]);

  useEffect(() => {
    const fetchNearby = async () => {
      if (location) {
        const markers = HomeScreenServices.generateRandomMarkers(location);
        setCaptainMarkers(markers);
        const nearbyPlaces = await fetchNearbyPlaces(
          location.lat,
          location.lng
        );
        await dispatch(setNearPlaces(nearbyPlaces)).payload;
      }
    };
    fetchNearby();
  }, [location, dispatch]);

  return captainMarkers;
};

// Fetches pending order rating and manages rating modal
const usePendingOrderRating = (token) => {
  const [penRatOrderIdCaptainId, setPenRatOrderIdCaptainID] = useState(null);
  const [openRatingModal, setOpenRatingModal] = useState(false);

  const fetchPendingOrderRating = async () => {
    const data = await onFetchRideRating({ token });
    console.log("rating, data", data);

    if (data) {
      setOpenRatingModal(true);
      setPenRatOrderIdCaptainID(data);
    }
  };

  const handleCloseRatModAndUpdRatNotGivenToserver = async () => {
    setOpenRatingModal(false);
    await ratingNotGivenByUser({
      token,
      orderId: penRatOrderIdCaptainId?.orderId,
    });
  };

  return {
    openRatingModal,
    setOpenRatingModal,
    handleCloseRatModAndUpdRatNotGivenToserver,
    penRatOrderIdCaptainId,
    fetchPendingOrderRating,
  };
};

export const useHomeScreenHook = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const { location } = useSelector((state) => state.location);
  const { nearPlaces } = useSelector((state) => state.nearPlaces);

  // Firebase token management
  useFirebaseToken(token);

  // Check device ID
  useDeviceIdCheck(token);

  // Fetch location, profile, and home place
  useEffect(() => {
    dispatch(fetchLocation());
    dispatch(onProfileSection({ token }));
    dispatch(homePlace({ token }));
    dispatch(supportChat({ token }));
  }, [dispatch, token]);

  // Fetch nearby places
  const captainMarkers = useNearbyPlaces(location);

  // Randomly select nearby items
  const nearByRandomItems = useMemo(() => {
    if (nearPlaces.length === 0) return [];
    return [...nearPlaces].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [nearPlaces]);

  // Pending order rating management
  const {
    openRatingModal,
    setOpenRatingModal,
    handleCloseRatModAndUpdRatNotGivenToserver,
    penRatOrderIdCaptainId,
    fetchPendingOrderRating,
  } = usePendingOrderRating(token);

  useEffect(() => {
    if (isFocused) {
      // console.log("============", isFocused);

      dispatch(clearDropData());
      fetchPendingOrderRating();
      dispatch(clearHomeOrWorkPlace());
      dispatch(rideHistoryAsyc({ token }));
      dispatch(fetchPriceDetails({}));
    }
  }, [isFocused, dispatch]);

  useVerificationCheck(profile);

  return {
    captainMarkers,
    nearByRandomItems,
    openRatingModal,
    setOpenRatingModal,
    handleCloseRatModAndUpdRatNotGivenToserver,
    penRatOrderIdCaptainId,
  };
};
