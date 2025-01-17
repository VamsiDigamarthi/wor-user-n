import { View, Text, StyleSheet } from "react-native";
import CustomeAppBar from "../../../../../Utils/CustomeAppbar/CustomeAppbar";
import Entypo from "@expo/vector-icons/Entypo";
import CustomBtn from "../../../utiles/CustomBtn";
export default function Wallet() {
  return (
    <View style={styles.container}>
      <CustomeAppBar title="E-Wallet" onBack={() => navigation.goBack()} />

      <View style={styles.card}>
        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <Entypo name="wallet" size={30} color="#e02e88" />
          <Text style={styles.heading}>Wor Wallet</Text>
        </View>

        <Text style={styles.amount}>₹ 1025</Text>

        <CustomBtn
          //   borderWidth={1}
          btnBg={"#F7F7F7"}
          title="+ Add Money To Wallet"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    marginHorizontal: 10,
  },

  amount: {
    color: "#e02388",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 45,
    marginBottom: 10,
  },
});
