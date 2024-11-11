import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const HowItsWork = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstCard}>
        <Text style={styles.yourFriend}>Your Friend Completed 1 Order</Text>
        <Text style={styles.within}>within 7 days of registration</Text>
      </View>
      <View style={styles.secondCard}>
        <Text style={styles.youEarn}>You Earn</Text>
        <View style={styles.coinsWithImageCard}>
          <Text style={styles.youEarn}>50</Text>
          <Image
            style={styles.coinImage}
            source={require("../../../../assets/images/profile/Scooty Coin.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default HowItsWork;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  firstCard: {
    width: "75%",
    // backgroundColor: "red",
    gap: 4,
  },
  yourFriend: {
    fontSize: 13,
    fontWeight: "600",
  },
  within: {
    fontSize: 11,
    color: "#666666",
  },
  secondCard: {
    width: "23%",
    height: "100%",
    backgroundColor: "#fff5f9",
    alignItems: "center",
    borderRadius: 10,
    padding: 2,
  },
  youEarn: {
    fontSize: 11,
    fontWeight: "bold",
  },
  coinsWithImageCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  coinImage: {
    width: 15,
    height: 15,
    resizeMode: "cover",
  },
});
