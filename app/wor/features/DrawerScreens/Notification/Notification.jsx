import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NotificationItem from "./Components/NotificationItem";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import {
  NotificationImg,
  noficationHelmet,
} from "../../../Images/Notification";

const Notification = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState([1,2,3]);
  return (
    <View style={styles.container}>
      <CustomeAppbar title="Notifications" onBack={() => navigation.goBack()} />

      <View style={styles.innerContainer}>
        {notification.length > 0 ? (
          <>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </>
        ) : (
          <View style={styles.noNotification}>
            <Image style={styles.notificationImage} source={NotificationImg} />
            <Text style={styles.noNotificationText}>
              You have no new notifications
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    paddingHorizontal: 5,
    gap: 15,
    paddingVertical: 10,
  },
  noNotification: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    position: "relative",
    top: 100,
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
