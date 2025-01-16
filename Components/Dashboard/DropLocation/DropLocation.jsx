import { Pressable, StyleSheet, Text, View } from "react-native";
import DropLocationItem from "./Components/DropLocationItem/DropLocationItem";
import { useDropLocationHook } from "./DropLocation.hook";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../Constants/colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
const DropLocation = ({
  nearByRandomItems,
  placeName,
  nearbyPlaces,
  location,
}) => {
  const { handleNavigate, onNavigateToDirectPriceScreen } = useDropLocationHook(
    { placeName, nearbyPlaces, location }
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.inputCard]}>
        <Pressable
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "80%",
              // backgroundColor: "red",
            },
          ]}
          onPress={handleNavigate.bind(this, false)}
        >
          <Fontisto name="search" size={22} color="black" />
          <View style={[styles.inputTypeCard]}>
            <Text
              style={{
                fontWeight: "800",
                fontSize: 15,
                color: "gray",
              }}
            >
              Search Destination
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={handleNavigate.bind(this, true)}
          style={[styles.miceIconcard]}
        >
          <FontAwesome size={22} color="#e02e88" name="microphone" />
        </Pressable>
      </View>
      <View style={[styles.innerCard]}>
        <DropLocationItem
          mainPlace={nearByRandomItems?.[0]?.name}
          subPlace={nearByRandomItems?.[0]?.vicinity}
          eachPlace={nearByRandomItems?.[0]}
          onPress={onNavigateToDirectPriceScreen.bind(
            this,
            nearByRandomItems?.[0],
            "nearby"
          )}
        />
        <DropLocationItem
          mainPlace={nearbyPlaces?.[0]?.name}
          subPlace={nearbyPlaces?.[0]?.vicinity}
          eachPlace={nearbyPlaces?.[0]}
          onPress={onNavigateToDirectPriceScreen.bind(
            this,
            nearbyPlaces?.[0],
            "nearby"
          )}
        />
        <DropLocationItem
          mainPlace={nearbyPlaces?.[0]?.name}
          subPlace={nearbyPlaces?.[0]?.vicinity}
          eachPlace={nearbyPlaces?.[0]}
          onPress={onNavigateToDirectPriceScreen.bind(
            this,
            nearbyPlaces?.[0],
            "nearby"
          )}
        />
      </View>
    </View>
  );
};

export default DropLocation;

const styles = StyleSheet.create({
  allborder: { borderWidth: 1, borderColor: "red" },
  container: {
    width: "100%",
  },
  innerCard: {
    backgroundColor: "#fff",
    padding: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "100%",
    zIndex: 2,
    gap: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 1,
    borderBottomColor: "gray",
    overflow: "hidden",
  },
  inputCard: {
    height: 55,
    borderRadius: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    borderRadius: 30,

    marginHorizontal: "auto",

    width: "97%",
    marginHorizontal: "auto",
    // position: "absolute",

    zIndex: 3,
    backgroundColor: "#ebebeb",
  },
  inputTypeCard: {
    width: "80%",
    height: "100%",
    // backgroundColor: "red",
    // justifyContent: "center",
  },
  miceIconcard: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 40,
    position: "absolute",
    top: 5,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
});
