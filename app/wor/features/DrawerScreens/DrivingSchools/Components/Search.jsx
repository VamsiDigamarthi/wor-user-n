import { Pressable, Text, View, StyleSheet } from "react-native";
import React from "react";
import { MicIcon, SearchIcons, UserIcons } from "../../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
export default function Search() {
  return (
    <View style={styles.searchBox}>
      <View style={{ justifyContent: "center", height: "100%" }}>
        <SearchIcons size={25} color={"#757575"} />
      </View>
      <TextInput placeholder="Search Driving Schools" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    gap: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
