import { StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { PinIcon } from "../../Icons/Icons";
import { useChangeLoc100mViaMapScreenHook } from "./ChangeLoc100mViaMapScreen.hook";

// Map Component
const ChangeLocMapView = ({ newMarker, handleMarkerDragEnd }) => {
  const { lat, lng, dashedCircleCoordinates } = useChangeLoc100mViaMapScreenHook();

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: Number(lat),
        longitude: Number(lng),
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
      scrollEnabled={false}  //  Prevent scrolling
      zoomEnabled={true}    //  Prevent zooming
      rotateEnabled={true}  //  Prevent rotation
      pitchEnabled={true}   //  Prevent 3D tilt
      showsMyLocationButton={true}
    >
      <Marker coordinate={{ latitude: Number(lat), longitude: Number(lng) }}>
        <PinIcon name="map-pin" size={30} color="#EA4C89" />
      </Marker>

      <Marker
        coordinate={newMarker}
        draggable
        onDragEnd={handleMarkerDragEnd}
      >
        <PinIcon name="map-pin" size={30} color="#2b8a3e" />
      </Marker>

      {dashedCircleCoordinates.map((dash, index) => (
        <Polyline
          key={index}
          coordinates={dash}
          strokeColor="#EA4C89"
          strokeWidth={1}
        />
      ))}

      <Polyline
        coordinates={[
          { latitude: Number(lat), longitude: Number(lng) },
          { latitude: newMarker?.latitude, longitude: newMarker?.longitude },
        ]}
        strokeColor="#EA4C89"
        strokeWidth={3}
        lineDashPattern={[10, 5]}
      />
    </MapView>
  );
};

export default ChangeLocMapView;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

