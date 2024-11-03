import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo vector icons

const CustomAppBar = ({ navigation }) => {
  return (
    <View style={styles.appBarContainer}>
      {/* Drawer Icon on the left */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#e02e88" />
      </TouchableOpacity>

      {/* Center: TextInput with Location Icon */}
      <View style={styles.locationInputContainer}>
        <Ionicons name="location-sharp" size={20} color="lightgray" />
        <TextInput placeholder="Enter location" style={styles.locationInput} />
      </View>

      {/* Love Icon on the right */}
      <TouchableOpacity onPress={() => alert("Love icon pressed!")}>
        <Ionicons name="heart-outline" size={24} color="lightgray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
    borderWidth: 1, // Apply border to all sides
    borderColor: "#f7f5f5",
    paddingHorizontal: 13,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 6,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  locationInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
  },
});

export default CustomAppBar;
