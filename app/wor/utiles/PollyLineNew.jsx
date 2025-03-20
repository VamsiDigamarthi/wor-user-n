import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import bikeImg from "../../../assets/bike.png";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Map3Btns from "./Map3Btn";
import MapModalUi from "../features/ridebooking/home/modals/MapModalUi";
export default function PollyLineNew({
  selectedVehicleType,
  origin,
  destination,
  liveCoordinates,
  height,
  otpVerified,
}) {
  const mapref = useRef(null);
  const markerRef = useRef(null);

  console.log(otpVerified, "---------------------");

  const [isZoomedOut, setIsZoomedOut] = useState(false); // Track zoom state

  const startPoint = {
    latitude: origin.lat || 0,
    longitude: origin.lng || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const endPoint = {
    latitude: destination.lat || 0,
    longitude: destination.lng || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [liveLoc, setLiveloc] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
    heading: 0,
  });

  const captainLive = {
    latitude: liveCoordinates?.lat || 0,
    longitude: liveCoordinates?.lng || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
    heading: 0,
  };

  const getLiveLocation = async () => {
    if (otpVerified) {
      console.log(otpVerified, "---------otpveri");
      const currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation, "-------------currentLocation");

      animateTheMarker(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );

      setLiveloc({
        ...liveLoc,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        heading: currentLocation.coords.heading,
      });
    }
  };

  const animateTheMarker = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };

    if (markerRef.current) {
      if (Platform.OS === "android") {
        // Android-specific smooth animation
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 4500);
      }
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      getLiveLocation();
    }, 3000);

    return () => clearInterval(id);
  });

  const handleResetZoom = useCallback(() => {
    if (mapref.current) {
      if (isZoomedOut) {
        // Zoom in to the start point
        mapref.current.animateToRegion(
          {
            latitude: startPoint.latitude,
            longitude: startPoint.longitude,
            latitudeDelta: 0.015, // Smaller delta for zoomed-in view
            longitudeDelta: 0.015,
          },
          800
        );
      } else {
        // Zoom out to fit the entire route
        const coordinates = [
          {
            latitude: startPoint.latitude,
            longitude: startPoint.longitude,
            latitudeDelta: 0.005, // Smaller delta for zoomed-out
            longitudeDelta: 0.005, // Smaller delta for zoomed
          },
          {
            latitude: endPoint.latitude,
            longitude: endPoint.longitude,
            latitudeDelta: 0.005, // Smaller delta for zoomed-out
            longitudeDelta: 0.005, // Smaller delta for zoomed
          },
        ];
        mapref.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
          animated: true,
        });
      }
      setIsZoomedOut((prev) => !prev); // Toggle the zoom state
    }
  }, [isZoomedOut, startPoint, endPoint]);

  const [toggle, setToggle] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={startPoint}
        ref={mapref}
      >
        <Marker coordinate={startPoint} title="Start Point">
          <FontAwesome name="map-pin" size={15} color="#EA4C89" />
        </Marker>

        <Marker coordinate={endPoint} title="End Point">
          <FontAwesome name="map-pin" size={15} color="green" />
        </Marker>

        <Marker.Animated
          coordinate={otpVerified ? liveLoc : captainLive}
          ref={markerRef}
        >
          <Image
            source={bikeImg}
            style={[
              style.icon,
              {
                transform: `rotate(${
                  otpVerified ? liveLoc.heading : captainLive.heading || 0
                }deg)`,
              },
            ]}
          />
        </Marker.Animated>

        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          origin={otpVerified ? liveLoc : startPoint}
          destination={endPoint}
          strokeWidth={2}
          strokeColor="#EA4C89"
          optimizeWaypoints={true}
        />
      </MapView>
      <Map3Btns
        handleOpenSafetyModal={() => {
          setToggle(!toggle);
        }}
        handleZoomToggle={handleResetZoom}
        mapIconsTop={200}
      />
      {toggle && <MapModalUi setToggle={setToggle} toggle={toggle} />}
    </View>
  );
}

const style = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    // backgroundColor: "red",
  },
  btn: {
    position: "absolute",
    top: 50,
  },
});
