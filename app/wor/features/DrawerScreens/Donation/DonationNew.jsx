import { View, Text, StyleSheet, TouchableOpacity , Keyboard, TouchableWithoutFeedback } from "react-native";

import CustomBtn from "../../../utiles/CustomBtn";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import CustomSwitch from "../../../utiles/CustomSwitch";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePayments } from "../../../Payments/useRazorpay";

export default function DonationNew() {
  const { profile } = useSelector((state) => state.profileSlice);
  const { makeDonation } = usePayments();
  const { email, mobile, name } = profile;
  console.log(email, mobile, name);

  const handleToggle = (isOn) => {
    if (isOn) {
      //   let added = parseInt(donationAmount) + 2;
      //   setDonationAmount(added.toString());
    }
  };

  const [donationAmount, setDonationAmount] = useState(0);

  const onChangeDonationAmount = (amount) => {
    setDonationAmount(amount);
  };

  useEffect(() => {
    console.log(donationAmount);
  }, [donationAmount]);

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomeAppbar title="Donation" onBack={() => navigation.goBack()} />

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
          <Text>
            Make sure this is Monthly Donation For the Empower Women Rider
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 10,
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
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  heading: {
    fontWeight: "bold",
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
  },
  smallBtn: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    borderRadius: 10,
  },
});
