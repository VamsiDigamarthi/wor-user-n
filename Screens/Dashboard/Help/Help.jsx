import { StyleSheet, View } from "react-native";
import React from "react";
import HelpSearchCard from "../../../Components/Dashboard/HelpCom/HelpSearchCard/HelpSearchCard";
import HelpDropPickCard from "../../../Components/Dashboard/HelpCom/HelpDropPickCard/HelpDropPickCard";
import HelpBottomCard from "../../../Components/Dashboard/HelpCom/HelpBottomCard/HelpBottomCard";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import { useHelpHook } from "./Help.hook";

const Help = () => {
  const navigation = useNavigation();
  const { lastOrder } = useHelpHook();
  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Help" onBack={() => navigation.goBack()} />
      <View style={styles.conatiner}>
        <HelpSearchCard />
        <HelpDropPickCard lastOrder={lastOrder} />
        <HelpBottomCard />
      </View>
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
