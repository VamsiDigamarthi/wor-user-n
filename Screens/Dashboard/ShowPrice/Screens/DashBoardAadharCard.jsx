import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AadharVerification from "../../../Auth/AadharVerification/AadharVerification";
import { useRoute } from "@react-navigation/native";

const DashBoardAadharCard = () => {
  const route = useRoute();
  const { isPriceScreen = false } = route.params || {};
  return <AadharVerification isPriceScreen={isPriceScreen} />;
};

export default DashBoardAadharCard;

const styles = StyleSheet.create({});
