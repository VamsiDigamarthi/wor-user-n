import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { customMapStyle } from "../../Constants/mapData";

const HomeMap = ({ location, captainMarkers }) => {
  const [newLocation, setNewLocation] = useState({
    lat: 17.4587331,
    lng: 78.3705363,
  });

  useEffect(() => {
    if (location) {
      setNewLocation(location); // Update the state with the actual location
      console.log("Location updated:", location);
    }
  }, [location]);

  // Fallback if location is undefined or null
  if (!location || !newLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No location data available</Text>
      </View>
    );
  }

  const adjustedOrigin = {
    latitude: newLocation?.lat,
    longitude: newLocation?.lng,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: newLocation?.lat,
          longitude: newLocation?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        customMapStyle={customMapStyle}
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        showsScale={false}
        showsBuildings={false}
        showsPointsOfInterest={false}
      >
        <Marker coordinate={adjustedOrigin} title="Start Point">
          <FontAwesome name="map-pin" size={20} color="#e02e88" />
        </Marker>

        {/* Uncomment the below code to display captain markers */}
        {captainMarkers?.map((marker, index) => (
          <Marker
            zIndex={index + 1}
            key={index}
            flat
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: marker?.latitude,
              longitude: marker?.longitude,
            }}
          >
            <View style={{ transform: [{ rotate: `${marker.rotation}deg` }] }}>
              <Image
                style={{ width: 30, height: 30, resizeMode: "contain" }}
                source={
                  marker.type === "bike"
                    ? require("../../assets/images/markers/BIKE-removebg-preview.png")
                    : marker.type === "auto"
                    ? require("../../assets/images/markers/auto__1_-removebg-preview.png")
                    : require("../../assets/images/markers/CAR__1_-removebg-preview.png")
                }
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
