import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useRoute } from "@react-navigation/native";
import MainCard from "./Components/MainCard";
import RatingImageCard from "./Components/RatingImageCard";
import Data from "../../../../../Constants/SafetyData.json";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";

const Rating = () => {
  const { hellow } = useRoute().params || {};

  return (
    <AppBarLayout title="Safety" isPositionAppbar={true}>
      <View style={styles.container}>
        <MainCard />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.heading}>What We Offer</Text>
          {Data.map((item, index) => (
            <RatingImageCard key={index} title={item.title} text={item.text} />
          ))}
        </ScrollView>
      </View>
    </AppBarLayout>
  );
};

export default memo(Rating);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 100,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    // paddingVertical: 10,
    gap: 15,
  },
  heading: {
    fontFamily: fonts.robotoBold,
    fontSize: 20,
    paddingLeft: 10,
  },
});
