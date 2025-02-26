import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { getDistance } from "geolib";

export const useCheckLocation = () => {
  const [location, setLocation] = useState({});
  const [inRadiusLocation, setInRadiusLocation] = useState(false);

  const getUserLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        // alert("Location permission is required to use this feature.");
        return null;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      console.log("Retrieved user location:", { latitude, longitude });
      return { latitude, longitude };
    } catch (error) {
      console.error("Error getting location:", error);
    //   alert("Failed to retrieve your location. Please try again.");
      return null;
    }
  };

  const isUserWithinRange = (userLocation, cityCoordinates, radiusInKm) => {
    const distance = getDistance(
    //   { latitude: userLocation.latitude, longitude: userLocation.longitude }, // User's actual location
      { latitude: 12.9716, longitude: 77.5946 }, // User's actual location
      {
        latitude: cityCoordinates.latitude,
        longitude: cityCoordinates.longitude,
      }
    );
    // Convert distance to kilometers
    return distance / 1000 <= radiusInKm;
  };

  const checkUserLocation = async () => {
    try {
      // Step 1: Get the user's current location
      const userLocation = await getUserLocation();
      if (!userLocation) {
        // alert("Unable to retrieve your location.");
        return;
      }
      setLocation(userLocation);

      // Step 2: Define multiple zones
      const zones = [
        {
          name: "Hyderabad City Center",
          coordinates: { latitude: 17.385, longitude: 78.4867 },
          radius: 15,
        },
        {
          name: "Hyderabad Suburbs",
          coordinates: { latitude: 17.385, longitude: 78.4867 },
          radius: 30,
        },
        {
          name: "Hyderabad Outskirts",
          coordinates: { latitude: 17.385, longitude: 78.4867 },
          radius: 50,
        },
      ];

      // Step 3: Check which zone the user is in
      let isInZone = false;
      for (const zone of zones) {
        if (isUserWithinRange(userLocation, zone.coordinates, zone.radius)) {
          console.log(`User is within ${zone.name} (${zone.radius} km).`);
        //   alert(`You are within ${zone.name} (${zone.radius} km)!`);
          isInZone = true;
          setInRadiusLocation(true);
          break;
        }
      }

      if (!isInZone) {
        setInRadiusLocation(false);
        console.log("User is outside all defined zones.");
        // alert("You are outside the Greater Hyderabad Metropolitan Region.");
      }
    } catch (error) {
      setInRadiusLocation(false);
      console.error("Error:", error);
    //   alert("An error occurred while checking your location.");
    }
  };

  useEffect(() => {
    checkUserLocation();
  }, []);

  return {
    inRadiusLocation,
    getUserLocation,
    location
  };
};