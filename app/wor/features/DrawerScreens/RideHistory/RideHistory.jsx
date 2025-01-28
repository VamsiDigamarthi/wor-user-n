import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import RideHistoryItem from "./Components/RideHistoryItem";
import { useRideHistoryHook } from "./Hooks/RideHistory.hook";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import SingleLoader from "../../../utiles/Loaders/SingleLoader";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";

const RideHistory = ({ navigation }) => {
  const { rideHistory } = useRideHistoryHook();
  return (
    <AppBarLayout title="Ride History" isPositionAppbar={true}>
      <View style={styles.innerContainer}>
        {rideHistory?.length > 0 ? (
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
            <View style={styles.centerCard}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>No Rides</Text>
            </View>
          </>
        )}
      </View>
    </AppBarLayout>
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
    paddingTop: 90,
  },
  centerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
