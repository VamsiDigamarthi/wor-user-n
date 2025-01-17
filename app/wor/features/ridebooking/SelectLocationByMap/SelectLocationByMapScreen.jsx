import { StyleSheet, Text, View } from "react-native";

import { useSelectLocationByMapScreenHook } from "./hooks/SelectLocationByMapScreen.hook";
import MapWithFixedMarker from "./components/MapWithFixedMarker";

const SelectLocationByMapScreen = () => {
  const { mapRegion } = useSelectLocationByMapScreenHook();
  return (
    <View style={styles.container}>
      {mapRegion ? (
        <MapWithFixedMarker mapRegion={mapRegion} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default SelectLocationByMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  coordinatesContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 8,
    gap: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 5,
  },
  coordinatesText: {
    fontSize: 16,
    color: "#e02d88",
    textAlign: "center",
  },
  marker: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    // backgroundColor: "red",
  },
  coordinateFirstCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 20,
    fontWeight: "600",
  },
  changeTextBtnCard: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  coordinateAddressCard: {
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  coorlocationCard: {
    width: "90%",
  },
});
