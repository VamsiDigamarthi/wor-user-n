import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingProfileCard from "../../../Components/Dashboard/settingscom/SettingProfileCard/SettingProfileCard";
import SettingsItemsList from "../../../Components/Dashboard/settingscom/SettingsItem/SettingsItemsList";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <SettingProfileCard />
      <SettingsItemsList />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
  },
});
