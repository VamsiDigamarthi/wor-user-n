import { StyleSheet, Text, View } from "react-native";

const ParcelSpecification = () => {
  let data = [
    {
      name: "Parcel Weights 10kgs or Less",
    },
    {
      name: "No Illegal, alcohol or restricted items",
    },
    {
      name: "Item should fit in a backpack",
    },
    {
      name: "Avoid sending high value & Fragile items",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fit these specifications:</Text>
      {data?.map((eachItem, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.innerCard}></View>
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
    fontWeight: "600",
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
    backgroundColor: "#e02e88",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },
});
