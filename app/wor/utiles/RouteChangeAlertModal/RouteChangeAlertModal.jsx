import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import warningPng from "../../../../assets/routeChangeIcon/warning.png";
import giftPng from "../../../../assets/routeChangeIcon/gift.png";
import callPng from "../../../../assets/routeChangeIcon/call.png";
import worCall from "../../../../assets/routeChangeIcon/worHelp.png";
import thumpsUp from "../../../../assets/routeChangeIcon/thumpsUp.png";
import SwipeBtn from "../../utiles/SwipeBtn";
import { useRouteChangeAlertModalHook } from "./RouteChangeAlertModal.hook";

const { width, height } = Dimensions.get("window");

const RouteChangeAlertModal = ({ setRouteMapTToggle, openCloseState }) => {
  const { safeButonClick, quickAlertClick } = useRouteChangeAlertModalHook({
    setRouteMapTToggle,
  });

  return (
    <Modal visible={openCloseState} animationType={"fade"}>
      <View style={styles.container}>
        <View style={styles.firstCard}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <FontAwesome size={30} name="warning" color="red" />
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>
              Alert Notification!
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "600", lineHeight: 22 }}>
            The ride has not moved for a long time. Are you safe and okay?
          </Text>
        </View>
        <View style={styles.secondCard}>
          <RouteChangeCard imageSrc={giftPng} text="Emergency Call (112)" />
          <RouteChangeCard imageSrc={callPng} text="Women Rider Helplines" />
          <RouteChangeCard imageSrc={worCall} text="Women’s Helpline" />
          <RouteChangeCard
            imageSrc={warningPng}
            text="Nearby Police stations"
          />
        </View>
        <View style={styles.absoluteCard}>
          <Pressable onPress={safeButonClick} style={styles.firstIconButton}>
            <View style={styles.firstIcon}>
              <Image
                style={{ width: 20, height: 20, resizeMode: "contain" }}
                source={thumpsUp}
              />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#07A13A" }}>
              I’m secure and doing well
            </Text>
          </Pressable>
          <SwipeBtn
            bg={"#EA4C89"}
            title={"Swipe to raise a quick alert"}
            onswipe={quickAlertClick}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RouteChangeAlertModal;

const RouteChangeCard = ({ imageSrc, text }) => (
  <View style={styles.card}>
    <View style={styles.cardSecondCard}>
      <Image
        style={{
          width: 30,
          height: 30,
          resizeMode: "contain",
        }}
        source={imageSrc}
      />
      <Text style={{ fontSize: 16, fontWeight: "600", marginTop: -5 }}>
        {text}
      </Text>
    </View>
    <MaterialIcons name="arrow-forward-ios" size={20} color="gray" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    position: "relative",
  },
  firstCard: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  secondCard: {
    gap: 30,
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  cardSecondCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  absoluteCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    width: width,
    gap: 10,
  },
  // first icons button
  firstIconButton: {
    width: "100%",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#07A13A",
    flexDirection: "row",
    // gap: 10,
    alignItems: "center",
  },
  firstIcon: {
    width: 70,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
});
