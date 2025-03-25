import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import RideHistoryDetailsViewFirst from "../Components/RideHistoryDetailView/RideHistoryDetailsViewFirst";

import FaqListCard from "../Components/FaqListCard";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";

const RideHistoryDetailView = () => {
  const route = useRoute();
  const { ride } = route.params;
  return (
    <AppBarLayout title="Ride Details" isPositionAppbar={false}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <RideHistoryDetailsViewFirst ride={ride} />

          <FaqListCard orderId={ride?._id} />
        </ScrollView>
      </View>
    </AppBarLayout>
  );
};

export default RideHistoryDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    gap: 20,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,

    gap: 10,
    paddingBottom: 30,

    backgroundColor: "#f3f2f7",
    paddingTop: 10,
  },
});
