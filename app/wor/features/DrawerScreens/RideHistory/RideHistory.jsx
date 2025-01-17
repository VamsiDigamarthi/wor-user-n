import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import RideHistoryItem from "./Components/RideHistoryItem";
import { useRideHistoryHook } from "./Hooks/RideHistory.hook";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import SingleLoader from "../../../utiles/Loaders/SingleLoader";

const RideHistory = ({ navigation }) => {
  const { rideHistory } = useRideHistoryHook();
  // const rideHistory = null;
  // console.log("RideHistory", rideHistory);
  return (
    <View style={styles.container}>
      <CustomeAppbar title="My Rides" onBack={() => navigation.goBack()} />
      <View style={styles.innerContainer}>
        {rideHistory ? (
          <FlatList
            scrollEnabled
            data={rideHistory}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <RideHistoryItem ride={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <>
            <SingleLoader />
            <SingleLoader />
            <SingleLoader />
            <SingleLoader />
            <SingleLoader />
            <SingleLoader />
            <SingleLoader />
            <SingleLoader />
          </>
        )}
      </View>
    </View>
  );
};

export default RideHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 10,
    // paddingVertical: 12,
    // gap: 20,
  },
  innerContainer: {
    paddingHorizontal: 5,
    marginTop: 10,
    gap: 15,
    flex: 1,
  },
});
