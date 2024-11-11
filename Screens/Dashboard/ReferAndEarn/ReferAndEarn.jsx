import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import ReferAndEarnCard from "../../../Components/Dashboard/ReferAndEarnCom/ReferAndEarnCard/ReferAndEarnCard";
import InviteCard from "../../../Components/Dashboard/ReferAndEarnCom/InviteCard/InviteCard";
import HowItsWork from "../../../Components/Dashboard/ReferAndEarnCom/HowItsWork/HowItsWork";
import ReferFindFriend from "../../../Components/Dashboard/ReferAndEarnCom/ReferFindFriend/ReferFindFriend";

const ReferAndEarn = () => {
  return (
    <View style={styles.container}>
      <ReferAndEarnCard />
      <InviteCard />
      <Text style={styles.howIts}>How Its Work?</Text>

      {/* Directly wrapping HowItsWork in ScrollView */}
      <ScrollView
        style={styles.allHowItsWork}
        showsVerticalScrollIndicator={false} // Hides vertical scrollbar
        showsHorizontalScrollIndicator={false}
      >
        <HowItsWork />
        <HowItsWork />
        <HowItsWork />
        <HowItsWork />
      </ScrollView>

      <ReferFindFriend />
    </View>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 26,
    paddingVertical: 12,
    position: "relative",
  },
  howIts: {
    fontSize: 18,
    fontWeight: "bold",
  },
  allHowItsWork: {
    height: 300,
    marginBottom: 60,
  },
});
