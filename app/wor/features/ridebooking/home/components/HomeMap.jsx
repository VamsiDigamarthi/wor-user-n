import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import HomeMapPreview from "./HomeMapPreview";

const HomeMap = ({ captainMarkers, toggleCloseSOS }) => {
  const { location } = useSelector((state) => state.location);
  return (
    <View style={[styles.mapContainer]}>
      {!location || location == null || location == undefined ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator color="#EA4C89" size={30} />
        </View>
      ) : (
        <>
          <HomeMapPreview
            captainMarkers={captainMarkers}
            location={location}
            handleOpenSafetyModal={toggleCloseSOS}
          />
        </>
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
