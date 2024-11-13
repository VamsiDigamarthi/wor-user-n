import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ParcelSendReceivesCard from "../../../Components/Parcels/ParcelHomeCom/ParcelSendReceivedCard/ParcelSendReceivesCard";

const ParcelHome = () => {
  return (
    <View style={styles.container}>
      <ParcelSendReceivesCard />
    </View>
  );
};

export default ParcelHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    gap: 15,
  },
});
