import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { customMapStyle } from "../../../Constants/mapData";
import useFetchRouteCoordinates from "./ShowPollyLine.services";

const ShowPollyLine = ({
  origin,
  destination,
  height,
  liveCoordinates,
  handleOpenSafetySheet,
}) => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: origin.lat,
    longitude: origin.lng,
  });

  const mapRef = useRef(null);

  // Adjust origin and destination for MapView
  const adjustedOrigin = { latitude: origin.lat, longitude: origin.lng };
  const adjustedDestination = {
    latitude: destination.lat,
    longitude: destination.lng,
  };

  const initialRegion = {
    latitude: adjustedOrigin.latitude,
    longitude: adjustedOrigin.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const { fetchRouteCoordinates, routeCoordinates, error } =
    useFetchRouteCoordinates(origin, destination);

  // Fetch route on component mount or when origin/destination changes
  useEffect(() => {
    const fetchData = async () => {
      const coordinates = await fetchRouteCoordinates();
      fitMapToCoordinates(coordinates);
    };
    fetchData();
  }, [origin, destination]);

  // Fit map to route coordinates
  const fitMapToCoordinates = (coordinates) => {
    if (mapRef.current && coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  // Update marker position based on live coordinates
  useEffect(() => {
    if (liveCoordinates) {
      setCurrentPosition({
        latitude: liveCoordinates.latitude,
        longitude: liveCoordinates.longitude,
      });
    }
  }, [liveCoordinates]);

  // Adjust zoom based on height
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
          <FontAwesome name="map-pin" size={20} color="#e02e88" />
        </Marker>
        <Marker coordinate={adjustedDestination} title="End Point">
          <FontAwesome name="map-pin" size={20} color="#4caf50" />
        </Marker>
        <Marker coordinate={currentPosition} title="Live Position">
          <MaterialCommunityIcons name="motorbike" size={24} color="#e02e88" />
        </Marker>

        {/* Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#e02e88"
          strokeWidth={2}
        />
      </MapView>
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
