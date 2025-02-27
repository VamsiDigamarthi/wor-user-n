import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SupportIcons } from "../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";

const FQs = ({faqs}) => {
  const navigation = useNavigation();

  const handlenavigateSupport = () => {
    // navigation.navigate("")
    navigation.navigate("FQs", { caterogy: faqs });
  };

  return (
    <TouchableOpacity style={[styles.container, {width:faqs==="OTP" ? 76 : 100}]} onPress={handlenavigateSupport}>
      <SupportIcons size={20} color="black" />
      <Text>FAQ's</Text>
    </TouchableOpacity>
  );
};

export default FQs;

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
