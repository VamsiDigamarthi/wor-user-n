import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import Settingsitem from "./Settingsitem";

const SettingsItemsList = () => {
  return (
    <ScrollView style={styles.container}>
      <Settingsitem
        iconName="person-outline"
        iconType="Ionicons"
        label="Account Setting"
        screenName="AccountSettings"
      />
      {/* <Settingsitem
        iconName="favorite-border"
        iconType="MaterialIcons"
        label="Favorite"
        screenName="Favorite"
      /> */}
      <Settingsitem
        iconName="document-text-outline"
        iconType="Ionicons"
        label="Document Settings"
      />
      <Settingsitem
        iconName="settings-ethernet"
        iconType="MaterialIcons"
        label="Preference"
        screenName="Preference"
      />
      <Settingsitem
        iconName="settings-ethernet"
        iconType="MaterialIcons"
        label="About"
        screenName="About"
      />
      <Settingsitem
        iconName="language"
        iconType="FontAwesome"
        label="Language"
      />
      <Settingsitem
        iconName="delete"
        iconType="AntDesign"
        label="Delete Account"
      />
    </ScrollView>
  );
};

export default SettingsItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
