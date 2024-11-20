import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { fetchNearbyPlaces } from "../../../Constants/displaylocationmap";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "../../../redux/Features/Auth/ProfileSlice";
import { API } from "../../../Constants/url";

export const useHomeHook = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  // const [nearByRandomItems, setNearByRandomItems] = useState([]);

  console.log("home screen", token);

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
      // console.log(response);
      setActiveOrder(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    onFetchActiveOrder();
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

        let nearbyPlaces = await fetchNearbyPlaces(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
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

  // useEffect(() => {
  //   const shuffledItems = [...nearbyPlaces].sort(() => 0.5 - Math.random());
  //   setNearByRandomItems(shuffledItems.slice(0, 3));
  // }, [nearbyPlaces]);

  const nearByRandomItems = useMemo(() => {
    if (nearbyPlaces.length === 0) return [];
    return [...nearbyPlaces].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [nearbyPlaces]);

  return {
    location,
    nearByRandomItems,
    placeName, // based on coordinates to get own location
    nearbyPlaces, // based on coordinates to get near places
    activeOrder,
  };
};
