import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import ReferAndEarnCard from "../../../Components/Dashboard/ReferAndEarnCom/ReferAndEarnCard/ReferAndEarnCard";
import InviteCard from "../../../Components/Dashboard/ReferAndEarnCom/InviteCard/InviteCard";
import HowItsWork from "../../../Components/Dashboard/ReferAndEarnCom/HowItsWork/HowItsWork";
import ReferFindFriend from "../../../Components/Dashboard/ReferAndEarnCom/ReferFindFriend/ReferFindFriend";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";

const ReferAndEarn = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Refer and Earn"
        onBack={() => navigation.goBack()}
      />
      <View style={{ height: 70 }} />
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
    paddingHorizontal: 10,
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
