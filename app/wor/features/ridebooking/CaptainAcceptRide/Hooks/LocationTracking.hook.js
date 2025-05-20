import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocationTracking = (
  orderId,
  socket,
  isConnected,
  isLiveTrackingEnabled
) => {
  const locationRef = useRef({ lat: null, lng: null });
  const coordinatesFetchedRef = useRef(false);
  const [isFocused, setIsFocused] = useState(false);

  const onFetchLiveLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const currentLocation = await Location.getCurrentPositionAsync({});
      const newLocation = {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      };

      locationRef.current = newLocation;
      coordinatesFetchedRef.current = true;
    } catch (error) {
      console.error("Error fetching live location:", error);
    }
  };

  useEffect(() => {
    // console.log("000000000000000000", isLiveTrackingEnabled);
    // console.log("orderId ---------------", orderId);

    if (isLiveTrackingEnabled && isFocused) {
      const locationInterval = setInterval(() => {
        onFetchLiveLocation();
        if (coordinatesFetchedRef.current && isConnected) {
          socket.emit("parent-send-live-tracking", {
            orderId,
            coordinates: {
              lat: locationRef.current.lat,
              lng: locationRef.current.lng,
            },
          });
          console.log("---- live coordinates---");
        }
      }, 5000);

      return () => clearInterval(locationInterval);
    }
  }, [isLiveTrackingEnabled, isFocused, socket, isConnected, orderId]);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
        coordinatesFetchedRef.current = false;
      };
    }, [])
  );

  return { locationRef, coordinatesFetchedRef };
};
