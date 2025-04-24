import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { customMapStyle } from "../../../../../../Constants/mapData";
import { pinkpin } from "../../../../Images/OtherIcons";
import Map3Btns from "../../../../utiles/Map3Btn";
import MapModalUi from "../modals/MapModalUi";
import SafetyToolModals from "../modals/SafetyToolModals/SafetyToolModals";

const HomeMapPreview = ({
  location,
  captainMarkers,
  toggleCloseSOS,
  mapIconsTop = 100,
  mapHeight,
}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
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
    if (!location) {
      console.warn("Location data is not available yet.");
      return;
    }

    const newRegion = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setRegion(newRegion);
    setInitialRegion(newRegion);
    setNewLocation(location);

    const coordinatesArray = [
      { latitude: location.lat, longitude: location.lng },
    ];

    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinatesArray, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
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
        style={StyleSheet.absoluteFillObject}
        region={region}
        // customMapStyle={customMapStyle}
        showsMyLocationButton={false}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker
          coordinate={adjustedOrigin}
          title="Start Point"
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <Image source={pinkpin} style={styles.pin} />
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
                    ? require("../../../../../../assets/images/markers/BIKE-removebg-preview.png")
                    : // : marker.type === "auto"
                      // ? require("../../../../../../assets/images/markers/auto__1_-removebg-preview.png")
                      require("../../../../../../assets/images/markers/CAR__1_-removebg-preview.png")
                }
              />
            </View>
          </Marker>
        ))}
      </MapView>
      <Map3Btns
        handleOpenSafetyModal={() => setToggle((prev) => !prev)}
        handleZoomToggle={handleResetZoom}
        top={220}
      />

      {toggle && <SafetyToolModals toggle={toggle} setToggle={setToggle} />}
    </View>
  );
};

export default HomeMapPreview;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    bottom: 200,
    // flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pin: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
});
