import { View, StyleSheet } from "react-native";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import SetMPin from "../Components/SetMPin";
import ForgotMPin from "../Components/ForgotMPin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fonts } from "../../../../fonts/Fonts";

export default function MpinScreen() {
  const { profile } = useSelector((state) => state.profileSlice);

  const [mPinDisplay, setMPinDisplay] = useState(!profile?.mpin);
  // const mPinDisplay = true;

  const handleChangeSetMpin = () => {
    setMPinDisplay(!mPinDisplay);
  };

  return (
    <AppBarLayout title="Set M-Pin" isPositionAppbar={true}>
      <View style={styles.container}>
        {mPinDisplay ? (
          <SetMPin handleChangeSetMpin={handleChangeSetMpin} />
        ) : (
          <ForgotMPin handleChangeSetMpin={handleChangeSetMpin} />
        )}
      </View>
    </AppBarLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 100,
    gap: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
