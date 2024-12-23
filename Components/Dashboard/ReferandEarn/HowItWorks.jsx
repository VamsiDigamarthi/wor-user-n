import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import coin from "../../../assets/images/coin.png";

export default function InviteCard() {
  return (
    <View style={{ gap: 12 }}>
      <Text style={styles.mainText}>How It Works ?</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.mainText}>Completing The Verification</Text>
          <Text>Within 7 days of Registration</Text>
        </View>

        <View style={styles.coinCard}>
          <Text style={styles.mainText}>YOU EARN 50</Text>

          <Image source={coin} style={{ height: 30, width: 30 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: "#fff5f9",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },

  mainText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  coinCard: {
    backgroundColor: "rgba(224, 46, 136, 0.2)",
    // opacity:0.2,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
