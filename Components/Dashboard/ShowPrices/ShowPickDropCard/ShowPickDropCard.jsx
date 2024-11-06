import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShowPickDropItem from "./Component/ShowPickDropItem/ShowPickDropItem";

const ShowPickDropCard = ({
  placeName, // place name means user corrent location
  dropLocation, // this props to show drop location user already pick up home screen or selected drop location screen
  inputValue, // this is input value using for selected drop location component to fetch location meand enter kukat that corresponsind kukatpally surrounding famous location fetch
  handleInputChange, // this is input value using for selected drop location component only
  isInputShow = true, // this props show input or text in drop location place
}) => {
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
        location={dropLocation}
        isInputShow={isInputShow}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
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
