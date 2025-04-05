import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { useEffect, memo } from "react";
import RideHistoryItem from "./Components/RideHistoryItem";

import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { useDispatch, useSelector } from "react-redux";
import { rideHistoryAsyc } from "./rideHistory.slice";
import { useNavigation } from "@react-navigation/native";
import { setIsBeforeBook } from "../../ridebooking/sharedLogics/rideDetailsSlice";
import NoRideMessage from "./Components/NoRideMessage";

const RideHistory = () => {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const { rideHistory } = useSelector((state) => state.rideHistory);

  useEffect(() => {
    dispatch(rideHistoryAsyc({ token }));
  }, []);

  console.log("rideHistory", rideHistory);

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
          keyExtractor={(item) => `${item._id}-${item?.createdAt}`}
          renderItem={({ item }) => <RideHistoryItem ride={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoRideMessage />}
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
    // marginTop: 10,
    paddingTop: 70,
    backgroundColor: "#f3f2f7",
    zIndex: -1,
    // backgroundColor: "red",
    paddingBottom: 40,
  },
  itemSeparator: {
    height: 10,
  },

  noRideText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
