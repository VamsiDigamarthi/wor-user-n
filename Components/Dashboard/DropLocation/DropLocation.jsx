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
  favoritePlaces,
  previousOrders,
}) => {
  const { handleNavigate, onNavigateToDirectPriceScreen } = useDropLocationHook(
    { placeName, nearbyPlaces, location, favoritePlaces, previousOrders }
  );

  function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return [arr[randomIndex]];
  }

  let randomFavoritePlace =
    favoritePlaces?.length > 0 ? getRandomElement(favoritePlaces) : [];

  function getRandomItems(arr, numItems) {
    if (numItems >= arr.length) {
      return arr;
    } else if (numItems === 1) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return [arr[randomIndex]];
    } else if (numItems > 1) {
      const randomIndex = Math.floor(
        Math.random() * (arr.length - numItems + 1)
      );
      return arr.slice(randomIndex, randomIndex + numItems);
    }
  }

  let randomTwoPreviousOrders =
    previousOrders?.length > 0 ? getRandomItems(previousOrders, 3) : [];

  let remainingPlaces = 3;
  if (randomFavoritePlace?.length) {
    remainingPlaces -= 1;
  }
  if (randomTwoPreviousOrders?.length) {
    remainingPlaces -= randomTwoPreviousOrders?.length;
  }

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
        {randomFavoritePlace?.length > 0 &&
          randomFavoritePlace?.map((eachPlace, key) => (
            <DropLocationItem
              mainPlace={eachPlace?.name}
              subPlace={eachPlace?.vicinity}
              eachPlace={eachPlace}
              key={key}
              onPress={onNavigateToDirectPriceScreen.bind(
                this,
                eachPlace,
                "favorite"
              )}
            />
          ))}
        {randomTwoPreviousOrders?.map((eachPlace, key) => (
          <DropLocationItem
            mainPlace={eachPlace?.dropAddress}
            subPlace={eachPlace?.dropVicinity}
            eachPlace={eachPlace}
            key={key}
            isPreviousOrder={true}
            onPress={onNavigateToDirectPriceScreen.bind(
              this,
              eachPlace,
              "previous"
            )}
          />
        ))}
        {nearByRandomItems.slice(0, remainingPlaces)?.map((eachPlace, key) => (
          <DropLocationItem
            mainPlace={eachPlace?.name}
            subPlace={eachPlace?.vicinity}
            eachPlace={eachPlace}
            key={key}
            onPress={onNavigateToDirectPriceScreen.bind(
              this,
              eachPlace,
              "nearby"
            )}
          />
        ))}
      </View>
    </View>
  );
};

export default DropLocation;

const styles = StyleSheet.create({
  allborder: { borderWidth: 1, borderColor: "red" },
  container: {
    width: "100%",
    position: "relative",
    height: 240,
    marginBottom: 8,
  },
  innerCard: {
    backgroundColor: "#fdfdfd",
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
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    gap: 10,
    // backgroundColor: "blue",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 1,
  },
  inputCard: {
    width: "100%",
    height: 55,
    // elevation: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    // elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    borderRadius: 30,
    // position: "absolute",
    zIndex: 3,
    backgroundColor: COLORS.desBackground,
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
