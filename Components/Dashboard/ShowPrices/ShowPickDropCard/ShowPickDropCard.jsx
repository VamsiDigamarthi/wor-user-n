import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShowPickDropItem from "./Component/ShowPickDropItem/ShowPickDropItem";
import IconButton from "../../../../Utils/IconButton/IconButton";

const ShowPickDropCard = ({ placeName }) => {
  return (
    <View style={styles.container}>
      <ShowPickDropItem
        icons="location"
        location={placeName}
        border={styles.borderBo}
        time
      />
      <ShowPickDropItem
        icons="locate-sharp"
        location="Hi-Tech city Metro Station"
        isInputShow={true}
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
    borderWidth: 1,
    borderColor: "#ffe2e6",
  },
  borderBo: {
    borderBottomWidth: 1,
    borderBlockColor: "#ffe2e6",
    position: "relative",
  },
});
