import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { useEffect, memo, useMemo } from "react";
import RideHistoryItem from "./Components/RideHistoryItem";

// import RideHistoryItem from "./Components/RideHistoryItem";
import { useRideHistoryHook } from "./Hooks/RideHistory.hook";

import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { useDispatch, useSelector } from "react-redux";
import { rideHistoryAsyc } from "./rideHistory.slice";
import { useNavigation } from "@react-navigation/native";
import { setIsBeforeBook } from "../../ridebooking/sharedLogics/rideDetailsSlice";

const RideHistory = () => {
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const { rideHistory } = useSelector((state) => state.rideHistory);

  useEffect(() => {
    dispatch(rideHistoryAsyc({ token }));
  }, []);

  const dispatchAndNavigate = () => {
    dispatch(setIsBeforeBook(true));
    navigation.navigate("SelectDropLocation", { isMic: false });
  };

  // console.log("rideHistory", rideHistory);

  return (
    <AppBarLayout title="Ride History" isPositionAppbar>
      <View
        style={[
          styles.innerContainer,
          { paddingTop: Platform.OS == "ios" ? 110 : 100 },
        ]}
      >
        <FlatList
          scrollEnabled
          data={rideHistory}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <RideHistoryItem ride={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.centerCard}>
              <Text style={{ fontSize: 10, fontWeight: "600" }}>
                Easily view your past rides including pickup, drop-off, face and
                timetime
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: 21,
                }}
              >
                Kepp track of your trips anytime, all in one place.
              </Text>
              <Pressable onPress={dispatchAndNavigate} style={styles.rideStart}>
                <Text style={styles.start}>Start Your Rides</Text>
              </Pressable>
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
    backgroundColor: "#f3f2f7",
    zIndex: -1,
  },
  itemSeparator: {
    height: 10,
  },
  centerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    gap: 14,
  },
  noRideText: {
    fontSize: 20,
    fontWeight: "600",
  },
  rideStart: {
    width: 200,
    height: 50,
    backgroundColor: "#EA4C89",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  start: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
