import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

export const usePoliceStationMapCardHook = () => {
  const route = useRoute();
  const { location } = useSelector((state) => state.location);
  const { singlePoliceStation, presentUserCoordinates } = route.params || {};
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [directionKey, setDirectionKey] = useState(0);
  const lastDirectionUpdateRef = useRef(Date.now());
  const pendingUpdateRef = useRef(false);

  // Static coordinates for the police station
  const [policeStationCoordinates, setPoliceStationCoordinates] = useState({
    latitude: singlePoliceStation?.geometry?.location?.lat || 0,
    longitude: singlePoliceStation?.geometry?.location?.lng || 0,
  });

  // User's live coordinates that update frequently
  const [userCoordinates, setUserCoordinates] = useState({
    latitude: presentUserCoordinates?.lat || 0,
    longitude: presentUserCoordinates?.lng || 0,
    heading: 0,
  });

  const googleMapsApiKey = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8";

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const updateDirections = () => {
    const now = Date.now();
    // Only update directions if minimum time has passed since last update
    if (now - lastDirectionUpdateRef.current > 2000) {
      // 2 seconds minimum between updates
      setDirectionKey((prevKey) => prevKey + 1);
      lastDirectionUpdateRef.current = now;
      pendingUpdateRef.current = false;
    } else if (!pendingUpdateRef.current) {
      // Schedule an update if one isn't already pending
      pendingUpdateRef.current = true;
      setTimeout(() => {
        if (pendingUpdateRef.current) {
          setDirectionKey((prevKey) => prevKey + 1);
          lastDirectionUpdateRef.current = Date.now();
          pendingUpdateRef.current = false;
        }
      }, 2000 - (now - lastDirectionUpdateRef.current));
    }
  };

  const fetchLiveCoordinatedFromUser = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let currentLocation = await Location.getCurrentPositionAsync({});

      const newCoordinate = {
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
        heading: currentLocation?.coords?.heading,
      };

      // Check if location has moved significantly (more than 10 meters)
      const distanceMoved = calculateDistance(
        userCoordinates.latitude,
        userCoordinates.longitude,
        newCoordinate.latitude,
        newCoordinate.longitude
      );

      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 2000);
      }

      setUserCoordinates(newCoordinate);

      // Update direction line if moved more than threshold distance
      if (distanceMoved > 10) {
        // 10 meters threshold
        updateDirections();
      }
    } catch (error) {
      console.error("Error fetching live location:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLiveCoordinatedFromUser();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [location]);

  return {
    singlePoliceStation,
    polylineCoordinates,
    userCoordinates,
    policeStationCoordinates,
    directionKey,
    location,
    googleMapsApiKey,
    mapRef,
    markerRef,
  };
};
