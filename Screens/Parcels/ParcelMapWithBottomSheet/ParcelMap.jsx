import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { customMapStyle } from "../../../Constants/mapData";
import { FontAwesome } from "@expo/vector-icons";
const ParcelMap = ({ pickUpLocationCoorWithName }) => {
  const [newLocation, setNewLocation] = useState({
    lat: pickUpLocationCoorWithName?.location?.lat ?? 17.4587331,
    lng: pickUpLocationCoorWithName?.location?.lng ?? 78.3705363,
  });

  useEffect(() => {
    if (pickUpLocationCoorWithName) {
      setNewLocation({
        lat: pickUpLocationCoorWithName?.location?.lat,
        lng: pickUpLocationCoorWithName?.location?.lng,
      });
    }
  }, [pickUpLocationCoorWithName]);

  // Fallback if location is undefined or null
  if (!pickUpLocationCoorWithName || !newLocation) {
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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: newLocation?.lat,
          longitude: newLocation?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        // customMapStyle={customMapStyle}
        // showsMyLocationButton={false}
        // showsCompass={false}
        // showsIndoors={false}
        // showsIndoorLevelPicker={false}
        // showsTraffic={false}
        // showsScale={false}
        // showsBuildings={false}
        // showsPointsOfInterest={false}
      >
        {/* Add a Marker at the coordinates */}
        <Marker coordinate={adjustedOrigin} title="Start Point">
          <FontAwesome name="map-pin" size={20} color="#EA4C89" />
        </Marker>
      </MapView>
    </View>
  );
};

export default ParcelMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
