import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import CustomeAppBar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CustomBtn from "../../../utiles/CustomBtn";
import CopyBox from "../../../utiles/CopyBox";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import ModalUI from "../../../utiles/Modal/Modal";
import InputBox from "../../../utiles/InputCard/InputCard";
import { usePayments } from "../../../Payments/useRazorpay";
import { useSelector } from "react-redux";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
export default function Wallet() {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const { addToWallet, profile } = usePayments();

  console.log(profile?.walletBalance);

  return (
    <AppBarLayout title="E-Wallet" isPositionAppbar={true}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
            <Entypo name="wallet" size={30} color="#e02e88" />
            <Text style={styles.heading}>Wor Wallet</Text>
          </View>

          <Text style={styles.amount}>₹ {profile?.walletBalance}</Text>

          <CustomBtn
            //   borderWidth={1}
            onPress={() => setOpen(!open)}
            btnBg={"#F7F7F7"}
            title="+ Add Money To Wallet"
          />
        </View>
        <CopyBox />

        <TouchableOpacity
          style={[
            styles.card,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
          onPress={() => navigation.navigate("PaymentHistory")}
        >
          <Text>Payment History</Text>
          <Entypo name="chevron-right" size={24} color={"#B0B0B0"} />
        </TouchableOpacity>
      </View>

      {open && (
        <KeyboardAvoidingView>
          <ModalUI
            modalStyle="slide"
            style={infoModalStyles.aadharModalStyles}
            insideCardStyle={infoModalStyles.insideCardStyle}
            closebtn={false}
            closeModalFun={() => setOpen(!open)}
          >
            <View style={styles.btContainer}>
              <Text style={styles.heading}>Adding Money To Wallet</Text>

              <InputBox
                keyboardType="numeric"
                onPress={() => Keyboard.dismiss()}
                // maxLength={}
                placeholder="0.0"
                label="Enter Amount"
                isIconsNotText={true}
                icon={"currency-rupee"}
                iconType="MaterialIcons"
                value={amount}
                onChangeText={setAmount}
                // isValid={!errorState.mobile}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 40,
                }}
              >
                <AntDesign name="Safety" size={24} color="green" />
                <Text>100% Safe and Secure Payments</Text>
              </View>

              <CustomBtn
                width="100%"
                onPress={() => addToWallet(amount)}
                title="continue"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 90,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    borderRadius: 15,
    marginTop: 10,
    elevation: 1,
    backgroundColor: "#fff",
    padding: 20,
    // marginHorizontal: 10,
  },

  amount: {
    color: "#e02388",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 45,
    marginBottom: 10,
  },
  btContainer: {
    padding: 16,
    width: "100%",
    gap: 10,
  },
});
