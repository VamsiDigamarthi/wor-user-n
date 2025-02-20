import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SupportIcons } from "../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";

const SupportIcon = ({supportNavigate}) => {

  const navigation = useNavigation()

  const handlenavigateSupport = () =>{
    // navigation.navigate("")
    navigation.navigate("ChatBot", { caterogy:supportNavigate });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlenavigateSupport}>
      <SupportIcons size={20} color="black" />
      <Text>Support</Text>
    </TouchableOpacity>
  );
};

export default SupportIcon;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
