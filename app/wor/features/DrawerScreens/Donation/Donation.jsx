import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomBtn from "../../../utiles/CustomBtn";

import DonationImage from "./Components/DonationImage/DonationImage";
import DonationSelectBox from "./Components/DonationSelectBox/DonationSelectBox";
import DonationSuccessStories from "./Components/DonationSuccesStories/DonationSuccessStories";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../../../utiles/InputCard/InputCard";
import { useState } from "react";
import CustomeAppbar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { usePayments } from "../../../Payments/useRazorpay";
import { useSelector } from "react-redux";
import { fonts } from "../../../fonts/Fonts";

const screenWidth = Dimensions.get("window").width;

const Donation = () => {
  const navigation = useNavigation();
  const [donationAmount, setDonationAmount] = useState(0);

  const onChangeDonationAmount = (amount) => {
    console.log("onChangeDonationAmount");
    setDonationAmount(amount);
  };

  const { makeDonation } = usePayments();

  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Donation" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.conatiner}
        showsVerticalScrollIndicator={false}
      >
        <DonationImage />
        <Text style={styles.mainText}>Enter Donation Amount</Text>
        <Text style={styles.womenRiderText}>
          Make sure this is Monthly Donation for the Empower Women Rider
        </Text>
        <InputBox
          label="Donation Amount"
          keyboardType="number"
          placeholder="Enter Donation Amount"
          iconType="FontAwesome"
          icon="money"
          value={donationAmount}
          onChangeText={setDonationAmount}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.ruppesCard}>
            <Pressable onPress={() => onChangeDonationAmount(10)}>
              <Text style={styles.rupeeChip}>10 Rs</Text>
            </Pressable>
          </View>
          <View style={styles.ruppesCard}>
            <Pressable onPress={() => onChangeDonationAmount(20)}>
              <Text style={styles.rupeeChip}>20 Rs</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.mainText}>Empower Women Rider</Text>
        <Text style={styles.subText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the
        </Text>
        <DonationSelectBox />
        <DonationSuccessStories />
      </ScrollView>

      <View style={styles.positionCard}>
        <CustomBtn
          title="Donate Now"
          btnBg="#EA4C89"
          btnColor="#fff"
          onPress={() => {
            makeDonation();
          }}
        />
      </View>
    </View>
  );
};

export default Donation;

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 1,
    gap: 15,
    paddingBottom: 80,
    paddingHorizontal: 15,
    // backgroundColor: "#fff",
    gap: 15,
  },

  rupeeChip: { fontFamily: fonts.robotoBold },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
  mainText: {
    fontSize: 20,
    // fontWeight: "600",
    fontFamily: fonts.robotoSemiBold,
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 2,
  },
  subText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "justify",
    fontFamily: fonts.robotoSemiBold,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderColor: "#ffe2e6",
    borderWidth: 2,
    borderRadius: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  womenRiderText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.robotoRegular,
  },
  ruppesCard: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 2,
    borderColor: "#EA4C89",
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
});
