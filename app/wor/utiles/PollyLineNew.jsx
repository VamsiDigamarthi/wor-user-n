import React, { useCallback, useEffect, useRef, useState } from "react";
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
import bikeImg from "../../../assets/images/markers/BIKE-removebg-preview.png";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Map3Btns from "./Map3Btn";
import MapModalUi from "../features/ridebooking/home/modals/MapModalUi";
import { useDispatch, useSelector } from "react-redux";
import RouteChangeAlertModal from "./RouteChangeAlertModal/RouteChangeAlertModal";
import { getDistance } from "geolib";
import { wrongRouteSafeAndSecure } from "./RouteChangeAlertModal/RouteChangeAlertModal.services";
import { setPollylineCoordinates } from "../features/ridebooking/sharedLogics/rideDetailsSlice";
import SafetyToolModals from "../features/ridebooking/home/modals/SafetyToolModals/SafetyToolModals";

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
  const dispatch = useDispatch();

  const { completeRideDetails } = useSelector((state) => state.allRideDetails);
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);

  const [toggle, setToggle] = useState(false);
  const [isZoomedOut, setIsZoomedOut] = useState(false); // Track zoom state

  const [routeMapToggle, setRouteMapToggle] = useState(false);

  const lastPositionRef = useRef(null);
  const stationaryTimerRef = useRef(null);

  useEffect(() => {
    if (completeRideDetails && otpVerified) {
      let findUser = completeRideDetails?.changeRoute?.find(
        (user) => user.user === profile?._id
      );
      setRouteMapToggle(findUser?.change ?? false);
    }
  }, [completeRideDetails]);

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

  const handleSetPollyLineCoordinates = (coordinates) => {
    if (completeRideDetails?.pollyLineCoordinates?.length > 0) return;
    dispatch(setPollylineCoordinates(coordinates));
  };

  const isOffRoute = (userLocation, polylineCoords, threshold = 50) => {
    let minDistance = Infinity;

    polylineCoords?.forEach((coord) => {
      const distance = getDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: coord.latitude, longitude: coord.longitude }
      );
      minDistance = Math.min(minDistance, distance);
    });

    return minDistance > threshold; // Returns true if user is off-route
  };

  const checkWrongRoute = async () => {
    if (
      newLiveCoordinates &&
      completeRideDetails?.polltLineCoordinates?.length > 0 &&
      completeRideDetails &&
      otpVerified
    ) {
      if (
        isOffRoute(
          newLiveCoordinates,
          completeRideDetails?.polltLineCoordinates
        )
      ) {
        setRouteMapToggle(true);
        const data = await wrongRouteSafeAndSecure({
          orderId: completeRideDetails?._id,
          token: token,
        });
      }
    }
  };

  // useEffect(() => {
  //   checkWrongRoute();
  // }, [newLiveCoordinates, completeRideDetails, otpVerified]);

  // useEffect(() => {
  //   if (newLiveCoordinates && otpVerified && completeRideDetails) {
  //     const { latitude, longitude } = newLiveCoordinates;

  //     if (!lastPositionRef.current) {
  //       lastPositionRef.current = {
  //         latitude,
  //         longitude,
  //         timestamp: Date.now(),
  //       };
  //       return;
  //     }

  //     const distance = getDistance(
  //       { latitude, longitude },
  //       {
  //         latitude: lastPositionRef.current.latitude,
  //         longitude: lastPositionRef.current.longitude,
  //       }
  //     );

  //     if (distance <= 5) {
  //       if (!stationaryTimerRef.current) {
  //         stationaryTimerRef.current = setTimeout(() => {
  //           setRouteMapToggle(true);
  //         }, 5 * 60 * 1000); // 5 minutes
  //       }
  //     } else {
  //       lastPositionRef.current = {
  //         latitude,
  //         longitude,
  //         timestamp: Date.now(),
  //       };
  //       clearTimeout(stationaryTimerRef.current);
  //       stationaryTimerRef.current = null;
  //       setRouteMapToggle(false);
  //     }
  //   }

  //   return () => clearTimeout(stationaryTimerRef.current);
  // }, [newLiveCoordinates, otpVerified, completeRideDetails]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={startPoint}
          ref={mapref}
        >
          {!newLiveCoordinates && (
            <Marker coordinate={startPoint} title="Start Point">
              <FontAwesome name="map-pin" size={15} color="#EA4C89" />
            </Marker>
          )}

          <Marker coordinate={endPoint} title="End Point">
            <FontAwesome name="map-pin" size={15} color="green" />
          </Marker>

          {newLiveCoordinates &&
            typeof newLiveCoordinates.latitude === "number" &&
            typeof newLiveCoordinates.longitude === "number" && (
              <Marker.Animated
                coordinate={
                  newLiveCoordinates || startPoint // Fallback to startPoint if invalid
                }
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

          <MapViewDirections
            apikey={GOOGLE_MAPS_APIKEY}
            origin={
              newLiveCoordinates?.latitude ? newLiveCoordinates : startPoint
            }
            destination={endPoint}
            strokeWidth={2}
            strokeColor="#EA4C89"
            optimizeWaypoints={true}
            onReady={(result) => {
              // setRouteCoordinates(result.coordinates);
              handleSetPollyLineCoordinates(result.coordinates);
            }}
          />
        </MapView>
        <Map3Btns
          handleOpenSafetyModal={() => {
            setToggle(!toggle);
          }}
          handleZoomToggle={handleResetZoom}
          mapIconsTop={200}
        />
        {/* {toggle && <MapModalUi setToggle={setToggle} toggle={toggle} />} */}
        {toggle && <SafetyToolModals toggle={toggle} setToggle={setToggle} />}
      </View>
      <RouteChangeAlertModal
        openCloseState={routeMapToggle && otpVerified}
        // openCloseState={true}
        setRouteMapTToggle={setRouteMapToggle}
      />
    </>
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
