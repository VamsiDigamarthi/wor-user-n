import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";
import WalletFirstCard from "./WalletFirstCard";
import WalletMoneyCard from "./WalletMoneyCard";
import TextWithCard from "../../../Utils/TextWithCard/TextWithCard";
import WalletBenefitCard from "./WalletBenefitCard";
import WalletHowItsWork from "./WalletHowItsWork";

const Wallet = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.bottomSheetBg}
      />
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
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bottomSheetBg,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    gap: 15,
    paddingBottom: 30,
  },
});
