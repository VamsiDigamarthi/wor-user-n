import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ProfileCard from "../../../Components/Dashboard/ProfileCom/ProfileCard/ProfileCard";
import ProfileRatingRideCountCard from "../../../Components/Dashboard/ProfileCom/ProfileRatingRideCountCard/ProfileRatingRideCountCard";
import ProfileNavigationCard from "../../../Components/Dashboard/ProfileCom/ProfileNavigationCard/ProfileNavigationCard";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
      <ProfileRatingRideCountCard />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileNavigationCard
          title="Personal Info"
          // navigateTo="PersonalInfo"
          navigateTo="PersonalInfoPreview"
        />
        <ProfileNavigationCard title="Safety & Privacy" />
        <ProfileNavigationCard title="Document" />
        <ProfileNavigationCard title="Banking Deatils" />
        <ProfileNavigationCard title="Upload ID Proof" />
        <ProfileNavigationCard title="LogOut" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
  },
});
