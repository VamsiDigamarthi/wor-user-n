import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Upi,
  Gpay,
  BhimUpi,
  Paytm,
  Cred,
  Navi,
  PhonePay,
} from "../../../../Images/Payment";
import { fonts } from "../../../../fonts/Fonts";
import CustomRadioBtn from "./CustomRadioBtn";

export default function UpiCard({ selected, setSelected }) {
  return (
    <View style={styles.card}>
      <View>
        <View style={[styles.row, { width: "100%" }]}>
          <Upi height={50} width={50} />
          <View
            style={{
              flexDirection: "row",
              gap: 30,
              justifyContent: "space-between",
              width: "84%",
            }}
          >
            <Text style={styles.text}>Pay Using Any Upi App or Upi Id</Text>
            <CustomRadioBtn onPress={setSelected} selected={selected} />
          </View>
        </View>

        <View style={styles.row}>
          <Gpay height={50} width={50} />
          <BhimUpi height={50} width={50} />
          <Paytm height={50} width={50} />
          <Cred height={50} width={50} />
          <Navi height={50} width={50} />
          <PhonePay height={50} width={50} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  card: {
    // backgroundColor: "red",
    elevation: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },

  text: {
    fontFamily: fonts.robotoRegular,
  },
});
