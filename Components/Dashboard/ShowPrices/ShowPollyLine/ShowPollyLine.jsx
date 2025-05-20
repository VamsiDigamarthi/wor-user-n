import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { customMapStyle } from "../../../../Constants/mapData";
import Map3Btns from "../../../../Utils/HomeMap/Map3Btn"; // Corrected import
import MapModalUi from "../../../../Utils/MapModalUi/MapModalUi";

const ShowPollyLine = ({
  origin,
  destination,
  height,
  liveCoordinates,
  handleOpenSafetySheet, // This is open for bottom sheet
}) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: origin?.lat,
    longitude: origin?.lng,
  });
  const [error, setError] = useState(null);

  const mapRef = useRef(null); // Added mapRef for programmatic control
  const [toggle, setToggle] = useState(false);

  const GOOGLE_MAPS_APIKEY = "AIzaSyCNMAEsU6BwMrrXQRvAHw42i7gd8m6zv2g"; // Replace with your Google Maps API Key

  // Adjust the origin and destination to match MapView expectations
  const adjustedOrigin = {
    latitude: origin?.lat,
    longitude: origin?.lng,
  };

  const adjustedDestination = {
    latitude: destination?.lat,
    longitude: destination?.lng,
  };

  const initialRegion = {
    latitude: adjustedOrigin?.latitude,
    longitude: adjustedOrigin?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }; // Define the initial region

  // Fetch the route when the component mounts or when the origin/destination changes
  useEffect(() => {
    const getDirections = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`
        );

        if (response.data.routes && response.data.routes.length > 0) {
          const points = decode(
            response.data.routes[0].overview_polyline.points
          );
          const coordinates = points.map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }));
          setRouteCoordinates(coordinates);

          if (mapRef.current) {
            mapRef.current.fitToCoordinates(coordinates, {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            });
          }
        } else {
          setError("No routes found between the selected locations");
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch directions");
      }
    };

    getDirections();
  }, [origin, destination]);

  // Update the marker's position based on live coordinates received from the server
  useEffect(() => {
    if (liveCoordinates) {
      const { latitude, longitude } = liveCoordinates;
      setCurrentPosition({
        latitude: latitude,
        longitude: longitude,
      });
    }
  }, [liveCoordinates]);

  // Decode polyline points into latitude and longitude
  const decode = (t, e = 5) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
  };

  // Handle zoom to fit the route coordinates
  const handleResetZoom = useCallback(() => {
    if (mapRef.current && routeCoordinates.length > 0) {
      mapRef.current.fitToCoordinates(routeCoordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [routeCoordinates]);

  useEffect(() => {
    // Adjust zoom based on height
    if (mapRef.current) {
      const zoomLevel = height > 600 ? 0.01 : 0.05; // Example zoom adjustment
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

  console.log(height);

  return (
    <View style={[styles.container]}>
      <MapView
        ref={mapRef} // Attach ref to MapView
        style={styles.map}
        poiClickEnabled={false}
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
        {/* Marker for Start */}
        {adjustedOrigin.latitude && adjustedOrigin.longitude && (
          <Marker coordinate={adjustedOrigin} title="Start Point">
            <FontAwesome name="map-pin" size={20} color="#EA4C89" />
          </Marker>
        )}

        {/* Marker for End */}
        {adjustedDestination.latitude && adjustedDestination.longitude && (
          <Marker coordinate={adjustedDestination} title="End Point">
            <FontAwesome name="map-pin" size={20} color="#4caf50" />
          </Marker>
        )}

        {/* Live moving marker */}
        {currentPosition.latitude && currentPosition.longitude && (
          <Marker coordinate={currentPosition} title="Live Position">
            <MaterialCommunityIcons
              name="motorbike"
              size={24}
              color="#EA4C89"
            />
          </Marker>
        )}

        {/* Polyline for route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#EA4C89" // Pink polyline
            strokeWidth={2}
          />
        )}
      </MapView>

      <Map3Btns
        handleOpenSafetyModal={() => setToggle((prev) => !prev)}
        handleZoomToggle={handleResetZoom}
        height={height}
      />

      {toggle && <MapModalUi toggle={toggle} setToggle={setToggle} />}
    </View>
  );
};

export default ShowPollyLine;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    bottom: 200,
  },
});
