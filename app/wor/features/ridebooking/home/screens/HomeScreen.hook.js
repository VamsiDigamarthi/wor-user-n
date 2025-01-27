import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeScreenServices from "../services/HomeScreenServices";
import { onProfileSection } from "../redux/profileSlice";
import messaging from "@react-native-firebase/messaging";
import { fetchNearbyPlaces } from "../../../../../../Constants/displaylocationmap";
import { fetchLocation } from "../../../../../../redux/Features/Location/LocationSlice";
import { setNearPlaces } from "../redux/nearPlaceSlice";
import { homePlace } from "../redux/homePlace";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { clearDropData } from "../../sharedLogics/rideDetailsSlice";
export const useHomeScreenHook = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { location } = useSelector((state) => state.location);
  const { nearPlaces } = useSelector((state) => state.nearPlaces);
  const [fbToken, setFbToken] = useState("");
  const [captainMarkers, setCaptainMarkers] = useState([]);

  // fetch profile data
  useEffect(() => {
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
    console.log("firebase token" ,token);
    
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

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("state", (e) => {
  //     const { routes } = e.data.state; // Get the current routes in the stack
  //     console.log(routes);
  //     const isScreenInStack = routes.some((route) => route.name === "Home");
  //     if (isScreenInStack) {
  //       dispatch(clearDropData());
  //     }
  //     setCleanReduxData(isScreenInStack);
  //   });

  //   return unsubscribe; // Cleanup on unmount
  // }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      dispatch(clearDropData());
    }
  }, [isFocused]);

  return {
    captainMarkers,
    nearByRandomItems,
  };
};
