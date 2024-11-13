import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DonatineTestimonial from "./DonatineTestimonial";

const DonationSuccessStories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Success Stories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <DonatineTestimonial />
        <DonatineTestimonial />

        <DonatineTestimonial />
      </ScrollView>
    </View>
  );
};

export default DonationSuccessStories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "600",
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 2,
  },
});
