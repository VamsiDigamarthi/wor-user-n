import { useEffect, useMemo, useState } from "react";
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
  const { location } = useSelector((state) => state.location);
  const { nearPlaces } = useSelector((state) => state.nearPlaces);
  const [fbToken, setFbToken] = useState("");
  const [captainMarkers, setCaptainMarkers] = useState([]);

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
    dispatch(fetchLocation());
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

  return {
    favoritePlaces,
    previousOrders,
    captainMarkers,
    nearByRandomItems,
  };
};
