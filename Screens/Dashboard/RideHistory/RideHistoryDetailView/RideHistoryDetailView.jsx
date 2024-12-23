import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import RideHistoryDetailsViewFirst from "./RideHistoryDetailsViewFirst";
import RideBillCard from "./RideBillCard";
import RideSafeBottom from "./RideSafeBottom";
import CustomeAppbar from "../../../../Utils/CustomeAppbar/CustomeAppbar";

const RideHistoryDetailView = ({ navigation }) => {
  const route = useRoute();
  const { ride } = route.params;
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Ride History" onBack={() => navigation.goBack()} />
      <View style={{ height: 80 }} />

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
    // backgroundColor: "#fff5f9",
    // paddingHorizontal: 10,
    // paddingVertical: 12,
    gap: 20,
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
