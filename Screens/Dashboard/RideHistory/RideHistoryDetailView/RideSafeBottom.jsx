import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RideSafeBottom = () => {
  return (
    <View style={styles.container}>
      <Text>RideSafeBottom</Text>
    </View>
  );
};

export default RideSafeBottom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 1,
  },
});
