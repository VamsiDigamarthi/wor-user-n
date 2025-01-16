import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeScreenServices from "../services/HomeScreenServices";
import { onProfileSection } from "../redux/profileSlice";
import messaging from "@react-native-firebase/messaging";
import { fetchNearbyPlaces } from "../../../../../../Constants/displaylocationmap";
import * as Location from "expo-location";
import { fetchLocation } from "../../../../../../redux/Features/Location/LocationSlice";
import { setNearPlaces } from "../redux/nearPlaceSlice";
export const useHomeScreenHook = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [fbToken, setFbToken] = useState("");
  const [captainMarkers, setCaptainMarkers] = useState([]);
  //   const [activeOrder, setActiveOrder] = useState({});

  const [favoritePlaces, setFavoritePlace] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  const handleFavoritePlaces = async () => {
    const data = await HomeScreenServices.onFetchFavoritePlaces(token);
    if (!data) return setFavoritePlace(null);
    setFavoritePlace(data);
  };

  const handlePreviousOrders = async () => {
    const data = await HomeScreenServices.fetchPreviousOrdersServ(token);
    if (!data) return setPreviousOrders(null);
    setPreviousOrders(data);
  };

  // fetch profile data
  useEffect(() => {
    dispatch(onProfileSection({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    async function allMix() {
      handleFavoritePlaces();
      handlePreviousOrders();
      await getToken();
    }
    allMix();
  }, []);

  // Get the Firebase token for the device
  async function getToken() {
    const token = await messaging().getToken();
    setFbToken(token);
  }

  useEffect(() => {
    fbToken && HomeScreenServices.onAddFbTokenToServer(token, fbToken);
  }, [fbToken]);

  useEffect(() => {
    if (location) {
      const markers = HomeScreenServices.generateRandomMarkers(location);
      setCaptainMarkers(markers);
    }
  }, [location]);

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
        setNearbyPlaces(nearbyPlaces);
        dispatch(setNearPlaces(nearbyPlaces));

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

  return {
    location,
    placeName,
    nearbyPlaces,
    favoritePlaces,
    previousOrders,
    captainMarkers,
  };
};
