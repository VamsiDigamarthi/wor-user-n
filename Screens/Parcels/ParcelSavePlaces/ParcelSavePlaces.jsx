import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ParcelAddres from "../../../Utils/ParcelAddress/ParcelAddres";

const ParcelSavePlaces = () => {
  return (
    <View style={styles.container}>
      <ParcelAddres />
    </View>
  );
};

export default ParcelSavePlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
