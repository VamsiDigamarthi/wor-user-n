// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import MapView, { Marker, Polyline } from "react-native-maps";
// import { PinIcon } from "../../Icons/Icons";
// import { useSelector } from "react-redux";

// // Helper function to generate polyline coordinates approximating a circle
// const generateDashedCircleCoordinates = (lat, lng, radius, numberOfDashes) => {
//   const dashes = [];
//   const angleIncrement = (2 * Math.PI) / numberOfDashes;

//   for (let i = 0; i < numberOfDashes; i++) {
//     const startAngle = i * angleIncrement;
//     const endAngle = startAngle + angleIncrement / 2; // Create a gap for the dash

//     const startLat = lat + (radius / 111320) * Math.cos(startAngle);
//     const startLng =
//       lng +
//       (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
//         Math.sin(startAngle);

//     const endLat = lat + (radius / 111320) * Math.cos(endAngle);
//     const endLng =
//       lng +
//       (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
//         Math.sin(endAngle);

//     dashes.push([
//       { latitude: startLat, longitude: startLng },
//       { latitude: endLat, longitude: endLng },
//     ]);
//   }

//   return dashes;
// };

// const ChangeLocMapView = ({ newMarker, handleMarkerDragEnd }) => {
//   const { location, placeName, placeVicinity } = useSelector(
//     (state) => state.location
//   );
//   const { initialDropDetails, isBeforeBook } = useSelector(
//     (state) => state.allRideDetails
//   );

//   const { lat, lng } = isBeforeBook
//     ? location
//     : initialDropDetails?.location || {};

//   const dashedCircleCoordinates = generateDashedCircleCoordinates(
//     lat,
//     lng,
//     100,
//     60
//   ); // 60 dashes
// // console.log('dashedCircleCoordinates------',dashedCircleCoordinates)
// // console.log("newMarker------",newMarker);

//   return (
//     <MapView
//       style={styles.map}
//       initialRegion={{
//         latitude: Number(lat),
//         longitude: Number(lng),
//         latitudeDelta: 0.003,
//         longitudeDelta: 0.003,
//       }}
//       showsMyLocationButton={false}
//     >
//       <Marker
//         coordinate={{ latitude: Number(lat), longitude: Number(lng) }}
//         title={isBeforeBook ? placeName : initialDropDetails?.name}
//         description={
//           isBeforeBook ? placeVicinity : initialDropDetails?.vicinity
//         }
//       >
//         <PinIcon name="map-pin" size={30} color="#EA4C89" />
//       </Marker>

//       <Marker
//         coordinate={newMarker}
//         draggable
//         onDragEnd={handleMarkerDragEnd} // Track drag end
//         title="New Position"
//       >
//         <PinIcon name="map-pin" size={30} color="#2b8a3e" />
//       </Marker>

//       {/* Render dashed circle using multiple polylines */}
//       {dashedCircleCoordinates.map((dash, index) => (
//         <Polyline
//           key={index}
//           coordinates={dash}
//           strokeColor="#EA4c89"
//           strokeWidth={1}
//         />
//       ))}

//       <Polyline
//         coordinates={[
//           { latitude: Number(lat), longitude: Number(lng) },
//           {
//             latitude: Number(newMarker.latitude),
//             longitude: Number(newMarker.longitude),
//           },
//         ]}
//         strokeColor="#EA4C89"
//         strokeWidth={3}
//         lineDashPattern={[10, 5]}
//       />
//     </MapView>
//   );
// };

// export default ChangeLocMapView;

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject, // Ensures the map covers the entire container
//   },
// });

import { StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { PinIcon } from "../../Icons/Icons";
import { useSelector } from "react-redux";
import { computeDestinationPoint, getDistance } from "geolib";

// Function to generate polyline coordinates for dashed circle
const generateDashedCircleCoordinates = (lat, lng, radius, numberOfDashes) => {
  const dashes = [];
  const angleIncrement = (2 * Math.PI) / numberOfDashes;

  for (let i = 0; i < numberOfDashes; i++) {
    const startAngle = i * angleIncrement;
    const endAngle = startAngle + angleIncrement / 2;

    const startLat = lat + (radius / 111320) * Math.cos(startAngle);
    const startLng =
      lng +
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
        Math.sin(startAngle);

    const endLat = lat + (radius / 111320) * Math.cos(endAngle);
    const endLng =
      lng +
      (radius / (111320 * Math.cos((lat * Math.PI) / 180))) *
        Math.sin(endAngle);

    dashes.push([
      { latitude: startLat, longitude: startLng },
      { latitude: endLat, longitude: endLng },
    ]);
  }

  return dashes;
};

// Function to keep marker within 100-meter radius
const limitMarkerToCircle = (lat, lng, newLat, newLng, radius) => {
  const distance = getDistance(
    { latitude: lat, longitude: lng },
    { latitude: newLat, longitude: newLng }
  );

  if (distance <= radius) {
    return { latitude: newLat, longitude: newLng }; // Inside the circle, allow move
  } else {
    // Compute the closest valid position on the circle's edge
    const angle = Math.atan2(newLng - lng, newLat - lat);
    const limitedPosition = computeDestinationPoint(
      { latitude: lat, longitude: lng },
      radius, // Limit to 100 meters
      (angle * 180) / Math.PI
    );
    return {
      latitude: limitedPosition.latitude,
      longitude: limitedPosition.longitude,
    };
  }
};

const ChangeLocMapView = () => {
  const { location, placeName, placeVicinity } = useSelector(
    (state) => state.location
  );
  const { initialDropDetails, isBeforeBook } = useSelector(
    (state) => state.allRideDetails
  );

  const { lat, lng } = isBeforeBook
    ? location
    : initialDropDetails?.location || {};

  const dashedCircleCoordinates = generateDashedCircleCoordinates(
    lat,
    lng,
    100,
    60
  ); // 100m, 60 dashes

  // State to track marker position
  const [newMarker, setNewMarker] = useState({ latitude: lat, longitude: lng });

  // Handle Marker Drag
  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    // Restrict movement within 100 meters
    const validPosition = limitMarkerToCircle(
      lat,
      lng,
      latitude,
      longitude,
      100
    );
    setNewMarker(validPosition);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: Number(lat),
        longitude: Number(lng),
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
      showsMyLocationButton={false}
    >
      <Marker
        coordinate={{ latitude: Number(lat), longitude: Number(lng) }}
        title={isBeforeBook ? placeName : initialDropDetails?.name}
        description={
          isBeforeBook ? placeVicinity : initialDropDetails?.vicinity
        }
      >
        <PinIcon name="map-pin" size={30} color="#EA4C89" />
      </Marker>

      <Marker
        coordinate={newMarker}
        draggable
        onDragEnd={handleMarkerDragEnd} // Restrict drag movement
        title="New Position"
      >
        <PinIcon name="map-pin" size={30} color="#2b8a3e" />
      </Marker>

      {/* Render dashed circle using multiple polylines */}
      {dashedCircleCoordinates.map((dash, index) => (
        <Polyline
          key={index}
          coordinates={dash}
          strokeColor="#EA4c89"
          strokeWidth={1}
        />
      ))}

      <Polyline
        coordinates={[
          { latitude: Number(lat), longitude: Number(lng) },
          { latitude: newMarker.latitude, longitude: newMarker.longitude },
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
