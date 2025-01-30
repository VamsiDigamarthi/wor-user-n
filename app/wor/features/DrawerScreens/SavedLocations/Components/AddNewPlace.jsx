import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { fonts } from "../../../../fonts/Fonts";

const AddNewPlace = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        borderBottomWidth: 1,
        borderStyle: "dashed",
        paddingBottom: 15,
      }}
    >
      <TouchableOpacity style={{ backgroundColor: "#e0e0e0", borderRadius: 7 }}>
        <MaterialIcons name="add" size={24} color="#EA4C89" />
      </TouchableOpacity>
      <Text style={{ fontFamily: fonts.robotoRegular }}>Add New Place</Text>
    </View>
  );
};

export default AddNewPlace;

const styles = StyleSheet.create({});
