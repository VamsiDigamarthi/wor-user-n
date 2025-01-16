import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useRoute } from "@react-navigation/native";
import { appbarStyles } from "./styles";
import MapView, { Marker, Circle, Polyline } from "react-native-maps"; // Import Polyline
import { customMapStyle } from "../../../Constants/mapData";
import { PinIcon } from "../Icons/Icons";
import ParcelBtnCard from "../features/Parcels/Components/ParcelBtnCard";
import CustomBtn from "./CustomBtn";
import geolib from "geolib";

const ChangeLoc100mViaMap = () => {
  const { place } = useRoute().params;
  const { lat, lng } = place?.location || {};

  // State to store the new marker position
  const [newMarker, setNewMarker] = useState({ latitude: lat, longitude: lng });

  // Function to handle the drag end of the marker
  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const distance = getDistanceFromLatLonInKm(lat, lng, latitude, longitude);

    // Only update the marker if it's within the 100-meter radius (0.1 km)
    if (distance <= 0.1) {
      setNewMarker({ latitude, longitude });
    } else {
      const newPosition = geolib.computeDestinationPoint(
        { latitude: lat, longitude: lng },
        100, // 100 meters
        geolib.getCompassCourse(
          { latitude: lat, longitude: lng },
          { latitude: latitude, longitude: longitude }
        )
      );

      setNewMarker({
        latitude: newPosition.latitude,
        longitude: newPosition.longitude,
      });
    }
  };

  // Function to calculate the distance between two points in km
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return (
    <View style={styles.container}>
      <CustomeAppbar
        onBack={() => navigation.goBack()}
        appTitCenStyles={appbarStyles.appTitCenStyles}
        appTitCenWidth={appbarStyles.appTitCenWidth}
        title={place?.name}
        vicinity={place?.vicinity}
      />
      <View style={styles.mapContainer}>
        {lat && lng ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.003, // Zoom level
              longitudeDelta: 0.003,
            }}
            showsMyLocationButton={false}
          >
            {/* Display initial Marker */}
            <Marker
              coordinate={{ latitude: lat, longitude: lng }}
              title={place?.name}
              description={place?.vicinity}
            >
              <PinIcon name="map-pin" size={30} color="#e02e88" />
            </Marker>

            {/* Display new Marker (dragged one) */}
            <Marker
              coordinate={newMarker}
              draggable
              onDragEnd={handleMarkerDragEnd} // Track drag end
              title="New Position"
            >
              <PinIcon name="map-pin" size={30} color="#2b8a3e" />
            </Marker>

            {/* Display Circle */}
            <Circle
              center={{ latitude: lat, longitude: lng }}
              radius={100} // 100 meters
              strokeColor="#e02e88"
              fillColor="rgba(224, 46, 136, 0.2)"
              strokeWidth={2}
            />

            {/* Draw a dashed line between the two markers */}
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
              lineDashPattern={[10, 5]} // Dashed line pattern
            />
          </MapView>
        ) : (
          <View style={styles.mapContainer}>
            <ActivityIndicator color="#e02e88" size={30} />
          </View>
        )}
      </View>
      <ParcelBtnCard>
        <CustomBtn title="Confirm Location" btnBg="#e02e88" btnColor="#fff" />
      </ParcelBtnCard>
    </View>
  );
};

export default ChangeLoc100mViaMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Ensures the map covers the entire container
  },
});
