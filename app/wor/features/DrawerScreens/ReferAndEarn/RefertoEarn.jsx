import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import MainCard from "./Components/MainCard";
import InviteCard from "./Components/InviteCard";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import RefHistory from "./Components/RefHistory";
import { useSelector } from "react-redux";

const ReferAndEarn = () => {
  const { profile } = useSelector((state) => state.profileSlice);
  return (
    <AppBarLayout title="Refer And Earn" isPositionAppbar={true}>
      <View style={styles.innerContainer}>
        <MainCard refCode={profile?.ownRefCode} />
        <InviteCard refCode={profile?.ownRefCode} />
        <RefHistory />
      </View>
    </AppBarLayout>
  );
};

export default memo(ReferAndEarn); // Prevent unnecessary re-renders

const styles = StyleSheet.create({
  innerContainer: {
    gap: 15,
    paddingTop: 80,
  },
});
