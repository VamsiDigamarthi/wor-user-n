import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import steering from "../../../../assets/images/steering.png";
import { TouchableOpacity } from "react-native";

const CoinSlider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>How To Earn Coins</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CoinSliderCard />
        <CoinSliderCard />
        <CoinSliderCard />
      </ScrollView>
    </View>
  );
};

function CoinSliderCard() {
  return (
    <View style={styles.coinCard}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={steering}
          style={{ height: 80, width: 80, resizeMode: "contain" }}
        />
      </View>

      <View style={{ gap: 10 }}>
        <Text>"Earn coins for every ride you complete."</Text>
        <TouchableOpacity style={styles.coinBtn}>
          <Text style={styles.btnText}>Start Riding</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CoinSlider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "600",
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 2,
  },
  coinCard: {
    backgroundColor: "#FDFDFD",
    height: 200,
    width: 200,
    borderRadius: 20,
    flex: 1,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  coinBtn: {
    backgroundColor: "#EA4C89",
    padding: 8,
    borderRadius: 10,
    width: 150,
    margin: "auto",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});
