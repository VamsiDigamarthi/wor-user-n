import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import CustomBtn from "../../../utiles/CustomBtn";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import CustomSwitch from "../../../utiles/CustomSwitch";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePayments } from "../../../Payments/useRazorpay";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import { fonts } from "../../../fonts/Fonts";
import { changeDonationStatus } from "./donation.serv";
import { onProfileSection } from "../../ridebooking/home/redux/profileSlice";

export default function DonationNew() {
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

  const [donationAmount, setDonationAmount] = useState(0);

  const onChangeDonationAmount = (amount) => {
    setDonationAmount(amount);
  };

  useEffect(() => {
    console.log(donationAmount);
  }, [donationAmount]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <AppBarLayout title="Donation" isPositionAppbar={true}>
          <View style={styles.container}>
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
                <TouchableOpacity
                  style={styles.smallBtn}
                  onPress={() => onChangeDonationAmount("10")}
                >
                  <Text style={styles.btnText}>10 rs</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.smallBtn}
                  onPress={() => onChangeDonationAmount("20")}
                >
                  <Text style={styles.btnText}>20 rs</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={styles.listTxt}>
                Make sure this is Monthly Donation For the Empower Women Rider
              </Text>
              <Text style={styles.listTxt}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed
              </Text>
              <Text style={styles.listTxt}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: Platform.OS == "ios" ? 24 : 10,
              width: "95%",
              left: 10,
            }}
          >
            <CustomBtn
              title="Continue"
              onPress={() => makeDonation(donationAmount, email, mobile)}
              btnColor={donationAmount ? "#f7f7f7" : "#ea4c89"}
              btnBg={donationAmount ? "#ea4c89" : "#f7f7f7"}
            />
          </View>
        </AppBarLayout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    paddingTop: 100,
  },
  heading: {
    // fontWeight: "bold",
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
});
