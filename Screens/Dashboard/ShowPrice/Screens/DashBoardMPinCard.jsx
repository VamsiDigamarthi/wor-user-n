import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MPin from "../../../Auth/MPin/MPin";
import { useRoute } from "@react-navigation/native";

const DashBoardMPinCard = () => {
  const route = useRoute();
  const { isPriceScreen = false } = route.params || {};

  return <MPin isPriceScreen={isPriceScreen} />;
};

export default DashBoardMPinCard;

const styles = StyleSheet.create({});
