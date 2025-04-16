import { StyleSheet, Text, View } from "react-native";

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
} from "@expo/vector-icons";
import { fonts } from "../../../fonts/Fonts";

const ParcelSpecification = () => {
  let data = [
    {
      name: "Parcel weights 10Kg or less",
      icon: (
        <MaterialCommunityIcons
          name="weight-kilogram"
          size={24}
          color="white"
        />
      ),
    },
    {
      name: "No illegal,alcohol or restricted items",
      icon: <AntDesign name="warning" size={24} color="white" />,
    },
    {
      name: "Item should fit in a Bagpack",
      icon: (
        <MaterialCommunityIcons name="bag-personal" size={24} color="white" />
      ),
    },

    {
      name: "Avoid Sending High Value and Fragile Items",
      icon: <FontAwesome6 name="wine-glass-empty" size={24} color="white" />,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fit these specifications:</Text>
      {data?.map((eachItem, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.innerCard}>{eachItem.icon}</View>
          <Text style={styles.itemText}>{eachItem?.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default ParcelSpecification;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    gap: 12,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  innerCard: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#EA4C89",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 13,
    fontFamily: fonts.robotoMedium,
    flex: 1,
    flexWrap: "wrap",
  },
});
