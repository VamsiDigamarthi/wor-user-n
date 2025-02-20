import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { getPlaceName } from "../../../Constants/displaylocationmap";
import { useRoute } from "@react-navigation/native";
const MapPreview = ({ navigation }) => {
  const route = useRoute();
  const { pickUpCoordinated, placeName } = route.params;

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [
    finalSelecetLocationNameWithCoordinates,
    setFinalSelecetLocationNameWithCoordinates,
  ] = useState(null);

  const region = {
    latitude: pickUpCoordinated?.lat,
    longitude: pickUpCoordinated?.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const onLocation = async (e) => {
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude, longitude });
    let placeName = await getPlaceName(latitude, longitude);
    setFinalSelecetLocationNameWithCoordinates({
      location: { lat: latitude, lng: longitude },
      name: placeName,
    });
  };

  const savePickLocationHandle = useCallback(() => {
    if (finalSelecetLocationNameWithCoordinates) {
      //   navigation;
      navigation.navigate("ShowPrice", {
        placeName,
        pickUpCoordinated,
        dropDetails: finalSelecetLocationNameWithCoordinates,
      });
    }
  }, [navigation, finalSelecetLocationNameWithCoordinates]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <TouchableOpacity onPress={savePickLocationHandle}>
          <Ionicons name="save" size={25} color="#EA4C89" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, savePickLocationHandle]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={onLocation}>
      {selectedLocation && (
        <Marker
          title={finalSelecetLocationNameWithCoordinates?.name}
          coordinate={selectedLocation}
        />
      )}
    </MapView>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
