import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Settingsitem from "../../../Components/Dashboard/settingscom/SettingsItem/Settingsitem";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";

const About = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomeAppbar title="About" onBack={() => navigation.goBack()} />

      <View style={{ height: 100 }}></View>
      <ScrollView style={styles.scrollContainer}>
        <Settingsitem displayIcon={false} label="Privacy & Policy" />
        <Settingsitem displayIcon={false} label="Terms & Condition" />

        <Settingsitem displayIcon={false} label="Join the team" />
        <Settingsitem displayIcon={false} label="Blog" />
        <Settingsitem displayIcon={false} label="Software Licence" />
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
  },
  scrollContainer: {
    flex: 1,
  },
});
