import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NotificationItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.dot}></Text>
      <View style={styles.notificationCard}>
        <Text style={styles.refer}>Refer Now and Earn Money</Text>
        <Text style={styles.forgot}>
          Don't forgot to share your referal code to earn
        </Text>
        <Text style={styles.days}>4 Days Ago</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffe2e6",
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#e02e88",
  },
  notificationCard: {
    width: "92%",
    height: "100%",
    gap: 2,
  },
  refer: {
    fontSize: 14,
    fontWeight: "bold",
  },
  forgot: {
    fontSize: 11,
    color: "#808080",
  },
  days: {
    fontSize: 13,
    // color: "#808080",
  },
});
