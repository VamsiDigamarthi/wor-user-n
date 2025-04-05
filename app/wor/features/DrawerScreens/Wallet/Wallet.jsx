import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePayments } from "../../../Payments/useRazorpay";
import { fonts } from "../../../fonts/Fonts";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import CustomBtn from "../../../utiles/CustomBtn";
import CopyBox from "../../../utiles/CopyBox";
import ModalUI from "../../../utiles/Modal/Modal";
import InputBox from "../../../utiles/InputCard/InputCard";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import { COLORS } from "../../../../../Constants/colors";
function Wallet() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const { addToWallet, profile } = usePayments();

  const handleAddWallet = () => {
    addToWallet(amount);
    setOpen(!open);
  };

  return (
    <AppBarLayout title="E-Wallet" isPositionAppbar>
      <View
        style={[
          styles.container,
          { paddingTop: Platform.OS == "ios" ? 110 : 90 },
        ]}
      >
        <Text style={styles.text}>
          The WOR Wallet makes payments easy by adding money ahead of time for
          fast, secure, cashless rides. It’s safe and simple to use.
        </Text>

        <View style={styles.card}>
          <View style={styles.walletHeader}>
            <Entypo name="wallet" size={30} color="#EA4C89" />
            <Text style={styles.heading}>E-Wallet</Text>
          </View>
          <Text style={styles.amount}>₹ {profile?.walletBalance}</Text>
          <CustomBtn
            onPress={() => setOpen(true)}
            btnBg="#F7F7F7"
            title="+ Add Money To Wallet"
          />
        </View>

        <CopyBox />

        {[
          { title: "Payment History", route: "PaymentHistory" },
          // { title: "Payment Method", route: "PaymentMethodNew" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardRow}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={styles.cardText}>{item.title}</Text>
            <Entypo name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        ))}
      </View>

      {open && (
        <KeyboardAvoidingView>
          <ModalUI
            modalStyle="slide"
            style={infoModalStyles.aadharModalStyles}
            insideCardStyle={infoModalStyles.insideCardStyle}
            closebtn={false}
            closeModalFun={() => setOpen(false)}
          >
            <View style={styles.btContainer}>
              <Text style={styles.heading}>Adding Money To Wallet</Text>
              <InputBox
                keyboardType="numeric"
                placeholder="0.0"
                label="Enter Amount"
                isIconsNotText
                icon="currency-rupee"
                iconType="MaterialIcons"
                value={amount}
                onChangeText={setAmount}
              />
              <View style={styles.safePaymentContainer}>
                <AntDesign name="Safety" size={24} color="green" />
                <Text style={styles.safePaymentText}>
                  100% Safe and Secure Payments
                </Text>
              </View>
              <CustomBtn
                width="100%"
                onPress={handleAddWallet}
                title="Continue"
                btnBg={amount ? "#EA4C89" : "#F7F7F7"}
                btnColor={amount ? "#fff" : "#000"}
              />
            </View>
          </ModalUI>
        </KeyboardAvoidingView>
      )}
    </AppBarLayout>
  );
}

export default memo(Wallet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackgroundColor,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: fonts.robotoMedium,
    textAlign: "justify",
    paddingVertical: 10,
    lineHeight: 20,
  },
  heading: {
    fontFamily: fonts.robotoMedium,
    fontSize: 16,
  },
  card: {
    borderRadius: 15,
    marginTop: 10,
    elevation: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  walletHeader: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  amount: {
    color: "#EA4C89",
    fontSize: 25,
    fontFamily: fonts.robotoBold,
    paddingLeft: 45,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    marginTop: 10,
    elevation: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  cardText: {
    fontFamily: fonts.robotoSemiBold,
  },
  btContainer: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: "100%",
    gap: 10,
  },
  safePaymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 40,
  },
  safePaymentText: {
    fontFamily: fonts.robotoRegular,
  },
});
