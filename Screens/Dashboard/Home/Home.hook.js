import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { fetchNearbyPlaces } from "../../../Constants/displaylocationmap";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../../../redux/Features/Auth/ProfileSlice";
import { API } from "../../../Constants/url";
import Toast from "react-native-toast-message";
// import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { generateRandomMarkers } from "../../../Constants/generateMarkers";
import { setNearPlaces } from "../../../app/wor/features/ridebooking/home/redux/nearPlaceSlice";
import { fetchLocation } from "../../../redux/Features/Location/LocationSlice";

export const useHomeHook = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [fbToken, setFbToken] = useState("");
  const [captainMarkers, setCaptainMarkers] = useState([]);
  const [homeLocations, setHomeLocations] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);

  // const [nearByRandomItems, setNearByRandomItems] = useState([]);

  // console.log("home screen", token);

  const dispatch = useDispatch();

  const [activeOrder, setActiveOrder] = useState({});

  const onFetchActiveOrder = async () => {
    try {
      const response = await API.get("/user/active-ride", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setActiveOrder(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const onFetchHomeLocations = async () => {
    try {
      const homeLocs = await API.get("/auth/home-place", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("homeLocs.data?.home", homeLocs.data);
      setHomeLocations(homeLocs.data?.home);
      setWorkLocation(homeLocs.data?.work);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Get the Firebase token for the device
  // async function getToken() {
  //   const token = await messaging().getToken();
  //   console.log("Device FCM Token:", token);
  //   setFbToken(token);
  // }

  // const onAddedFbTokenToServer = async () => {
  //   try {
  //     await API.patch(
  //       "/auth/fbtoken",
  //       { fbtoken: fbToken },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     Toast.show({
  //       text1: "fb-token-added successfully",
  //       type: "success",
  //       position: "bottom",
  //     });
  //   } catch (error) {
  //     console.log(error?.response?.data?.message);
  //     Toast.show({
  //       text1: error?.response?.data?.message ?? "Failed to upload fbtoken",
  //       type: "error",
  //       position: "bottom",
  //     });
  //   }
  // };
  // useEffect(() => {
  //   fbToken && onAddedFbTokenToServer();
  // }, [fbToken]);

  useEffect(() => {
    async function allMix() {
      onFetchActiveOrder();
      onFetchHomeLocations();
      // await getToken();
    }
    allMix();
  }, []);

  useEffect(() => {
    // onFetchActiveOrder();
    dispatch(onProfileSection({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    (async () => {
      try {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Get the current location
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        }); // Update state with the location

        dispatch(fetchLocation());

        let nearbyPlaces = await fetchNearbyPlaces(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        dispatch(setNearPlaces(nearbyPlaces));
        setNearbyPlaces(nearbyPlaces);

        let [place] = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        // console.log("place", place);

        if (place) {
          setPlaceName(place.formattedAddress);
        } else {
          setPlaceName("Location not found");
        }
      } catch (error) {
        setErrorMsg(error.message || "Something went wrong");
      }
    })();
  }, []);

  const nearByRandomItems = useMemo(() => {
    if (nearbyPlaces.length === 0) return [];
    return [...nearbyPlaces].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [nearbyPlaces]);

  // console.log("favoritePlaces", favoritePlaces);
  // console.log("previos", previousOrders);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((res) => {
      console.log("Notification Response Received: ", res);
      const notification = res?.notification?.request?.content; // Main notification
      console.log("Notification Content: ", notification);

      const data = notification?.data; // Custom data
      console.log("Notification Data Received: ", data);
    });

    return () => {
      sub.remove();
    };
  }, []);

  useEffect(() => {
    if (location) {
      const markers = generateRandomMarkers(location);
      setCaptainMarkers(markers);
    }
  }, [location]);

  // console.log("homeLocations", homeLocations);

  return {
    location,
    nearByRandomItems,
    placeName, // based on coordinates to get own location
    nearbyPlaces, // based on coordinates to get near places
    activeOrder,
    captainMarkers,
    homeLocations,
    workLocation,
  };
};
