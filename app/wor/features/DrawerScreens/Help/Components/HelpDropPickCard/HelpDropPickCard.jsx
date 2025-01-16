import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import RideHistoryFirst from "../../../RideHistory/Components/RideHistoryFirst";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HelpDropPickCard = ({ lastOrder }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <RideHistoryFirst ride={lastOrder} />
      <View style={styles.fullRideHistory}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons name="contract" size={25} color="black" />
          <Text>Full Ride History</Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("RideHistoryDetailView", { ride: lastOrder })
          }
        >
          <Ionicons name="arrow-forward" size={20} color="#e02e88" />
        </Pressable>
      </View>
    </View>
  );
};

export default HelpDropPickCard;

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    backgroundColor: "#fff",

    marginHorizontal: 10,
  },
  fullRideHistory: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
