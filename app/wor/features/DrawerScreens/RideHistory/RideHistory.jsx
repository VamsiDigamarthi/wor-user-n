import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { memo, useMemo } from "react";
import RideHistoryItem from "./Components/RideHistoryItem";
import { useRideHistoryHook } from "./Hooks/RideHistory.hook";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";

const RideHistory = () => {
  const { rideHistory } = useRideHistoryHook();

  // Memoized ride history length check
  const hasRides = useMemo(() => rideHistory.length > 0, [rideHistory]);

  return (
    <AppBarLayout title="Ride History" isPositionAppbar>
      <View style={styles.innerContainer}>
        {hasRides ? (
          <FlatList
            data={rideHistory}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <RideHistoryItem ride={item} />}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.centerCard}>
            <Text style={styles.noRideText}>No Rides</Text>
          </View>
        )}
      </View>
    </AppBarLayout>
  );
};

export default memo(RideHistory);

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 10,
    paddingTop: 90,
  },
  itemSeparator: {
    height: 10,
  },
  centerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRideText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
