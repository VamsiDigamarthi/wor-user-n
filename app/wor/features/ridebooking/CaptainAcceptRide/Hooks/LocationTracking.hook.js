// useLocationTracking.js
import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";

export const useLocationTracking = (
  orderId,
  socket,
  isConnected,
  isLiveTrackingEnabled
) => {
  const locationRef = useRef({ lat: null, lng: null });
  const coordinatesFetchedRef = useRef(false); // Using ref to store the latest value of coordinatesFetched
  const [isFocused, setIsFocused] = useState(false); // Track screen focus state

  // Live location fetching logic
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
        }
      }, 5000);

      return () => clearInterval(locationInterval);
    }
  }, [isLiveTrackingEnabled, isFocused, socket, isConnected, orderId]);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false); // Stop fetching and sending coordinates when the screen is unfocused
        coordinatesFetchedRef.current = false; // Reset coordinatesFetched in the ref
      };
    }, [])
  );

  return { locationRef, coordinatesFetchedRef };
};
