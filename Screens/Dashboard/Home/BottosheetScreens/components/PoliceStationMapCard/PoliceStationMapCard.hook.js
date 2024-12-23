import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
const decodePolyline = (encoded) => {
  let points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dLat = result & 0x01 ? ~(result >> 1) : result >> 1;
    lat += dLat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dLng = result & 0x01 ? ~(result >> 1) : result >> 1;
    lng += dLng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return points;
};

export const usePoliceStationMapCardHook = () => {
  const route = useRoute();
  const { location } = useSelector((state) => state.location);
  const { singlePoliceStation, presentUserCoordinates } = route.params || {};
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);
  const userCoordinates = presentUserCoordinates;
  const policeStationCoordinates = singlePoliceStation.geometry.location;

  const getDirections = async () => {
    const origin = `${userCoordinates.lat},${userCoordinates.lng}`;
    const destination = `${policeStationCoordinates.lat},${policeStationCoordinates.lng}`;

    const googleMapsApiKey = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8"; // Replace with your API key

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleMapsApiKey}`
      );

      if (response.data.status === "OK") {
        const points = decodePolyline(
          response.data.routes[0].overview_polyline.points
        );
        setPolylineCoordinates(points);
      } else {
        console.error("Error fetching directions:", response.data.status);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    getDirections();
  }, [userCoordinates, policeStationCoordinates]);

  const fetchLiveCoordinatedFromUser = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let currentLocation = await Location.getCurrentPositionAsync({});
      // console.log(currentLocation);
      setLiveLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching live location:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLiveCoordinatedFromUser();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [location]);

  return {
    singlePoliceStation,
    polylineCoordinates,
    userCoordinates,
    policeStationCoordinates,
    location,
    liveLocation,
  };
};
