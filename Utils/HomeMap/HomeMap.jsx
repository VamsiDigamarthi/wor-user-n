import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { customMapStyle } from "../../Constants/mapData";
import Map3Btns from "./Map3Btn";
import Entypo from "@expo/vector-icons/Entypo";
import MapModalUi from "../MapModalUi/MapModalUi";

const HomeMap = ({
  location,
  captainMarkers,
  height,
  mapIconsBottom = 100,
}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [initialRegion, setInitialRegion] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [newLocation, setNewLocation] = useState({
    lat: 17.4587331,
    lng: 78.3705363,
  });

  const adjustedOrigin = useMemo(
    () => ({
      latitude: location?.lat || 0,
      longitude: location?.lng || 0,
    }),
    [location]
  );

  const handleResetZoom = useCallback(() => {
    if (mapRef.current && initialRegion) {
      mapRef.current.animateToRegion(initialRegion, 800);
    }
  }, [initialRegion]);

  useEffect(() => {
    if (location) {
      const newRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(newRegion);
      setInitialRegion(newRegion);
      setNewLocation(location);
    }
  }, [location]);

  if (!location || !newLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No location data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={[StyleSheet.absoluteFillObject, { bottom: 300 }]}
        region={region}
        customMapStyle={customMapStyle}
        showsMyLocationButton={false}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker coordinate={adjustedOrigin} title="Start Point">
          <FontAwesome name="map-pin" size={20} color="#e02e88" />
        </Marker>

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

      <Map3Btns
        handleOpenSafetyModal={() => setToggle((prev) => !prev)}
        handleZoomToggle={handleResetZoom}
        bottom={mapIconsBottom}
      />

      {toggle && <MapModalUi toggle={toggle} setToggle={setToggle} />}
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
  },
  shareLocationBtn: {
    backgroundColor: "#e02e88",
    borderRadius: 30,
    height: 35,
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
