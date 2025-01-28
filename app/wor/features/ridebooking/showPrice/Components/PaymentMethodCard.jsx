import { View, Text, StyleSheet } from "react-native";
import { Upi, Gpay, BhimUpi, Paytm } from "../../../../Images/Payment";

export default function PaymentMethodCard() {
  return (
    <View>
      <Text style={styles.heading}>Payments</Text>

      <View style={{ flexDirection: "row" }}>
        <Upi />
        <Gpay />
        <BhimUpi />
        <Paytm />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  upiCard: {
    backgroundColor: "#fff",
    elevation: 2,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "red",
    flexDirection: "row",
    width: "100%",
    // height: 50,
    // width: 50,
  },
});
