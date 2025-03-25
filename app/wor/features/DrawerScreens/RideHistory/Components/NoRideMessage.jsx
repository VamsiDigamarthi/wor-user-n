import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setIsBeforeBook } from "../../../ridebooking/sharedLogics/rideDetailsSlice";

const NoRideMessage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dispatchAndNavigate = () => {
    dispatch(setIsBeforeBook(true));
    navigation.navigate("SelectDropLocation", { isMic: false });
  };

  return (
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
  );
};

export default NoRideMessage;

const styles = StyleSheet.create({
  centerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    gap: 14,
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
