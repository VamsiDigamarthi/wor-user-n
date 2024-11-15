import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo vector icons

const CustomAppBar = ({ navigation, placeName }) => {
  return (
    <View style={styles.appBarContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#e02e88" />
      </TouchableOpacity>

      <View style={styles.appSecondCard}>
        <View style={styles.locationInputContainer}>
          <Ionicons name="location-sharp" size={20} color="lightgray" />
          <Text style={styles.title}>{placeName || "Women Rider"}</Text>
        </View>

        <TouchableOpacity onPress={() => alert("Love icon pressed!")}>
          <Ionicons name="heart-outline" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    borderWidth: 1, // Apply border to all sides
    borderColor: "#fff5f9",
    // paddingHorizontal: 13,
    // paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 6,
    height: 50,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 10,
  },
  appSecondCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    width: "90%",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff5f9",
    height: "100%",
    paddingRight: 20,
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
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "gray",
    marginLeft: 6,
  },
});

export default CustomAppBar;
