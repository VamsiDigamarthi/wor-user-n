import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Linking } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const openDialer = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Dialer is not supported on this device");
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const Map3Btn = ({
  isZoomedIn,
  height,
  handleOpenSafetyModal,
  lowerBound = "20%",
  upperBound = "32%",
}) => {
  return (
    <View
      style={[
        styles.container,
        { bottom: height <= 500 ? lowerBound : upperBound },
      ]}
    >
      <View style={styles.singleIconsCard}>
        <TouchableOpacity
          onPress={() => openDialer("100")}
          style={styles.zoomButton}
        >
          <Text>SOS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.singleIconsCard}>
        <TouchableOpacity
          onPress={handleOpenSafetyModal}
          style={styles.zoomButton}
        >
          <AntDesign name="Safety" size={20} color="#e02e88" />
        </TouchableOpacity>
      </View>
      <View style={styles.singleIconsCard}>
        <TouchableOpacity
          // onPress={handleZoomToggle}
          style={styles.zoomButton}
        >
          <FontAwesome
            name={isZoomedIn ? "search-minus" : "search-plus"}
            size={20}
            color="#e02e88"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map3Btn;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 15,
    right: 20,
    gap: 10,
    bottom: "32%",
  },
  singleIconsCard: {
    width: 45,
    height: 45,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
