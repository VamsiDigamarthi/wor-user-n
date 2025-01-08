import { StyleSheet, Text, View } from "react-native";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Entypo,
} from "@expo/vector-icons";

const HomeLocationCard = ({
  location,
  vicinity,
  iconType,
  iconName = "home",
}) => {
  let Icon;
  switch (iconType) {
    case "MaterialCommunityIcons":
      Icon = MaterialCommunityIcons;
      break;
    case "FontAwesome":
      Icon = FontAwesome;
      break;
    case "Feather":
      Icon = Feather;
      break;
    case "AntDesign":
      Icon = AntDesign;
      break;
    case "Entypo":
      Icon = Entypo;
      break;
    default:
      Icon = FontAwesome;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          //   width: 40,
          //   height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon size={25} color="#e02e99" name={iconName} />
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#000" }}>
          {location}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "lightgray",
            flex: 1,
          }}
        >
          {vicinity}
        </Text>
      </View>
    </View>
  );
};

export default HomeLocationCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    padding: 10,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },
  card: {
    width: "90%",
    gap: 2,
    // backgroundColor: "yellow",
  },
});
