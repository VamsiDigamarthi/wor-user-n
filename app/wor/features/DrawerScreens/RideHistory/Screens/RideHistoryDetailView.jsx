import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import RideHistoryDetailsViewFirst from "../Components/RideHistoryDetailView/RideHistoryDetailsViewFirst";
import CustomeAppbar from "../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import FaqListCard from "../Components/FaqListCard";

const RideHistoryDetailView = ({ navigation }) => {
  const route = useRoute();
  const { ride } = route.params;
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Ride Details" onBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <RideHistoryDetailsViewFirst ride={ride} />

          <FaqListCard />
        </ScrollView>
      </View>
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
    paddingHorizontal: 10,
    // paddingVertical: 10,
    // marginTop: 20,
    gap: 10,
    paddingBottom: 30,
  },
});
