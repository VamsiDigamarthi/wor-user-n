import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fonts } from "../../../../fonts/Fonts";
import { StyleSheet } from "react-native";
const RadioItem = ({ label, checked, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(label)}>
      <View
        style={[
          styles.radioOuter,
          { borderColor: checked ? "#007BFF" : "#ccc" },
        ]}
      >
        {checked && <View style={styles.checked} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007BFF",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
    color: "gray",
  },
});
