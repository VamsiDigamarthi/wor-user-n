import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import HelpSearchCard from "./Components/HelpSearchCard/HelpSearchCard";
import HelpDropPickCard from "./Components/HelpDropPickCard/HelpDropPickCard";
import HelpBottomCard from "./Components/HelpBottomCard/HelpBottomCard";
import { useHelpHook } from "./Hooks/Help.hook";

const Help = () => {
  const navigation = useNavigation();
  const { lastOrder } = useHelpHook();
  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Help" onBack={() => navigation.goBack()} />
      {/* <View style={{ height: 80 }} /> */}
      <HelpSearchCard />
      <HelpDropPickCard lastOrder={lastOrder} />
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
    // paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 20,
  },
});
