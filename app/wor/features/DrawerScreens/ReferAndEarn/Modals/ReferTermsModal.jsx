import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ModalUI from "../../../../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { Octicons } from "@expo/vector-icons";
import CustomBtn from "../../../../utiles/CustomBtn";

const referralRules = [
  "This referral offer is valid for registered Women Rider users only.",
  "You must refer 10 new passengers using your unique referral code.",
  "Each referred passenger must complete 3 rides within 3 days of signing up.",
  "Only new users who have never registered on Women Rider are eligible as valid referrals.",
  "Once all 10 referrals meet the criteria, ₹100 will be credited to your Women Rider wallet.",
  "All ride activity is subject to verification before rewards are issued.",
  "Fake, duplicate, or fraudulent accounts will not be considered and may disqualify you from the offer.",
  "The referral reward is non-transferable and can only be used within the app.",
  "Women Rider reserves the right to change, suspend, or cancel the referral program at any time without prior notice.",
];

export default function ReferTermsModal({ closeModal }) {
  return (
    <ModalUI
      // openCloseState={deletAcoountModal}
      closeModalFun={closeModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      // rightBtnFun={handleDeleteAccount}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>
          Passenger Referral – Terms & Conditions
        </Text>

        {referralRules?.map((e, index) => {
          return <ListItem text={e} key={index} />;
        })}

        <CustomBtn
          title={"Okay"}
          btnBg={"#EA4C89"}
          btnColor={"#FFF"}
          onPress={closeModal}
        />
      </View>
    </ModalUI>
  );
}

function ListItem({ text }) {
  return (
    <View style={styles.listItem}>
      <Octicons name="dot-fill" size={16} color="black" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    // padding: 10,
    padding: 18,
    width: "94%",
    // backgroundColor:"red"
  },
  listItem: {
    flexDirection: "row",
    gap: 6,
    // alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
