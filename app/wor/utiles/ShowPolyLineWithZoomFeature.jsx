import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { customMapStyle } from "../../../Constants/mapData";
import useFetchRouteCoordinates from "./ShowPollyLine.services";
import { calculateBearing } from "../../../Constants/displaylocationmap";
import Map3Btns from "./Map3Btn";
import MapModalUi from "../features/ridebooking/home/modals/MapModalUi";

const ShowPollyLine = ({
  origin,
  destination,
  height,
  liveCoordinates,
  handleOpenSafetySheet,
}) => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: liveCoordinates?.lat,
    longitude: liveCoordinates?.lng,
  });
  const [heading, setHeading] = useState(0); // Add a state for heading
  const [isZoomedOut, setIsZoomedOut] = useState(false); // Track zoom state
  const mapRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const adjustedOrigin = { latitude: origin.lat, longitude: origin.lng };
  const adjustedDestination = {
    latitude: destination.lat,
    longitude: destination.lng,
  };
  const initialRegion = {
    latitude: adjustedOrigin.latitude,
    longitude: adjustedOrigin.longitude,
    latitudeDelta: 0.005, // Smaller delta for zoomed-in view
    longitudeDelta: 0.005,
  };
  const { fetchRouteCoordinates, routeCoordinates, error } =
    useFetchRouteCoordinates(origin, destination);

  useEffect(() => {
    const fetchData = async () => {
      const coordinates = await fetchRouteCoordinates();
      fitMapToCoordinates(coordinates);
    };
    fetchData();
  }, [origin, destination]);

  const fitMapToCoordinates = (coordinates) => {
    if (mapRef.current && coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (liveCoordinates?.lat) {
      const newHeading = calculateBearing(currentPosition, liveCoordinates);
      setCurrentPosition({
        latitude: liveCoordinates.lat,
        longitude: liveCoordinates.lng,
      });
    }
  }, [liveCoordinates]);

  useEffect(() => {
    if (mapRef.current) {
      const zoomLevel = height > 600 ? 0.01 : 0.05;
      mapRef.current.animateToRegion(
        {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        },
        1000
      );
    }
  }, [height]);

  const handleResetZoom = useCallback(() => {
    if (mapRef.current) {
      if (isZoomedOut) {
        // Zoom in to the start point
        mapRef.current.animateToRegion(
          {
            latitude: adjustedOrigin.latitude,
            longitude: adjustedOrigin.longitude,
            latitudeDelta: 0.005, // Smaller delta for zoomed-in view
            longitudeDelta: 0.005,
          },
          800
        );
      } else {
        // Zoom out to fit the entire route
        const coordinates = [
          {
            latitude: adjustedOrigin.latitude,
            longitude: adjustedOrigin.longitude,
          },
          {
            latitude: adjustedDestination.latitude,
            longitude: adjustedDestination.longitude,
          },
        ];
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
      setIsZoomedOut((prev) => !prev); // Toggle the zoom state
    }
  }, [isZoomedOut, adjustedOrigin, adjustedDestination]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={customMapStyle}
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        showsScale={false}
        showsBuildings={false}
        showsPointsOfInterest={false}
      >
        {/* Markers */}
        <Marker coordinate={adjustedOrigin} title="Start Point">
          <FontAwesome name="map-pin" size={20} color="#EA4C89" />
        </Marker>
        <Marker coordinate={adjustedDestination} title="End Point">
          <FontAwesome name="map-pin" size={20} color="#4caf50" />
        </Marker>
        {currentPosition?.latitude && (
          <Marker coordinate={currentPosition} title="Live Position">
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
              }}
              source={require("../../../assets/images/markers/BIKE-removebg-preview.png")}
            />
          </Marker>
        )}
        {/* Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#EA4C89"
          strokeWidth={2}
        />
      </MapView>
      <Map3Btns
        handleOpenSafetyModal={() => setToggle((prev) => !prev)}
        handleZoomToggle={handleResetZoom} // Updated handler
        mapIconsTop={200}
      />
      {toggle && <MapModalUi toggle={toggle} setToggle={setToggle} />}
    </View>
  );
};

export default ShowPollyLine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    bottom: 200,
  },
});
