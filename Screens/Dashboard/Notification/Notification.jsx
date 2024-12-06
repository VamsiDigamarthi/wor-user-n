import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NotificationItem from "../../../Components/Dashboard/NotificationCom/NotificationItem/NotificationItem";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState([]);
  return (
    <View style={styles.container}>
      <CustomeAppbar
        title="Notification"
        onBack={() => navigation.goBack()}
        // showRight
        // rightText="Filter"
      />
      <View style={{ height: 80 }} />
      {!notification?.length > 0 ? (
        <NotificationItem />
      ) : (
        <View style={styles.noNotification}>
          <Image
            style={styles.notificationImage}
            source={require("../../../assets/images/profile/Notification.png")}
          />
          <Text style={styles.noNotificationText}>
            You have no new notifications
          </Text>
        </View>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  noNotification: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  notificationImage: {
    width: "100%",
    resizeMode: "contain",
  },
  noNotificationText: {
    fontSize: 18,
    color: "#e02e88",
    fontWeight: "600",
  },
});
