import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

import DonationImage from "../../../Components/Dashboard/DonationCom/DonationImage/DonationImage";
import DonationSelectBox from "../../../Components/Dashboard/DonationCom/DonationSelectBox/DonationSelectBox";
import DonationSuccessStories from "../../../Components/Dashboard/DonationCom/DonationSuccesStories/DonationSuccessStories";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import InputBox from "../../../Utils/InputCard/InputCard";
import { useState } from "react";
import CustomeAppbar from "../../../Utils/CustomeAppbar/CustomeAppbar";

const screenWidth = Dimensions.get("window").width;

const Donation = () => {
  const navigation = useNavigation();

  const [donationAmount, setDonationAmount] = useState(0);

  const onChangeDonationAmount = (amount) => {
    console.log("onChangeDonationAmount");
    setDonationAmount(amount);
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Donation" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 15,
          paddingBottom: 80,
          paddingHorizontal: 15,
          // backgroundColor: "#fff",
          gap: 15,
        }}
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
          onChangeText={(value) => setDonationAmount(value)}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.ruppesCard}>
            <Pressable onPress={() => onChangeDonationAmount(10)}>
              <Text style={{ fontWeight: "bold" }}>10 Rs</Text>
            </Pressable>
          </View>
          <View style={styles.ruppesCard}>
            <Pressable onPress={() => onChangeDonationAmount(20)}>
              <Text style={{ fontWeight: "bold" }}>20 Rs</Text>
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
            navigation.navigate("Coins");
          }}
        />
      </View>
    </View>
  );
};

export default Donation;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 26,
    gap: 20,
    position: "relative",
  },
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
    fontWeight: "600",
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 2,
  },
  subText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "justify",
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
