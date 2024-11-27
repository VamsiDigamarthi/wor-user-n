import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ProfileCard from "../../../Components/Dashboard/ProfileCom/ProfileCard/ProfileCard";
import ProfileRatingRideCountCard from "../../../Components/Dashboard/ProfileCom/ProfileRatingRideCountCard/ProfileRatingRideCountCard";
import ProfileNavigationCard from "../../../Components/Dashboard/ProfileCom/ProfileNavigationCard/ProfileNavigationCard";
import Settingsitem from "../../../Components/Dashboard/settingscom/SettingsItem/Settingsitem";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
      <ProfileRatingRideCountCard />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: "space-between",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Settingsitem
          iconName="person-outline"
          iconType="Ionicons"
          label="Personal Info"
          screenName="PersonalInfoPreview"
        />
        <Settingsitem
          iconName="document-text-outline"
          iconType="Ionicons"
          label="Document"
          screenName="ProfileDocumentScreen"
        />
        <Settingsitem
          iconName="logout"
          iconType="MaterialIcons"
          label="Logout"
          // screenName="PersonalInfoPreview"
        />
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
