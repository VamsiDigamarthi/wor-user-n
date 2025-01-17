import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { MicIcon, SearchIcons } from "../../../../Icons/Icons";

const LocationInput = () => {
  return (
    <View style={styles.container}>
      <SearchIcons size={20} color="#000" />
      <TextInput
        style={{ flex: 1, fontSize: 16 }}
        placeholder="Enter Destination"
      />
      <Pressable style={styles.micIcons}>
        <MicIcon size={22} color="#e02e88" />
      </Pressable>
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  micIcons: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 42.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    height: 40,
  },
});
