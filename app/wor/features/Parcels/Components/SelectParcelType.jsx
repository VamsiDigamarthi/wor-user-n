import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../../../../Constants/colors";
import { useDispatch } from "react-redux";
import { setParcelType } from "../../ridebooking/sharedLogics/rideDetailsSlice";
import { fonts } from "../../../fonts/Fonts";

const SelectParcelType = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item
  const [isOtherOpenTextField, setIsOtherOpenTextField] = useState(false);
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
    if (item === "Others") {
      setIsOtherOpenTextField(true);
    } else {
      setIsOtherOpenTextField(false);
    }
    dispatch(setParcelType(item));

    setSelectedItem(item); // Set the selected item when pressed
  };

  const onTextChange = async (text) => {
    if (text?.length === 0) {
      dispatch(setParcelType(item));
    }
    dispatch(setParcelType(text));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <Text style={styles.text}>Select Parcel Type</Text>
        {/* <Text style={{ color: "gray" }}>(optional)</Text> */}
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
      {isOtherOpenTextField && (
        <View style={{ width: "100%" }}>
          <TextInput
            placeholder="Write Item Category (optional)"
            style={styles.input}
            onChangeText={onTextChange}
          />
        </View>
      )}
    </View>
  );
};

export default SelectParcelType;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
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
    fontFamily: fonts.robotoSemiBold,
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
    backgroundColor: "#EA4C89",
    fontFamily: fonts.robotoMedium,
  },
  selectedTypeTextColor: {
    color: "#fff",
  },
  typeTextText: {
    color: "#000",
    fontFamily: fonts.robotoRegular,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: fonts.robotoRegular,
  },
});
