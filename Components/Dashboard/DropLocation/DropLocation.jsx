import { Pressable, StyleSheet, Text, View } from "react-native";
import DropLocationItem from "./Components/DropLocationItem/DropLocationItem";
import { useDropLocationHook } from "./DropLocation.hook";
import { FontAwesome } from "@expo/vector-icons";
const DropLocation = ({
  nearByRandomItems,
  placeName,
  nearbyPlaces,
  location,
  activeOrder,
}) => {
  const { handleNavigate, onNavigateToDirectPriceScreen } = useDropLocationHook(
    { placeName, nearbyPlaces, location, activeOrder }
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputCard} onPress={handleNavigate}>
        <FontAwesome
          name="location-arrow"
          style={{ marginRight: 5 }}
          size={27}
          color="#E02E88"
        />
        <View style={styles.inputTypeCard}>
          <Text>Destination Location</Text>
        </View>
        <View style={styles.miceIconcard}>
          <FontAwesome size={26} color="#e02e88" name="microphone" />
        </View>
      </Pressable>
      <View style={styles.innerCard}>
        {nearByRandomItems?.map((eachPlace, key) => (
          <DropLocationItem
            mainPlace={eachPlace?.name}
            subPlace={eachPlace?.vicinity}
            eachPlace={eachPlace}
            key={key}
            onPress={onNavigateToDirectPriceScreen.bind(this, eachPlace)}
          />
        ))}
      </View>
    </View>
  );
};

export default DropLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    height: 250,
    elevation: 1,

    // gap: 10,
  },
  innerCard: {
    backgroundColor: "#fff",
    padding: 10,
    overflow: "hidden",
    height: 230,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 2,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    gap: 10,
  },
  inputCard: {
    width: "100%",
    height: 56,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    borderRadius: 30,
    position: "absolute",
    zIndex: 3,
  },
  inputTypeCard: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
  },
  miceIconcard: {
    width: 40,
    height: 40,
    // backgroundColor: "red",
    position: "absolute",
    top: 6,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
});
