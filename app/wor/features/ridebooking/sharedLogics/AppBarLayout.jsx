import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Appbar from "./AppBar";

const AppBarLayout = ({
  title,
  children,
  vicinity,
  isPositionAppbar,
  isDrawerIcon,
  isTimer,
  // ride accept screen props
  isArrived,
  otpVerified,
  rideTide,
  ride3mTimes,
}) => {
  return (
    <View style={styles.container}>
      <Appbar
        isPositionAppbar={isPositionAppbar}
        title={title}
        vicinity={vicinity}
        isTimer={isTimer}
        isDrawerIcon={isDrawerIcon}
        isArrived={isArrived}
        otpVerified={otpVerified}
        rideTide={rideTide}
        ride3mTimes={ride3mTimes}
      />
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
