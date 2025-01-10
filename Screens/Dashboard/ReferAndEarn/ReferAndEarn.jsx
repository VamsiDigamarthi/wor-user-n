import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import MainCard from "../../../Components/Dashboard/ReferandEarn/MainCard";
import InviteCard from "../../../Components/Dashboard/ReferandEarn/InviteCard";
const ReferAndEarn = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Refer To Earn" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <MainCard />
        <InviteCard />
        {/* <HowItWorks /> */}

        {/* <View style={styles.buttonContainer}>
        <CustomBtn
          btnColor="#fff"
          title="Find Friends to Refer"
          borderWidth={1}
          btnBg="#E02e88"
          borderColor="#e02e88"
        />
        <CustomBtn
          title="Refer Now"
          borderWidth={1}
          btnBg="#fff"
          borderColor="#e02e88"
        />
      </View> */}
      </View>
    </View>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 15,
    backgroundColor: "#fff5f9",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    gap: 10,
  },
});
