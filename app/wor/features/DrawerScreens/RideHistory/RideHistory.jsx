import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import RideHistoryItem from "./Components/RideHistoryItem";
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

  return (
    <AppBarLayout title="Ride History" isPositionAppbar={true}>
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
