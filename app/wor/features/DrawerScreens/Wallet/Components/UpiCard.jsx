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

export default function UpiCard({ setSelected, selected }) {
  return (
    <TouchableOpacity style={styles.container} onPress={setSelected}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Upi height={30} width={30} />
          <Text style={styles.maintext}>Pay using any Upi app or Upi Id</Text>
        </View>

        <CustomRadioBtn selected={selected} onPress={setSelected} />
      </View>
      <View style={styles.list}>
        {[Gpay, BhimUpi, Cred, Navi].map((Component, index) => {
          return <Component key={index} height={40} width={40} />;
        })}
      </View>
      <View style={styles.list}>
        {[PhonePay, Paytm, Cred, Navi].map((Component, index) => {
          return <Component key={index} height={40} width={40} />;
        })}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },

  maintext: {
    fontFamily: fonts.robotoSemiBold,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
