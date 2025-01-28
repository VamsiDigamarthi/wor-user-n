import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import MainCard from "./Components/MainCard";
import RatingImageCard from "./Components/RatingImageCard";
import Data from "../../../../../Constants/SafetyData.json";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";

const Rating = () => {
  const { hellow } = useRoute().params || {};
  const navigation = useNavigation();
  console.log("hellow", hellow);

  return (
    <AppBarLayout title="Safety" isPositionAppbar={true}>
      <View style={styles.container}>
        <MainCard />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 5,
            gap: 20,
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 10 }}>
            What We Offer
          </Text>

          {Data.map((e, index) => (
            <RatingImageCard key={index} title={e.title} text={e.text} />
          ))}
        </ScrollView>
      </View>
    </AppBarLayout>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    // gap: 10,
    position: "relative",
    paddingTop: 70,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    gap: 15,
  },
});
