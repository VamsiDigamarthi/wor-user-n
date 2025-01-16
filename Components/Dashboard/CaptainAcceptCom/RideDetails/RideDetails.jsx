import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRideDetailsHook } from "./RideDetails.hook";
import RideDetailsItem from "./RideDetailsItem";
import RideDetailAmount from "./RideDetailAmount";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import ReferAndEarn from "../ReferAndEarn/ReferAndEarn";
import { useNavigation } from "@react-navigation/native";
import CustomeAppbar from "../../../../Utils/CustomeAppbar/CustomeAppbar";

const RideDetails = () => {
  const { orderDetails, travellingTimeAndDistnace } = useRideDetailsHook();
  const navigation = useNavigation();

  const onRideComplete = () => {
    navigation.navigate("captainrideComplete", {
      orderDetails,
    });
  };

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Ride Details" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <RideDetailsItem
          travellingTimeAndDistnace={travellingTimeAndDistnace}
          orderDetails={orderDetails}
        />
        <RideDetailAmount orderDetails={orderDetails} />
        <View style={{ width: "100%" }}>
          <CustomBtn
            borderColor="#e02e88"
            borderWidth={1}
            btnBg="#fff"
            btnColor="#e02e88"
            title="Cancel Ride"
            onPress={onRideComplete}
          />
        </View>
        <ReferAndEarn />
      </ScrollView>
    </View>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    gap: 20,
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
