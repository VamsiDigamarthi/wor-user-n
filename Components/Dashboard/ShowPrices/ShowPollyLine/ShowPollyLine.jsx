import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";

const ShowPollyLine = ({ origin, destination }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [error, setError] = useState(null);

  const GOOGLE_MAPS_APIKEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8"; // Replace with your Google Maps API Key

  useEffect(() => {
    const getDirections = async () => {
      try {
        // Log the origin and destination for debugging
        // console.log("Origin: ", origin);
        // console.log("Destination: ", destination);

        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`
        );

        // console.log("API Response: ", response.data); // Log the full API response

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
    latitude: origin.lat, // Map lat to latitude
    longitude: origin.lng, // Map lng to longitude
  };

  const adjustedDestination = {
    latitude: destination.lat, // Map lat to latitude
    longitude: destination.lng, // Map lng to longitude
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: adjustedOrigin.latitude,
          longitude: adjustedOrigin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker for Start */}
        <Marker coordinate={adjustedOrigin} title="Start Point" />

        {/* Marker for End */}
        <Marker coordinate={adjustedDestination} title="End Point" />

        {/* Polyline for Directions */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000" // Polyline color
            strokeWidth={4} // Polyline width
          />
        )}
      </MapView>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default ShowPollyLine;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
