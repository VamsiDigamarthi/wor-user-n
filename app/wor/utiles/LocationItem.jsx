import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { FavoritesIcons } from "../Icons/Icons";
import { useLocationItemHook } from "./LocationItem.hook";
import { useSelector } from "react-redux";
import { fonts } from "../fonts/Fonts";

import { recentPlaces } from "../Images/DrawerImages";
const LocationItem = ({
  placeName,
  placeVicinity,
  eachPlace,
  iconType = Ionicons,
  iconName = "location-sharp",
  isFavoriteIconDisplay = false,
  onPress = () => {},
  isFavoritePlaces,
  isHomePlaceOrWork = "near",
}) => {
  const { homePlace, workPlace } = useSelector((state) => state.homePlaces);

  const { favoritePlaces } = useSelector((state) => state.favoritePlaces);
  const { addedFavoritePlace } = useLocationItemHook();

  const isFavorite = favoritePlaces?.some(
    (place) => place.name === eachPlace?.name
  );

  let Icon;
  switch (iconType) {
    case "Ionicons":
      Icon = Ionicons;
      break;
    case "MaterialIcons":
      Icon = MaterialIcons;
      break;
    case "Entypo":
      Icon = Entypo;
      break;
    default:
      Icon = Ionicons;
  }

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#f7e1ec",
          borderless: false,
        }}
        style={styles.pressableCard}
        onPress={onPress}
      >
        {!isFavoritePlaces && (
          <View style={styles.first}>
            {isHomePlaceOrWork === "near" && (
              <Image source={recentPlaces} style={styles.icon} />
            )}
            {isHomePlaceOrWork === "work" && (
              <>
                {workPlace ? (
                  <Icon name={iconName} size={20} color="#e02e88" />
                ) : (
                  <Image source={recentPlaces} style={styles.icon} />
                )}
              </>
            )}
            {isHomePlaceOrWork === "home" && (
              <>
                {homePlace ? (
                  <Icon name={iconName} size={20} color="#e02e88" />
                ) : (
                  <Image source={recentPlaces} style={styles.icon} />
                )}
              </>
            )}
          </View>
        )}
        <View style={styles.second}>
          <Text style={styles.locText} numberOfLines={1} ellipsizeMode="tail">
            {placeName}
          </Text>
          <Text
            style={styles.subLocText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {placeVicinity}
          </Text>
        </View>
      </Pressable>
      {isFavoriteIconDisplay && (
        <Pressable
          style={styles.favorite}
          onPress={() => addedFavoritePlace(eachPlace)}
        >
          <FavoritesIcons
            size={22}
            color={isFavorite ? "#e02e88" : "#808080"}
          />
        </Pressable>
      )}
    </View>
  );
};

export default LocationItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "red",
    flexDirection: "row",
    position: "relative",

    // marginVertical: 2,
  },
  pressableCard: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignItems: "center",
    position: "relative",
    borderColor: "#fff",
    paddingVertical: 5,
  },
  first: {
    width: 35,
    height: 35,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  second: {
    width: "90%",
    gap: 5,
  },
  locText: {
    fontSize: 13,
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
  },
  subLocText: {
    fontSize: 11,
    color: "#666666",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontFamily: fonts.robotoRegular,
  },
  favorite: {
    position: "absolute",
    top: 2,
    right: 3,
  },
  icon: {
    height: 18,
    width: 18,
  },
});
