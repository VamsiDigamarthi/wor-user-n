import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";

const App = () => {
  const [location, setLocation] = useState({});
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    checkUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return null;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      return { latitude, longitude };
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  };

  const isUserWithinRange = (userLocation, cityCoordinates, radiusInKm) => {
    const distance = getDistance(
      //   { latitude: userLocation.latitude, longitude: userLocation.longitude }, 17.2575522,78.3465053
      { latitude: 17.2575522, longitude: 78.3465053 },
      {
        latitude: cityCoordinates.latitude,
        longitude: cityCoordinates.longitude,
      }
    );

    // Convert distance to kilometers
    return distance / 1000 <= radiusInKm;
  };

  //   const checkUserLocation = async () => {
  //     try {
  //       // Step 1: Get the user's current location
  //       const userLocation = await getUserLocation();
  //       if (!userLocation) {
  //         alert('Unable to retrieve your location.');
  //         return;
  //       }
  //       setLocation(userLocation);

  //       // Step 2: Define multiple zones
  //       const zones = [
  //         { name: "Hyderabad City Center", coordinates: { latitude: 17.3850, longitude: 78.4867 }, radius: 25 },
  //         { name: "Medchal", coordinates: { latitude: 17.6090, longitude: 78.5480 }, radius: 15 },
  //         { name: "Malkajgiri", coordinates: { latitude: 17.4800, longitude: 78.5500 }, radius: 10 },
  //         { name: "Shamshabad", coordinates: { latitude: 17.1800, longitude: 78.5000 }, radius: 15 },
  //         { name: "Rangareddy", coordinates: { latitude: 17.2500, longitude: 78.3500 }, radius: 20 }
  //       ];

  //       // Step 3: Check if the user is within any zone
  //       let isInZone = false;
  //       for (const zone of zones) {
  //         if (isUserWithinRange(userLocation, zone.coordinates, zone.radius)) {
  //           console.log(`User is within ${zone.name}.`);
  //           alert(`You are within ${zone.name}!`);
  //           isInZone = true;
  //           break;
  //         }
  //       }

  //       if (!isInZone) {
  //         console.log("User is outside all defined zones.");
  //         alert("You are outside the Greater Hyderabad Metropolitan Region.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while checking your location.");
  //     }
  //   };

  // const checkUserLocation = async () => {
  //     try {
  //       // Step 1: Get the user's current location
  //       const userLocation = await getUserLocation();
  //       if (!userLocation) {
  //         alert('Unable to retrieve your location.');
  //         return;
  //       }
  //       setLocation(userLocation);

  //       // Step 2: Define the combined center coordinates and radius
  //       const combinedCenter = {
  //         latitude: 17.3850, // Center of Hyderabad
  //         longitude: 78.4867 // Center of Hyderabad
  //       };
  //       const combinedRadiusInKm = 50; // 50 km radius to cover Hyderabad, Rangareddy, Medchal, etc.

  //       // Step 3: Check if the user is within the combined range
  //       const isWithinRange = isUserWithinRange(userLocation, combinedCenter, combinedRadiusInKm);
  //       if (isWithinRange) {
  //         console.log("User is within the combined Greater Hyderabad Metropolitan Region.");
  //         alert("You are within the combined Greater Hyderabad Metropolitan Region!");
  //       } else {
  //         console.log("User is outside the combined Greater Hyderabad Metropolitan Region.");
  //         alert("You are outside the combined Greater Hyderabad Metropolitan Region.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while checking your location.");
  //     }
  //   };

  const checkUserLocation = async () => {
    try {
      // Step 1: Get the user's current location
      const userLocation = await getUserLocation();
      if (!userLocation) {
        alert("Unable to retrieve your location.");
        return;
      }
      setLocation(userLocation);

      // Step 2: Define multiple zones
      const zones = [
        {
          name: "City Center",
          coordinates: { latitude: 17.385, longitude: 78.4867 },
          radius: 15,
        },
        {
          name: "Suburbs",
          coordinates: { latitude: 17.385, longitude: 78.4867 },
          radius: 30,
        },
        {
          name: "Outskirts",
          coordinates: { latitude: 17.385, longitude: 78.4867 },
          radius: 50,
        },
      ];

      // Step 3: Check which zone the user is in
      let isInZone = false;
      for (const zone of zones) {
        if (isUserWithinRange(userLocation, zone.coordinates, zone.radius)) {
          console.log(`User is within ${zone.name} (${zone.radius} km).`);
          alert(`You are within ${zone.name} (${zone.radius} km)!`);
          isInZone = true;
          setIsTrue(true);
          break;
        }
      }

      if (!isInZone) {
        setIsTrue(false);
        console.log("User is outside all defined zones.");
        alert("You are outside the Greater Hyderabad Metropolitan Region.");
      }
    } catch (error) {
      setIsTrue(false);
      console.error("Error:", error);
      alert("An error occurred while checking your location.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hi , Your Location is {JSON.stringify(location)}</Text>
    </View>
  ); // Your app UI here
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
