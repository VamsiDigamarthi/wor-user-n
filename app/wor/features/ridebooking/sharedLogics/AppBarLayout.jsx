import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";

const AppBarLayout = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <CustomeAppbar title={title} />
      {children}
    </View>
  );
};

export default AppBarLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 10,
    position: "relative",
  },
});
