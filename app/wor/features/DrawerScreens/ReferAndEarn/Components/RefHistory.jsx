import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { fonts } from "../../../../fonts/Fonts";

export default function RefHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Referral history</Text>

      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <HistoryCard />
        <HistoryCard />
      </ScrollView>
    </View>
  );
}

function HistoryCard() {
  return (
    <View style={styles.mainCard}>
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>
          Free Cash - Valid for next order only
        </Text>
        <Text style={styles.amount}>₹40.00</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.smalltext}>2 days ago</Text>
        <Text style={styles.smalltext}>Expires in : one week</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    padding: 8,
    position: "relative",
    bottom: 80,
    height: 240,
    gap: 10,
  },
  mainCard: {
    gap: 5,
  },
  heading: {
    fontFamily: fonts.robotoSemiBold,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smalltext: {
    fontFamily: fonts.robotoRegular,
    fontSize: 10,
  },
  amount: {
    color: "green",
    fontFamily: fonts.robotoBold,
  },
});
