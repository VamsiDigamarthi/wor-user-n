import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const MapPreview = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const region = {
    latitude: 17.4579453,
    longitude: 78.3745024,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onLocation = (e) => {
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude, longitude });
  };

  const savePickLocationHandle = useCallback(() => {
    if (selectedLocation) {
      //   navigation;
    }
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <TouchableOpacity onPress={savePickLocationHandle}>
          <Ionicons name="save" size={25} color="#e02e88" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={onLocation}>
      {selectedLocation && (
        <Marker title="Pick Location" coordinate={selectedLocation} />
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
