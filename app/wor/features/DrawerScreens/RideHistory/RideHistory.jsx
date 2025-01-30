import { FlatList, StyleSheet, Text, View } from "react-native";

import React, { useEffect, memo, useMemo } from "react";
import RideHistoryItem from "./Components/RideHistoryItem";

import RideHistoryItem from "./Components/RideHistoryItem";
import { useRideHistoryHook } from "./Hooks/RideHistory.hook";

import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { useDispatch, useSelector } from "react-redux";
import { rideHistoryAsyc } from "./rideHistory.slice";

const RideHistory = () => {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const { rideHistory } = useSelector((state) => state.rideHistory);

  useEffect(() => {
    dispatch(rideHistoryAsyc({ token }));
  }, []);

const RideHistory = () => {
  const { rideHistory } = useRideHistoryHook();

  const hasRides = useMemo(() => rideHistory.length > 0, [rideHistory]);

  return (
    <AppBarLayout title="Ride History" isPositionAppbar>
      <View style={styles.innerContainer}>

        <FlatList
          scrollEnabled
          data={rideHistory}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RideHistoryItem ride={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.centerCard}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>No Rides</Text>
            </View>
          }
        />

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
