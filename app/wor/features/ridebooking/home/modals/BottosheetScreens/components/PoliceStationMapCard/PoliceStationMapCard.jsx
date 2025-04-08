import {
  StyleSheet,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { usePoliceStationMapCardHook } from "./PoliceStationMapCard.hook";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import bikeImg from "../../../../../../../../../assets/images/markers/BIKE-removebg-preview.png";
import AppBarLayout from "../../../../../sharedLogics/AppBarLayout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PoliceStationMapCard = () => {
  const navigation = useNavigation();
  const {
    policeStationCoordinates,
    userCoordinates,
    googleMapsApiKey,
    markerRef,
    mapRef,
    directionKey,
  } = usePoliceStationMapCardHook();

  const openGoogleMaps = () => {
    const { latitude: lat, longitude: lng } = policeStationCoordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    Linking.openURL(googleMapsUrl).catch((err) =>
      console.error("Failed to open Google Maps", err)
    );
  };

  return (
    <AppBarLayout title="Police Station" isPositionAppbar={true}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: userCoordinates.latitude,
            longitude: userCoordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Police Station Marker */}
          <Marker coordinate={policeStationCoordinates} title="Police Station">
            <FontAwesome name="map-pin" size={15} color="green" />
          </Marker>

          {/* User's Bike Marker */}
          {userCoordinates &&
            typeof userCoordinates.latitude === "number" &&
            typeof userCoordinates.longitude === "number" && (
              <Marker.Animated
                coordinate={userCoordinates}
                ref={markerRef}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <Image
                  source={bikeImg}
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          rotate: `${
                            typeof userCoordinates.heading === "number"
                              ? userCoordinates.heading
                              : 0
                          }deg`,
                        },
                      ],
                    },
                  ]}
                />
              </Marker.Animated>
            )}

          {/* Directions - Using key to force remount without blinking */}
          <MapViewDirections
            key={directionKey}
            apikey={googleMapsApiKey}
            origin={userCoordinates}
            destination={policeStationCoordinates}
            strokeWidth={2}
            strokeColor="#EA4C89"
            optimizeWaypoints={true}
            onReady={(result) => {
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }
            }}
          />
        </MapView>

        <TouchableOpacity style={styles.positionBtn} onPress={openGoogleMaps}>
          <MaterialIcons name="directions" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </AppBarLayout>
  );
};

export default PoliceStationMapCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  button: {
    position: "absolute",
    top: 0,
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  positionBtn: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 100,
    right: 10,
    padding: 10,
    borderRadius: 10,
  },
});
