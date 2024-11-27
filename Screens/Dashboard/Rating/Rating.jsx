import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../Constants/colors";
import RatingFirstCard from "../../../Components/Dashboard/RatingCom/RatingFirstCard/RatingFirstCard";
import RatingSecondCard from "../../../Components/Dashboard/RatingCom/RatingSecondCard";
import TextWithCard from "../../../Utils/TextWithCard/TextWithCard";

const Rating = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.bottomSheetBg}
      />
      <RatingFirstCard />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <RatingSecondCard />
        <TextWithCard
          title="static example calculation"
          subTitle="If 100 users rate the service: 50 give 5 stars, 30 give 4 stars, and 20 give 3 stars, the weighted average is..."
        />
        <TextWithCard
          title="How we calculate your ratings"
          subTitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed ..."
        />
      </ScrollView>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bottomSheetBg,
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    gap: 15,
  },
});
