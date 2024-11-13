import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const SelectParcelType = () => {
  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item

  const data = [
    "Food",
    "Clothes",
    "Groceries",
    "Documents",
    "Electronics",
    "Medicine",
    "Others",
  ];

  const handlePress = (item) => {
    setSelectedItem(item); // Set the selected item when pressed
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <Text style={styles.text}>Select Parcel Type</Text>
        <Text style={{ color: "gray" }}>(optional)</Text>
      </View>
      <View style={styles.itemsContainer}>
        {data?.map((eachItem, index) => (
          <Pressable
            key={index}
            style={[
              styles.typeText,
              selectedItem === eachItem && styles.selectedTypeText, // Change background if selected
            ]}
            onPress={() => handlePress(eachItem)}
          >
            <Text
              style={[
                styles.typeTextText,
                selectedItem === eachItem && styles.selectedTypeTextColor,
              ]}
            >
              {eachItem}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default SelectParcelType;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    gap: 12,
    padding: 10,
  },
  innerCard: {
    width: "100%",
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemsContainer: {
    flexWrap: "wrap",
    gap: 10,
    flexDirection: "row",
  },
  typeText: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "600",
  },
  selectedTypeText: {
    backgroundColor: "#E02E88",
  },
  selectedTypeTextColor: {
    color: "#fff",
  },
  typeTextText: {
    color: "#000",
  },
});
