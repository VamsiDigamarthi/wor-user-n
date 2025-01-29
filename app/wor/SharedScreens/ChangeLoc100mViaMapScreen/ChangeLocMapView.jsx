import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import { PinIcon } from "../../Icons/Icons";
import { useSelector } from "react-redux";

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

      <Circle
        center={{ latitude: lat, longitude: lng }}
        radius={100} // 100 meters
        strokeColor="#EA4c89"
        fillColor="#fff7fb"
        strokeWidth={2}
      />

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
