import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";

export default function MpinScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Profile" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.heading}>Enter a new M-PIN</Text>
        <Text>
          Your PIN Can’t have repeating (e.g.0000) or consective (e.g. 1234)
          numbers
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
