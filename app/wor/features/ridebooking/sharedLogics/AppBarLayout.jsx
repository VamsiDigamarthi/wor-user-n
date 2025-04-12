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
  timerFunction,
  // ride accept screen props
  isArrived,
  otpVerified,
  rideTide,
  ride3mTimes,
  isRideBookingScree,
  borderStyles,
  rightText,
  navigationText,
  chatBotText,
}) => {
  return (
    <View style={styles.container}>
      <Appbar
        isPositionAppbar={isPositionAppbar}
        title={title}
        vicinity={vicinity}
        isTimer={isTimer}
        timerFunction={timerFunction}
        isDrawerIcon={isDrawerIcon}
        isArrived={isArrived}
        otpVerified={otpVerified}
        rideTide={rideTide}
        ride3mTimes={ride3mTimes}
        isRideBookingScree={isRideBookingScree}
        borderStyles={borderStyles}
        rightText={rightText}
        navigationText={navigationText}
        chatBotText={chatBotText}
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
    height: "100%",
  },
});
