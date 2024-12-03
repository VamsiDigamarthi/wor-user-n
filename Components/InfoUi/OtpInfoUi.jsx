import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { infoModalStyles } from "./Styles/InfoModalStyles";
import InfoModalIconsWithText from "./ReUseableComponents/InfoModalIconsWithText";
import InfoListCard from "./ReUseableComponents/InfoListCard";

const OtpInfoUi = ({ mainTitle, data }) => {
  return (
    <View style={infoModalStyles.insideModalCard}>
      <InfoModalIconsWithText headerText={mainTitle} suHeading="" />
      {data?.map((text, i) => (
        <InfoListCard text={text} key={i} />
      ))}
    </View>
  );
};

export default OtpInfoUi;

const styles = StyleSheet.create({});
