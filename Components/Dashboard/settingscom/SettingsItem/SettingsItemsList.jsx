import { StyleSheet, ScrollView, Linking } from "react-native";
import React from "react";
import Settingsitem from "./Settingsitem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const SettingsItemsList = () => {
  const navigation = useNavigation();

  const onLogOutHandler = async () => {
    await AsyncStorage.removeItem("token");
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Ensures the specified route is the only route in the stack
        routes: [{ name: "AuthStack" }], // Replace 'Home' with your target screen name
      })
    );
  };

  const terms = () => {
    const url = "https://womenrider.nuhvin.com/termsandconditions";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const privacy = () => {
    const url = "https://womenrider.nuhvin.com/privacypolicy";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Settingsitem
        iconName="person-outline"
        iconType="Ionicons"
        label="Account Setting"
        screenName="AccountSettings"
      /> */}
      {/* <Settingsitem
        iconName="favorite-border"
        iconType="MaterialIcons"
        label="Favorite"
        screenName="Favorite"
      /> */}
      {/* <Settingsitem
        iconName="document-text-outline"
        iconType="Ionicons"
        label="Document Settings"
      /> */}
      {/* <Settingsitem
        iconName="settings-ethernet"
        iconType="MaterialIcons"
        label="App Settings"
        screenName="Preference"
      /> */}
      <Settingsitem
        iconName="settings-ethernet"
        iconType="MaterialIcons"
        label="Terms and Conditions"
        screenName="Termsandconditions"
        onPress={terms}
      />
      <Settingsitem
        iconName="language"
        iconType="FontAwesome"
        label="Privacy Policy"
        onPress={privacy}
      />
      {/* <Settingsitem
        iconName="language"
        iconType="FontAwesome"
        label="Software Licenses"
      /> */}
      {/* <Settingsitem iconName="language" iconType="FontAwesome" label="Blogs" /> */}
      <Settingsitem
        iconName="logout"
        iconType="AntDesign"
        label="Logout"
        onPress={onLogOutHandler}
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
