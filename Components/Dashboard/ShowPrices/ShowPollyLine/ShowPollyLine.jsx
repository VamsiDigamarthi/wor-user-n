import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { customMapStyle } from "../../../../Constants/mapData";

const ShowPollyLine = ({
  origin,
  destination,
  height = 400,
  liveCoordinates,
}) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: origin.lat,
    longitude: origin.lng,
  });
  const [error, setError] = useState(null);

  const GOOGLE_MAPS_APIKEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8"; // Replace with your Google Maps API Key

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
    // console.log("live coordinates", liveCoordinates);
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

  // Adjust the origin and destination to match MapView expectations
  const adjustedOrigin = {
    latitude: origin.lat,
    longitude: origin.lng,
  };

  const adjustedDestination = {
    latitude: destination.lat,
    longitude: destination.lng,
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        style={styles.map}
        poiClickEnabled={false}
        initialRegion={{
          latitude: adjustedOrigin.latitude,
          longitude: adjustedOrigin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
            <FontAwesome name="map-pin" size={20} color="#e02e88" />
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
              color="#e02e88"
            />
          </Marker>
        )}
        {/* Polyline for route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#e02e88" // Black polyline
            strokeWidth={2}
          />
        )}
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
  },
});
