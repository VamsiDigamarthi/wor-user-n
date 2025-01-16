import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";
import WalletFirstCard from "./WalletFirstCard";
import WalletMoneyCard from "./WalletMoneyCard";
import TextWithCard from "../../../Utils/TextWithCard/TextWithCard";
import WalletBenefitCard from "./WalletBenefitCard";
import WalletHowItsWork from "./WalletHowItsWork";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";

const Wallet = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Wallet" onBack={() => navigation.goBack()} />
      {/* <View style={{ height: 100 }} /> */}

      <WalletFirstCard />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <WalletMoneyCard />
        <WalletHowItsWork />
        <WalletBenefitCard />
        <TextWithCard
          title="Learn How to Use Your Wallet"
          subTitle="Your wallet is designed to make payments effortless and secure. Add funds with ease through multiple methods, including bank transfers and cards. Pay at stores, online, or send money to friends with just a tap. Enjoy real-time balance updates, transaction tracking, and notifications for every action to stay in control."
        />
      </ScrollView>
      <View style={styles.addWalletBtncard}>
        <CustomBtn
          btnBg="#e02e88"
          btnColor="#fff"
          title="Add Money to Wallet"
        />
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bottomSheetBg,
    position: "relative",
  },
  scrollContainer: {
    width: "100%",
    // paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    gap: 15,
    paddingBottom: 120,
  },
  addWalletBtncard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "#fff",
    // backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 10,
    zIndex: 4,
  },
});
