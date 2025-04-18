import React, { useCallback, useEffect, useRef, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { customMapStyle } from "../../../Constants/mapData";
import useFetchRouteCoordinates from "./ShowPollyLine.services";
import { calculateBearing } from "../../../Constants/displaylocationmap";

import Map3Btns from "./Map3Btn";
import MapModalUi from "../features/ridebooking/home/modals/MapModalUi";

import { MaterialIcons } from "@expo/vector-icons";

const ShowPollyLine = ({
  origin,
  destination,
  height,
  liveCoordinates,
  selectedVehicleType,
}) => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: liveCoordinates?.lat,
    longitude: liveCoordinates?.lng,
  });

  const mapRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const [isZoomedOut, setIsZoomedOut] = useState(false); // Track zoom state

  const adjustedOrigin = { latitude: origin?.lat, longitude: origin?.lng };
  const adjustedDestination = {
    latitude: destination?.lat,
    longitude: destination?.lng,
  };

  const initialRegion = {
    latitude: adjustedOrigin?.latitude,
    longitude: adjustedOrigin?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const { fetchRouteCoordinates, routeCoordinates, error } =
    useFetchRouteCoordinates(origin, destination);

  useEffect(() => {
    const fetchData = async () => {
      const coordinates = await fetchRouteCoordinates();
      fitMapToCoordinates(coordinates);
    };
    fetchData();
  }, [origin, destination]);

  const fitMapToCoordinates = (coordinates) => {
    if (mapRef.current && coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (liveCoordinates?.lat) {
      // Calculate the heading based on current and previous position
      const newHeading = calculateBearing(currentPosition, liveCoordinates);

      setCurrentPosition({
        latitude: liveCoordinates.lat,
        longitude: liveCoordinates.lng,
      });

      // setHeading(newHeading); // Update the heading state
    }
  }, [liveCoordinates]);

  useEffect(() => {
    if (mapRef.current) {
      const zoomLevel = height > 600 ? 0.01 : 0.05;
      mapRef.current.animateToRegion(
        {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        },
        1000
      );
    }
  }, [height]);

  // OLD handle reset zoom

  // const handleResetZoom = useCallback(() => {
  //   if (mapRef.current && initialRegion) {
  //     mapRef.current.animateToRegion(initialRegion, 800);
  //   }
  // }, [initialRegion]);
  // console.log("heading", heading);

  // New Handlereset zoom

  const handleResetZoom = useCallback(() => {
    if (mapRef.current) {
      if (isZoomedOut) {
        // Zoom in to the start point
        mapRef.current.animateToRegion(
          {
            latitude: adjustedOrigin.latitude,
            longitude: adjustedOrigin.longitude,
            latitudeDelta: 0.005, // Smaller delta for zoomed-in view
            longitudeDelta: 0.005,
          },
          800
        );
      } else {
        // Zoom out to fit the entire route
        const coordinates = [
          {
            latitude: adjustedOrigin.latitude,
            longitude: adjustedOrigin.longitude,
          },
          {
            latitude: adjustedDestination.latitude,
            longitude: adjustedDestination.longitude,
          },
        ];
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
      setIsZoomedOut((prev) => !prev); // Toggle the zoom state
    }
  }, [isZoomedOut, adjustedOrigin, adjustedDestination]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
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
        {/* Markers */}
        <Marker coordinate={adjustedOrigin} title="Start Point">
          <FontAwesome name="map-pin" size={20} color="#EA4C89" />
        </Marker>
        <Marker coordinate={adjustedDestination} title="End Point">
          <FontAwesome name="map-pin" size={20} color="#4caf50" />
        </Marker>
        {/* <Marker coordinate={adjustedDestination} title="End Point">

          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              // transform: [{ rotate: `${heading}deg` }], // Rotate the bike image
            }}
            source={selectedVehicleType === "car" ? require("../../../assets/images/HomeServiceImages/cab.png")
              : selectedVehicleType === "bookany" ? require("../../../assets/images/HomeServiceImages/cab.png")
                : selectedVehicleType === "auto" ? require("../../../assets/images/HomeServiceImages/auto.png")
                  : selectedVehicleType === "wor-premium" ? require("../../../assets/images/HomeServiceImages/cab.png")
                    : require("../../../assets/images/HomeServiceImages/scooty.png")}
          />
        </Marker> */}
        {currentPosition?.latitude && (
          <Marker coordinate={currentPosition} title="Live Position">
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                // transform: [{ rotate: `${heading}deg` }], // Rotate the bike image
              }}
              // source={require("../../../assets/images/markers/BIKE-removebg-preview.png")}
              source={
                selectedVehicleType === "car"
                  ? require("../../../assets/images/HomeServiceImages/cab.png")
                  : selectedVehicleType === "bookany"
                  ? require("../../../assets/images/HomeServiceImages/cab.png")
                  : selectedVehicleType === "auto"
                  ? require("../../../assets/images/HomeServiceImages/auto.png")
                  : selectedVehicleType === "wor-premium"
                  ? require("../../../assets/images/HomeServiceImages/cab.png")
                  : require("../../../assets/images/HomeServiceImages/scooty.png")
              }
            />
          </Marker>
        )}

        {/* Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#EA4C89"
          strokeWidth={2}
        />

        {/* <View style={[styles.singleIconsCard, styles.zoomContainer]}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleResetZoom}>
            <MaterialIcons name="my-location" size={25} color="#EA4C89" />
          </TouchableOpacity>
        </View> */}
      </MapView>

      <Map3Btns
        handleOpenSafetyModal={() => setToggle((prev) => !prev)}
        handleZoomToggle={handleResetZoom}
        // mapIconsTop={0}
      />

      {toggle && <MapModalUi toggle={toggle} setToggle={setToggle} />}
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
    bottom: 200,
  },
  zoomContainer: {
    gap: 10,
    position: "absolute",
    top: 350,
    right: 20,
  },
});
