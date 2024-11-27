import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import RideHistoryDetailsViewFirst from "./RideHistoryDetailsViewFirst";
import RideBillCard from "./RideBillCard";
import RideSafeBottom from "./RideSafeBottom";

const RideHistoryDetailView = () => {
  const route = useRoute();
  const { ride } = route.params;
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="gray" /> */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <RideHistoryDetailsViewFirst ride={ride} />
        <RideBillCard ride={ride} />
        <RideSafeBottom />
      </ScrollView>
    </View>
  );
};

export default RideHistoryDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // gap: 10,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    // marginTop: 20,
    gap: 10,
    paddingBottom: 30,
  },
});
