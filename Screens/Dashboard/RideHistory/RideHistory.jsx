import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import RideHistoryItem from "./RideHistoryItem";
import { useRideHistoryHook } from "./RideHistory.hook";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";

const RideHistory = ({ navigation }) => {
  const { rideHistory } = useRideHistoryHook();
  // console.log("RideHistory", rideHistory);
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Ride History" onBack={() => navigation.goBack()} />
      <View style={styles.innerContainer}>
        <FlatList
          data={rideHistory}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RideHistoryItem ride={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default RideHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff5f9",
    // paddingHorizontal: 10,
    // paddingVertical: 12,
    // gap: 20,
  },
  innerContainer: {
    paddingHorizontal: 5,
    gap: 15,
  },
});
