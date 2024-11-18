import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { coordinationMap } from "../../../Constants/displaylocationmap";

const ParcelMap = ({ pickUpLocationCoorWithName }) => {
  return (
    <View style={styles.mapContainer}>
      <Image
        source={{
          uri: coordinationMap(
            pickUpLocationCoorWithName?.location?.lat,
            pickUpLocationCoorWithName?.location?.lng
          ),
        }}
        style={styles.mapImage} // Define your desired styles here
      />
    </View>
  );
};

export default ParcelMap;

const styles = StyleSheet.create({
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250, // Set height for the map view
    zIndex: -1, // Send it behind the bottom sheet
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
