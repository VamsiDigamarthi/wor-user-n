import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import bikeImg from "../../../assets/bike.png";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Map3Btns from "./Map3Btn";
import MapModalUi from "../features/ridebooking/home/modals/MapModalUi";
import { useSelector } from "react-redux";

export default function PollyLineNew({
  selectedVehicleType,
  origin,
  destination,
  height,
  otpVerified,
  newLiveCoordinates,
  markerRef,
}) {
  const mapref = useRef(null);

  const [isZoomedOut, setIsZoomedOut] = useState(false); // Track zoom state

  const startPoint = {
    latitude: origin?.lat || 0,
    longitude: origin?.lng || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const endPoint = {
    latitude: destination?.lat || 0,
    longitude: destination?.lng || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleResetZoom = useCallback(() => {
    if (mapref.current) {
      if (isZoomedOut) {
        // Zoom in to the start point
        mapref.current.animateToRegion(
          {
            latitude: newLiveCoordinates
              ? newLiveCoordinates.latitude
              : startPoint.latitude,
            longitude: newLiveCoordinates
              ? newLiveCoordinates.longitude
              : startPoint.longitude,
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
          },
          {
            latitude: endPoint.latitude,
            longitude: endPoint.longitude,
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
        {/* Start Point Marker */}
        {!newLiveCoordinates && (
          <Marker coordinate={startPoint} title="Start Point">
            <FontAwesome name="map-pin" size={15} color="#EA4C89" />
          </Marker>
        )}

        {/* End Point Marker */}
        <Marker coordinate={endPoint} title="End Point">
          <FontAwesome name="map-pin" size={15} color="green" />
        </Marker>

        {/* Animated Marker for Live Coordinates */}
        {newLiveCoordinates &&
          typeof newLiveCoordinates.latitude === "number" &&
          typeof newLiveCoordinates.longitude === "number" && (
            <Marker.Animated
              coordinate={
                newLiveCoordinates || startPoint // Fallback to startPoint if invalid
              }
              ref={markerRef}
            >
              <Image
                source={bikeImg}
                style={[
                  styles.icon,
                  {
                    transform: [
                      {
                        rotate: `${
                          typeof newLiveCoordinates.heading === "number"
                            ? newLiveCoordinates.heading
                            : 0
                        }deg`,
                      },
                    ],
                  },
                ]}
              />
            </Marker.Animated>
          )}

        {/* Directions Polyline */}
        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          origin={
            newLiveCoordinates?.latitude ? newLiveCoordinates : startPoint
          }
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

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  btn: {
    position: "absolute",
    top: 50,
  },
});
