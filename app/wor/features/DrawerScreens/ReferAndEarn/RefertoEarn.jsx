import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import MainCard from "./Components/MainCard";
import InviteCard from "./Components/InviteCard";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
const ReferAndEarn = () => {
  const navigation = useNavigation();
  return (
    <AppBarLayout title="Refer And Earn" isPositionAppbar={true}>
      <View style={styles.innerContainer}>
        <MainCard />
        <InviteCard />
        {/* <HowItWorks /> */}
      </View>
    </AppBarLayout>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 12,
    gap: 15,
    backgroundColor: "#fff5f9",
  },
  innerContainer: {
    // paddingHorizontal: 5,
    gap: 15,
    paddingTop: 80,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    gap: 10,
  },
});
