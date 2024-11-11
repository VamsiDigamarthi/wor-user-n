import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HelpSearchCard from "../../../Components/Dashboard/HelpCom/HelpSearchCard/HelpSearchCard";

const Help = () => {
  return (
    <View style={styles.conatiner}>
      <HelpSearchCard />
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 26,
  },
});
