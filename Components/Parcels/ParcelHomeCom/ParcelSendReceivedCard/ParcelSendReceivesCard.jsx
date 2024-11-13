import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const ParcelSendReceivesCard = ({
  selectedCard,
  handleCardClick = () => {},
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.firstCard,
          selectedCard === "firstCard" ? styles.selected : styles.unselected,
          selectedCard === "firstCard" ? { width: "60%" } : { width: "50%" },
        ]}
        onPress={() => handleCardClick("firstCard")}
      >
        {selectedCard === "firstCard" && (
          <View style={styles.icon}>
            <AntDesign name="checkcircle" size={20} color="#e02e88" />
          </View>
        )}

        <Text style={{ fontSize: 16, fontWeight: "600" }}>Send Parcel</Text>
        <Text style={{ fontSize: 11, color: "#808080" }}>
          Send with city limited
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.secondCard,
          selectedCard === "secondCard" ? styles.selected : styles.unselected,
          selectedCard === "secondCard" ? { width: "60%" } : { width: "50%" },
        ]}
        onPress={() => handleCardClick("secondCard")}
      >
        {selectedCard === "secondCard" && (
          <View style={styles.iconSecond}>
            <AntDesign name="checkcircle" size={20} color="#e02e88" />
          </View>
        )}
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Receive Parcel</Text>
        <Text style={{ fontSize: 11, color: "#808080" }}>
          Get parcel within city limited
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParcelSendReceivesCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    // backgroundColor: "#fff",
    position: "relative",
    borderWidth: 1,
    borderColor: "#ffe2e6",
    borderRadius: 10,
    overflow: "hidden",
  },
  firstCard: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: 0,
    gap: 5,
  },
  secondCard: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: 0,
    gap: 5,
    right: 0,
  },
  selected: {
    borderColor: "#e02e88",
    borderWidth: 1,
    backgroundColor: "#fff",
    zIndex: 1,
    borderRadius: 10,
  },
  unselected: {
    borderColor: "#ffe2e6",
    borderWidth: 1,
    zIndex: 0,
  },
  icon: {
    position: "absolute",
    width: 22,
    height: 22,
    top: 5,
    right: 5,
  },
  iconSecond: {
    position: "absolute",
    width: 22,
    height: 22,
    top: 5,
    left: 5,
  },
});
