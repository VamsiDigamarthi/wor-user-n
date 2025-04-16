import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useEffect, useState, useMemo, memo } from "react";
// import { useSelector } from "react-redux";
import CustomBtn from "../../../utiles/CustomBtn";
import CustomSwitch from "../../../utiles/CustomSwitch";

// import { TextInput } from "react-native-gesture-handler";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { usePayments } from "../../../Payments/useRazorpay";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import { changeDonationStatus } from "./donation.serv";
import { onProfileSection } from "../../ridebooking/home/redux/profileSlice";
import { COLORS } from "../../../../../Constants/colors";

function DonationNew() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const { makeDonation } = usePayments();
  const { email, mobile, name } = profile;

  const handleToggle = async () => {
    const data = await changeDonationStatus({ token });
    if (!data) return;
    dispatch(onProfileSection({ token }));
  };

  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    console.log(donationAmount);
  }, [donationAmount]);

  console.log("profile?.donationActive", profile?.donationActive);

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 25}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AppBarLayout title="Donation" isPositionAppbar={true}>
          <View
            style={[
              styles.container,
              { paddingTop: Platform.OS == "ios" ? 110 : 80 },
            ]}
          >
            {/* Main Content */}
            <View style={styles.contentContainer}>
              <View style={styles.switchContainer}>
                <Text style={styles.heading}>
                  ₹2 per ride to Women Rider Foundation
                </Text>

                <CustomSwitch
                  initialValue={profile?.donationActive}
                  onToggle={handleToggle}
                />
              </View>

              <View>
                <TextInput
                  value={donationAmount}
                  onChangeText={setDonationAmount}
                  style={styles.input}
                  placeholder="Enter Donation Amount"
                  keyboardType="numeric"
                />

                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                  {[10, 20].map((amount) => (
                    <TouchableOpacity
                      key={amount}
                      style={styles.smallBtn}
                      onPress={() => setDonationAmount(amount.toString())}
                    >
                      <Text style={styles.btnText}>{amount} rs</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.listTxt}>
                  Make sure this is a Monthly Donation for the Empower Women
                  Rider.
                </Text>
              </View>
            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
              <CustomBtn
                title="Continue"
                width="100%"
                onPress={() => makeDonation(donationAmount, email, mobile)}
                btnColor={donationAmount ? "#f7f7f7" : "#ea4c89"}
                btnBg={donationAmount ? "#ea4c89" : "#f7f7f7"}
              />
            </View>
          </View>
        </AppBarLayout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default memo(DonationNew);

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    width: "100%",
  },
  contentContainer: {
    flex: 1, // Ensures the main content grows to fill available space
  },
  heading: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderBottomWidth: 1,
    marginTop: 10,
    height: 30,
    padding: 0,
    fontFamily: fonts.robotoRegular,
  },
  smallBtn: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: fonts.robotoRegular,
  },
  listTxt: {
    fontFamily: fonts.robotoRegular,
    textAlign: "justify",
  },
  infoContainer: {
    gap: 10,
  },
  buttonContainer: {
    // padding: 16, // Add padding around the button
    backgroundColor: COLORS.mainBackgroundColor, // Match the background color
  },
});
