import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowDonwIcons, ArrowUpIcons } from "../../../../Icons/Icons";
import FaceCard from "./FaceCard";
import { useSelector } from "react-redux";
import RideButtonCard from "./RideButtonCard";
import RideCompleteDetails from "./RideCompleteDetails";
import { fonts } from "../../../../fonts/Fonts";

const RideDetails = ({ disFromPickToDrop }) => {
  const [showHidden, setShowHidden] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.arrowCard}>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          onPress={() => setShowHidden(!showHidden)}
        >
          <Text style={{ fontSize: 13, fontFamily: fonts.robotoSemiBold }}>
            Ride Details
          </Text>
          {showHidden ? (
            <ArrowUpIcons size={30} color="#e02e88" />
          ) : (
            <ArrowDonwIcons size={30} color="gray" />
          )}
        </Pressable>
      </View>

      {showHidden && (
        <>
          <RideCompleteDetails disFromPickToDrop={disFromPickToDrop} />
          <FaceCard />
          <RideButtonCard />
        </>
      )}
    </View>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },
  arrowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
