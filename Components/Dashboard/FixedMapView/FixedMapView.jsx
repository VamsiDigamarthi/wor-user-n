import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import { getPlaceName } from "../../../Constants/displaylocationmap";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

// Get screen dimensions for positioning the marker
const { width, height } = Dimensions.get("window");

const MapWithFixedMarker = ({ navigation }) => {
  const route = useRoute();
  const { pickUpCoordinated, placeName } = route.params;

  const [
    finalSelecetLocationNameWithCoordinates,
    setFinalSelecetLocationNameWithCoordinates,
  ] = useState(null);

  const mapRegion = {
    latitude: pickUpCoordinated?.lat,
    longitude: pickUpCoordinated?.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const onFetchLocationName = async (latitude, longitude) => {
    let placeName = await getPlaceName(latitude, longitude);
    setFinalSelecetLocationNameWithCoordinates({
      location: { lat: latitude, lng: longitude },
      name: placeName,
    });
  };

  const onRegionChangeComplete = (region) => {
    onFetchLocationName(region.latitude, region.longitude);
  };
  const onNavigateShowPriceScreen = () => {
    navigation.navigate("ShowPrice", {
      placeName,
      pickUpCoordinated,
      dropDetails: finalSelecetLocationNameWithCoordinates,
    });
  };

  return (
    <View style={styles.container}>
      {mapRegion ? (
        <>
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={onRegionChangeComplete}
          />
          {/* Marker at a fixed position on the screen (slightly below the center) */}
          <View style={styles.fixedMarker}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      {/* Display center coordinates when map is moved */}
      {placeName && (
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesText}>
            {finalSelecetLocationNameWithCoordinates?.name
              ? finalSelecetLocationNameWithCoordinates.name
              : placeName}
          </Text>
          <CustomBtn
            title="Save"
            btnBg="#e02e88"
            btnColor="#fff"
            onPress={onNavigateShowPriceScreen}
          />
        </View>
      )}
    </View>
  );
};

export default MapWithFixedMarker;

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
  fixedMarker: {
    position: "absolute",
    top: height / 2 + 30 - 200, // Position the marker slightly below the center of the screen
    left: width / 2 - 15, // Horizontally center the marker
    zIndex: 1000,
  },
  marker: {
    height: 30,
    width: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    fontSize: 24, // Emoji size for the marker
  },
  coordinatesContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 8,
    gap: 10,
    width: "100%",
  },
  coordinatesText: {
    fontSize: 16,
    color: "#e02d88",
    textAlign: "center",
  },
});
