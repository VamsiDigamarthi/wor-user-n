import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
const { width, height } = Dimensions.get("window");

const MapWithFixedMarker = ({ mapRegion, onRegionChangeComplete }) => {
  return (
    <>
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={onRegionChangeComplete}
      />

      <View style={styles.fixedMarker}>
        <View style={styles.marker}>
          <Text style={styles.markerText}>📍</Text>
        </View>
      </View>
    </>
  );
};

export default MapWithFixedMarker;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  fixedMarker: {
    position: "absolute",
    top: height / 2 + 30 - 200, // Position the marker slightly below the center of the screen
    left: width / 2 - 15, // Horizontally center the marker
    zIndex: 1000,
    // backgroundColor: "red",
  },
  marker: {
    height: 30,
    width: 30,
    // backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  markerText: {
    fontSize: 24, // Emoji size for the marker
  },
});
