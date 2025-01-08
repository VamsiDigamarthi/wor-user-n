import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Button,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import { getPlaceName } from "../../../Constants/displaylocationmap";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { COLORS } from "../../../Constants/colors";

// Get screen dimensions for positioning the marker
const { width, height } = Dimensions.get("window");

const MapWithFixedMarker = ({ navigation }) => {
  const route = useRoute();
  const {
    pickUpCoordinated,
    placeName,
    isParcelScreen = false,
    typeOfLocation,
  } = route.params;

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
    // console.log(placeName);
    setFinalSelecetLocationNameWithCoordinates({
      location: { lat: latitude, lng: longitude },
      name: placeName,
    });
  };

  const onRegionChangeComplete = (region) => {
    onFetchLocationName(region.latitude, region.longitude);
  };
  const onNavigateShowPriceScreen = () => {
    if (isParcelScreen) {
      navigation.navigate("ParcelMapWithBottomSheet", {
        pickUpLocationCoorWithName: finalSelecetLocationNameWithCoordinates,
        typeOfLocation,
      });
      return;
    }
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
          {/* <View style={styles.coordinateFirstCard}>
            <Text style={styles.selectedText}>Select your location</Text>
            <View style={styles.changeTextBtnCard}>
              <Pressable>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Change</Text>
              </Pressable>
            </View>
          </View> */}

          <View style={styles.coordinateAddressCard}>
            <Ionicons name="location-sharp" size={24} color="green" />
            <View style={styles.coorlocationCard}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {finalSelecetLocationNameWithCoordinates?.name?.split(",")?.[0]}
              </Text>
              <Text
                style={{ fontSize: 14, color: "gray" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {finalSelecetLocationNameWithCoordinates?.name
                  ?.split(",")
                  ?.slice(1)}
              </Text>
            </View>
          </View>

          <CustomBtn
            title="Save"
            // borderRadius={10}
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
    // backgroundColor: "red",
  },
  marker: {
    height: 30,
    width: 30,
    // backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  markerText: {
    fontSize: 24, // Emoji size for the marker
  },
  coordinatesContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 8,
    gap: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  coordinatesText: {
    fontSize: 16,
    color: "#e02d88",
    textAlign: "center",
  },
  marker: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    // backgroundColor: "red",
  },
  coordinateFirstCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 20,
    fontWeight: "600",
  },
  changeTextBtnCard: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  coordinateAddressCard: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  coorlocationCard: {
    width: "90%",
  },
});
