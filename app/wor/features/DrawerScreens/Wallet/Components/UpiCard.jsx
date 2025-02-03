import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  Upi,
  // Gpay,
  // // BhimUpi,
  // Paytm,
  // Cred,
  // Navi,
  // PhonePay,
} from "../../../../Images/Payment";
import { fonts } from "../../../../fonts/Fonts";
import CustomRadioBtn from "./CustomRadioBtn";

import {
  BhimUpi,
  cred,
  hdfc,
  mobikwik,
  sbi,
  amazon,
  gpay,
  phonepay,
  navi,
  paytm,
} from "../../../../Images/PaymentNew";

const upiAppImages = [
  {
    name: "Google Pay",
    icon: gpay,
  },
  {
    name: "PhonePe",
    icon: phonepay,
  },
  {
    name: "Paytm",
    icon: paytm,
  },
  {
    name: "BHIM",
    icon: BhimUpi,
  },
  {
    name: "Mobikwik",
    icon: mobikwik,
  },
  {
    name: "SBI Yono",
    icon: sbi,
  },
  {
    name: "Cred",
    icon: cred,
  },

  {
    name: "HDFC Bank",
    icon: hdfc,
  },
  {
    name: "Amazon Pay",
    icon: amazon,
  },
  {
    name: "Navi",
    icon: navi,
  },
];

export default function UpiCard({ setSelected, selected, installedUpiApps }) {
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
        {upiAppImages
          ?.filter((e) => installedUpiApps.includes(e.name))
          .slice(0, 4) // Take only the first 4 matched items
          .map((e, index) => (
            <Image source={e.icon} key={index} style={styles.icon} />
          ))}
      </View>
      {/* <View style={styles.list}>
        {upiAppImages
          ?.filter((e) => installedUpiApps.includes(e.name))
          .slice(4) // Take only the first 4 matched items
          .map((e, index) => (
            <Image source={e.icon} key={index} style={styles.icon} />
          ))}
      </View> */}
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

  icon: {
    height: 48,
    width: 48,
    resizeMode: "contain",
  },
});
