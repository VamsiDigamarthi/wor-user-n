import { useState } from "react";
import axios from "axios";

const GOOGLE_MAPS_APIKEY = "AIzaSyCNMAEsU6BwMrrXQRvAHw42i7gd8m6zv2g"; // Google Maps API Key

// Helper function to decode polyline
const decodePolyline = (t, precision = 5) => {
  let points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < t.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = t.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = t.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
};

// Custom hook to fetch route coordinates
const useFetchRouteCoordinates = (origin, destination) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [error, setError] = useState(null);

  const fetchRouteCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const points = decodePolyline(
          response.data.routes[0].overview_polyline.points
        );
        const coordinates = points.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(coordinates);
        return coordinates;
      } else {
        setError("No routes found between the selected locations");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch directions");
    }
  };

  return { fetchRouteCoordinates, routeCoordinates, error };
};

export default useFetchRouteCoordinates;
