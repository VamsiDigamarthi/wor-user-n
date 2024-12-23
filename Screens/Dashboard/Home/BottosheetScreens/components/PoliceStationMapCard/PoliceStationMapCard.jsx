import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React from "react";
import { usePoliceStationMapCardHook } from "./PoliceStationMapCard.hook";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { allAppBarContainerStyle } from "../../../../../../Utils/Styles/Styles";

const PoliceStationMapCard = () => {
  const navigation = useNavigation();
  const {
    singlePoliceStation,
    polylineCoordinates,
    policeStationCoordinates,
    userCoordinates,
    liveLocation,
  } = usePoliceStationMapCardHook();

  const openGoogleMaps = () => {
    const { lat, lng } = policeStationCoordinates; // Destination coordinates
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    Linking.openURL(googleMapsUrl).catch((err) =>
      console.error("Failed to open Google Maps", err)
    );
  };

  return (
    <View style={allAppBarContainerStyle.container}>
      <StatusBar style="dark" />
      <CustomeAppbar
        title="Police Station Direction"
        onBack={() => navigation.goBack()}
      />
      <View style={{ height: 100 }} />
      {/* Map displaying markers and polyline */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userCoordinates.lat,
          longitude: userCoordinates.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marker for User */}
        <Marker
          coordinate={{
            latitude: userCoordinates.lat,
            longitude: userCoordinates.lng,
          }}
          title="Your Location"
          description="This is your current location"
        >
          <FontAwesome name="map-pin" size={20} color="#e02e88" />
        </Marker>

        {/* Marker for Police Station */}
        <Marker
          coordinate={{
            latitude: policeStationCoordinates.lat,
            longitude: policeStationCoordinates.lng,
          }}
          title={singlePoliceStation.name}
          description={singlePoliceStation.vicinity}
        >
          <FontAwesome name="map-pin" size={20} color="#4caf50" />
        </Marker>

        {/* Live moving marker */}
        {liveLocation?.latitude && liveLocation?.longitude && (
          <Marker coordinate={liveLocation} title="Live Position">
            <Entypo name="location-pin" size={24} color="blue" />
          </Marker>
        )}

        {polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#FF0000" // Red color for the polyline
            strokeWidth={3} // Polyline width
          />
        )}
      </MapView>

      <TouchableOpacity onPress={openGoogleMaps}>
        <Text style={{ fontWeight: "600", fontSize: 17, color: "#e02e88" }}>
          Get Direction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PoliceStationMapCard;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
