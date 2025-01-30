import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { PinIcon } from "../../Icons/Icons";
import { useSelector } from "react-redux";

// Helper function to generate polyline coordinates approximating a circle
const generateDashedCircleCoordinates = (lat, lng, radius, numberOfDashes) => {
  const dashes = [];
  const angleIncrement = (2 * Math.PI) / numberOfDashes;

  for (let i = 0; i < numberOfDashes; i++) {
    const startAngle = i * angleIncrement;
    const endAngle = startAngle + angleIncrement / 2; // Create a gap for the dash

    const startLat = lat + (radius / 111320) * Math.cos(startAngle);
    const startLng =
      lng +
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
        Math.sin(startAngle);

    const endLat = lat + (radius / 111320) * Math.cos(endAngle);
    const endLng =
      lng +
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
        Math.sin(endAngle);

    dashes.push([
      { latitude: startLat, longitude: startLng },
      { latitude: endLat, longitude: endLng },
    ]);
  }

  return dashes;
};

const ChangeLocMapView = ({ newMarker, handleMarkerDragEnd }) => {
  const { location, placeName, placeVicinity } = useSelector(
    (state) => state.location
  );
  const { initialDropDetails, isBeforeBook } = useSelector(
    (state) => state.allRideDetails
  );

  const { lat, lng } = isBeforeBook
    ? location
    : initialDropDetails?.location || {};

  const dashedCircleCoordinates = generateDashedCircleCoordinates(
    lat,
    lng,
    100,
    60
  ); // 60 dashes

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
      showsMyLocationButton={false}
    >
      <Marker
        coordinate={{ latitude: lat, longitude: lng }}
        title={isBeforeBook ? placeName : initialDropDetails?.name}
        description={
          isBeforeBook ? placeVicinity : initialDropDetails?.vicinity
        }
      >
        <PinIcon name="map-pin" size={30} color="#e02e88" />
      </Marker>

      <Marker
        coordinate={newMarker}
        draggable
        onDragEnd={handleMarkerDragEnd} // Track drag end
        title="New Position"
      >
        <PinIcon name="map-pin" size={30} color="#2b8a3e" />
      </Marker>

      {/* Render dashed circle using multiple polylines */}
      {dashedCircleCoordinates.map((dash, index) => (
        <Polyline
          key={index}
          coordinates={dash}
          strokeColor="#EA4c89"
          strokeWidth={1}
        />
      ))}

      <Polyline
        coordinates={[
          { latitude: lat, longitude: lng },
          {
            latitude: newMarker.latitude,
            longitude: newMarker.longitude,
          },
        ]}
        strokeColor="#e02e88"
        strokeWidth={3}
        lineDashPattern={[10, 5]}
      />
    </MapView>
  );
};

export default ChangeLocMapView;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject, // Ensures the map covers the entire container
  },
});
