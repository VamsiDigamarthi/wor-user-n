import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { coordinationMap } from "../../Constants/displaylocationmap";

const HomeMap = ({ location }) => {
  return (
    <View style={styles.mapContainer}>
      {location && (
        <Image
          source={{
            uri: coordinationMap(location.lat, location.lng),
          }}
          style={styles.mapImage}
        />
      )}
    </View>
  );
};

export default HomeMap;

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
