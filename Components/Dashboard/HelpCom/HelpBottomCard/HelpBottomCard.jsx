import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const HelpBottomCard = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          {/* First Row */}
          <View style={styles.singleCard}>
            <Image
              style={styles.singleCardImage}
              source={require("../../../../assets/images/profile/Helmet.png")}
            />
            <Text style={styles.text}>Safety & Security</Text>
          </View>
          <View style={styles.singleCard}>
            <Image
              style={styles.singleCardImage}
              source={require("../../../../assets/images/profile/Billing.png")}
            />
            <Text style={styles.text}>Ride & Billing</Text>
          </View>
          {/* Second Row */}
          <View style={styles.singleCard}>
            <Image
              style={styles.singleCardImage}
              source={require("../../../../assets/images/profile/Services.png")}
            />
            <Text style={styles.text}>Services</Text>
          </View>
          <View style={styles.singleCard}>
            <Image
              style={styles.singleCardImage}
              source={require("../../../../assets/images/profile/app perferences.png")}
            />
            <Text style={styles.text}>Account & App</Text>
          </View>
          <View style={styles.singleCard}>
            <Image
              style={styles.singleCardImage}
              source={require("../../../../assets/images/profile/refer .png")}
            />
            <Text style={styles.text}>Refereals</Text>
          </View>
          <View style={styles.singleCard}>
            <Image
              style={styles.singleCardImage}
              source={require("../../../../assets/images/profile/payment wallet.png")}
            />
            <Text style={styles.text}>Payments & Wallets</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpBottomCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 26,
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap when necessary
    justifyContent: "space-between", // Space out the items
  },
  singleCard: {
    width: "48%", // 50% minus margin for spacing
    borderWidth: 1,
    borderColor: "#ffe2e6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20, // Adds spacing between rows
  },
  singleCardImage: {
    width: "90%",
    height: 150,
    resizeMode: "contain",
  },
  text: {
    fontSize: 11,
  },
});
