import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { fetchNearbyPlaces } from "../../../Constants/displaylocationmap";
import { useNavigation } from "@react-navigation/native";

export const useHomeHook = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

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

  useEffect(() => {
    if (placeName) {
      // Update the app bar title using setOptions when placeName changes
      navigation.setOptions({
        title: placeName || "Women Rider", // Dynamically update the title
      });
    }
  }, [placeName, navigation]);

  return {
    location,
    nearbyPlaces,
    placeName,
  };
};
