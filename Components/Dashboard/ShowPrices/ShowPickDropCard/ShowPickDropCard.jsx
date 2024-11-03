import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShowPickDropItem from "./Component/ShowPickDropItem/ShowPickDropItem";

const ShowPickDropCard = () => {
  return (
    <View style={styles.container}>
      <ShowPickDropItem
        icons="location"
        location="Nuhvin Global server Limited"
        border={styles.borderBo}
        time
      />
      <ShowPickDropItem
        icons="locate-sharp"
        location="Hi-Tech city Metro Station"
      />
    </View>
  );
};

export default ShowPickDropCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    elevation: 0,
    borderRadius: 8,
  },
  borderBo: {
    borderBottomWidth: 1,
    borderBlockColor: "#e02e99",
    position: "relative",
  },
});
