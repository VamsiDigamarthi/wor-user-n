import { StyleSheet, Text, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../Constants/colors";

const WalletMoneyCard = () => {
  return (
    <View style={styles.container}>
      <SingleWallet />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: COLORS.cardBackground,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="plus" size={17} color="gray" />
        </View>
        <Text style={{ color: COLORS.subHeading, fontSize: 12 }}>
          Add Money to Wallet
        </Text>
      </View>
    </View>
  );
};

export default WalletMoneyCard;

const SingleWallet = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#fff5f9",
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLORS.cardBackground,
      }}
    >
      <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
        <Ionicons name="wallet-outline" size={20} color="#e02e88" />
        <Text style={{ color: COLORS.subHeading }}>Wallet</Text>
      </View>
      <Text>$100</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
    gap: 10,
  },
});
