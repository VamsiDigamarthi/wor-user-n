import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { FavoritesIcons } from "../Icons/Icons";
import { useLocationItemHook } from "./LocationItem.hook";
import { useSelector } from "react-redux";
import { fonts } from "../fonts/Fonts";

const LocationItem = ({
  placeName,
  placeVicinity,
  eachPlace,
  iconType = Ionicons,
  iconName = "location-sharp",
  isFavoriteIconDisplay = false,
  onPress = () => {},
}) => {
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
        <View style={styles.first}>
          <Icon name={iconName} size={25} color="#e02e88" />
        </View>
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
});
