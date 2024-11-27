import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import coin from "../../../../assets/images/coin.png"
export default function ReedemHistory() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.mainText}>Reedem Coins</Text>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <ReedemHistoryCard />
        <ReedemHistoryCard />
        <ReedemHistoryCard />
        <ReedemHistoryCard />
      </ScrollView>
    </View>
  );
}

function ReedemHistoryCard() {
  return (
    <View style={styles.card}>
      <Image source={coin} style={{ height: 50, width: 50 }} />
      <View style={{ flexDirection: "row", padding:5 }}>
        <View style={{ width: "80%" }}>
          <Text style={{fontWeight:"bold"}}>Earned 50 Coins for Ride Completion.</Text>
          <Text style={{color:"#757575" , fontWeight:"bold"}}>NOV 14 - 2024</Text>
        </View>

        <Text style={{ width: "10%" , fontWeight:"bold"}}>
        ₹50
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    fontWeight: '600',
    borderBottomColor: '#ffe2e6',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFE2E6',
    height: 100, // Ensures visibility
    marginVertical: 5,
    alignItems: "center",
    gap: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding:10
  },
});
