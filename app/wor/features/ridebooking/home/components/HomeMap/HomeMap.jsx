import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeMapPreview from "./HomeMapPreview";

const HomeMap = ({ location, captainMarkers, toggleCloseSOS }) => {
  return (
    <View style={[styles.mapContainer]}>
      {!location || location == null || location == undefined ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color="#e02e88" size={30} />
        </View>
      ) : (
        <HomeMapPreview
          captainMarkers={captainMarkers}
          location={location}
          // height={mapHeight}
          handleOpenSafetyModal={toggleCloseSOS}
        />
      )}
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
