import { Pressable, StyleSheet, Text, View } from "react-native";
import DropLocationItem from "./Components/DropLocationItem/DropLocationItem";
import { useDropLocationHook } from "./DropLocation.hook";
import { FontAwesome } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import ContentLoader, { Rect } from "react-content-loader/native";

const DropLocation = ({
  nearByRandomItems,
  placeName,
  nearbyPlaces,
  location,
  homeLocations,
  workLocation,
}) => {
  const { handleNavigate, onNavigateToDirectPriceScreen } = useDropLocationHook(
    { placeName, nearbyPlaces, location, homeLocations, workLocation }
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
          <FontAwesome size={22} color="#EA4C89" name="microphone" />
        </Pressable>
      </View>
      <View style={[styles.innerCard]}>
        <DropLocationItem
          mainPlace={nearByRandomItems?.[0]?.name}
          subPlace={nearByRandomItems?.[0]?.vicinity}
          eachPlace={nearByRandomItems?.[0]}
          onPress={onNavigateToDirectPriceScreen.bind(
            this,
            nearByRandomItems?.[0]
          )}
        />
        <DropLocationItem
          mainPlace={
            homeLocations ? homeLocations.name : nearbyPlaces?.[1]?.name
          }
          subPlace={
            homeLocations ? homeLocations.vicinity : nearbyPlaces?.[1]?.vicinity
          }
          eachPlace={nearbyPlaces?.[1]}
          onPress={onNavigateToDirectPriceScreen.bind(this, nearbyPlaces?.[1])}
          iconType={homeLocations ? "Entypo" : "Ionicons"}
          iconName={homeLocations ? "home" : "location-sharp"}
        />
        <DropLocationItem
          mainPlace={
            workLocation ? workLocation?.name : nearbyPlaces?.[2]?.name
          }
          subPlace={
            workLocation ? workLocation?.vicinity : nearbyPlaces?.[2]?.vicinity
          }
          eachPlace={nearbyPlaces?.[2]}
          onPress={onNavigateToDirectPriceScreen.bind(this, nearbyPlaces?.[2])}
          iconType={workLocation ? "MaterialIcons" : "Ionicons"}
          iconName={workLocation ? "work" : "location-sharp"}
        />
      </View>
    </View>
  );
};

export default DropLocation;

const SkeletonLoader = () => {
  return (
    <View style={styles.SkeletonLoader}>
      <ContentLoader
        speed={2}
        width="98%" // Bar width (adjust as needed)
        height={20} // Bar height
        backgroundColor="#e0e0e0"
        foregroundColor="#f5f5f5"
      >
        <Rect x="0" y="0" rx="8" ry="8" width="100%" height="20" />
      </ContentLoader>
    </View>
  );
};

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

  SkeletonLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginHorizontal: 20,

    width: "100%",
  },
});
