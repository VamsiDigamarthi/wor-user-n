import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotificationItem from "./Components/NotificationItem";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import {
  NotificationImg,
  noficationHelmet,
} from "../../../Images/Notification";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import { COLORS } from "../../../../../Constants/colors";
import { API } from "../../../../../Constants/url";
import { useSelector } from "react-redux";

const Notification = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState([]);
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    const getNotifications = async () => {
      const response = await API.get("/user/getnotifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotification(response.data);
    };

    getNotifications();
  }, []);

  return (
    <AppBarLayout title="Notification" isPositionAppbar={true}>
      <View
        style={[
          styles.innerContainer,
          { paddingTop: Platform.OS == "ios" ? 110 : 80 },
        ]}
      >
        {notification.length < 0 ? (
          <>
            {notification.map((e, index) => (
              <NotificationItem key={index} data={e} />
            ))}
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
    </AppBarLayout>
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
    paddingTop: 90,
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
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
    color: "#EA4C89",
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
  },
});
