import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { coordinationMap } from "../../Constants/displaylocationmap";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import { customMapStyle } from "../../Constants/mapData";
import { FontAwesome } from "@expo/vector-icons";

const HomeMap = ({ location }) => {
  const mapRef = useRef(null);
  const isFocudes = useIsFocused();
  const [markers, setMarkers] = useState();
  const [newLocation, setNewLocation] = useState({
    lat: 17.4587331,
    lng: 78.3705363,
  });

  // console.log(location);
  const handleRegionComplete = () => {};

  const adjustedOrigin = {
    latitude: location?.lat,
    longitude: location?.lng,
  };

  useEffect(() => {
    setNewLocation(location);
    console.log(location);
  }, [location]);

  // if (!location || location==null) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text>No location data available</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.mapContainer}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          // maxZoomLevel={16}
          // minZoomLevel={12}
          poiClickEnabled={false}
          onRegionChangeStart={handleRegionComplete}
          initialRegion={{
            latitude: newLocation?.lat,
            longitude: newLocation?.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
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
          <Marker coordinate={adjustedOrigin} title="Start Point">
            <FontAwesome name="map-pin" size={20} color="#e02e88" />
          </Marker>
        </MapView>
      )}
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
    // resizeMode: "contain",
    flex: 1,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
