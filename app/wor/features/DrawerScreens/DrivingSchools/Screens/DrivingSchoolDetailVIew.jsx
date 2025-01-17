import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
export default function DrivingSchoolsDetailView() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomeAppbar
        title="Driving Schools"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
