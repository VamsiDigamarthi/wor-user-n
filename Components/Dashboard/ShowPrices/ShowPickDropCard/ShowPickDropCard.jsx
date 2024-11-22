import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShowPickDropItem from "./Component/ShowPickDropItem/ShowPickDropItem";
import { COLORS } from "../../../../Constants/colors";

const ShowPickDropCard = ({
  placeName, // place name means user corrent location
  dropLocation, // this props to show drop location user already pick up home screen or selected drop location screen
  inputValue, // this is input value using for selected drop location component to fetch location meand enter kukat that corresponsind kukatpally surrounding famous location fetch
  handleInputChange, // this is input value using for selected drop location component only
  isInputShow = true, // this props show input or text in drop location place
  shoRightIcons,
  timeShow,
}) => {
  return (
    <View style={styles.container}>
      <ShowPickDropItem
        topIcon="Ionicons"
        icons="location"
        location={placeName}
        border={styles.borderBo}
        IconsType="MaterialIcons"
        iconsName="favorite"
        showRightIcon={shoRightIcons}
        timeShow={timeShow}
        // time
      />
      <ShowPickDropItem
        topIcon="FontAwesome"
        icons="location-arrow"
        location={dropLocation}
        isInputShow={isInputShow}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        IconsType="FontAwesome"
        iconsName="microphone"
        showRightIcon={shoRightIcons}
      />
    </View>
  );
};

export default ShowPickDropCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    backgroundColor: COLORS.desBackground,
  },
  borderBo: {
    borderBottomWidth: 1,
    borderBlockColor: "#ffe2e6",
    position: "relative",
  },
});
