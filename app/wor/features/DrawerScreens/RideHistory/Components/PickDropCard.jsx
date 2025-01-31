import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LocationIcon, PickLocationIcon } from "../../../../Icons/Icons";
// import { LocationIcon, PickLocationIcon } from "../../../../../Icons/icons";

const PickDropCard = ({
  pickPlaceName,
  pickVicinity,
  dropPlaceName,
  dropVicinity,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.container, { width: "100%" }]}>
        <View style={styles.left}>
          <PickLocationIcon size={25} color="#17a773" />
          <View style={[styles.line, { height: 42 }]} />
          <LocationIcon size={25} color="#e02e88" />
        </View>
        <View style={[styles.locationCard, { gap: 10 }]}>
          <View>
            <Text
              style={{ fontSize: 15, fontWeight: "600" }}
              numberOfLines={1}
              ellipsizeMode="taile"
            >
              {pickPlaceName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                // backgroundColor: "red",
                height: 35,
              }}
              numberOfLines={2}
              ellipsizeMode="taile"
            >
              {pickVicinity}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 15, fontWeight: "600" }}
              numberOfLines={1}
              ellipsizeMode="taile"
            >
              {dropPlaceName}
            </Text>
            <Text
              style={{ fontSize: 12, color: "gray" }}
              numberOfLines={2}
              ellipsizeMode="taile"
            >
              {dropVicinity}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickDropCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#fff",
  },
  left: {
    width: "10%",
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 2,
    marginTop: 3,
  },
  line: {
    width: 1,
    height: 42,
    borderWidth: 0.8,
    borderStyle: "dashed",
  },
  locationCard: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#fff",
  },
});
