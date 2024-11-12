import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HelpSearchCard from "../../../Components/Dashboard/HelpCom/HelpSearchCard/HelpSearchCard";
import HelpDropPickCard from "../../../Components/Dashboard/HelpCom/HelpDropPickCard/HelpDropPickCard";
import HelpBottomCard from "../../../Components/Dashboard/HelpCom/HelpBottomCard/HelpBottomCard";

const Help = () => {
  return (
    <View style={styles.conatiner}>
      <HelpSearchCard />
      <HelpDropPickCard />
      <HelpBottomCard />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 26,
    paddingTop: 20,
    gap: 20,
  },
});
