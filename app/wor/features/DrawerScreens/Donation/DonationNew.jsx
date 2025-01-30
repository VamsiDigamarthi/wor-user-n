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
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import CustomBtn from "../../../utiles/CustomBtn";
import CustomSwitch from "../../../utiles/CustomSwitch";
import { usePayments } from "../../../Payments/useRazorpay";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";

const DonationNew = () => {
  const profile = useSelector((state) => state.profileSlice.profile);
  const { makeDonation } = usePayments();
  const [donationAmount, setDonationAmount] = useState(0);

  const memoizedProfile = useMemo(() => profile, [profile]);

  const handleToggle = (isOn) => {
    if (isOn) {
      // Handle toggle logic here if needed
    }
  };

  useEffect(() => {
    console.log(donationAmount);
  }, [donationAmount]);

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AppBarLayout title="Donation" isPositionAppbar>
          <View style={styles.container}>
            <View style={styles.switchContainer}>
              <Text style={styles.heading}>
                ₹2 per ride to Women Rider Foundation
              </Text>
              <CustomSwitch onToggle={handleToggle} />
            </View>

            <View>
              <TextInput
                value={donationAmount}
                onChangeText={setDonationAmount}
                style={styles.input}
                placeholder="Enter Donation Amount"
                keyboardType="numeric"
              />

              <View style={styles.btnGroup}>
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
              <Text style={styles.listTxt}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat.
              </Text>
              <Text style={styles.listTxt}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat.
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomBtn
              title="Continue"
              onPress={() =>
                makeDonation(
                  donationAmount,
                  memoizedProfile.email,
                  memoizedProfile.mobile
                )
              }
              btnColor={donationAmount ? "#f7f7f7" : "#ea4c89"}
              btnBg={donationAmount ? "#ea4c89" : "#f7f7f7"}
            />
          </View>
        </AppBarLayout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DonationNew;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    paddingTop: 100,
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
  btnGroup: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
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
  infoContainer: {
    gap: 10,
  },
  listTxt: {
    fontFamily: fonts.robotoRegular,
    textAlign: "justify",
  },
  buttonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 10,
    width: "95%",
    left: 10,
  },
});
