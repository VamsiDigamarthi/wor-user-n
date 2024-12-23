import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function ParcelOrderSummary({
  senderName,
  recevierName,
  selecteParcelType,
  price,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.descriptionCont}>
        <Text style={styles.description}>Sender Details</Text>
        <Text style={styles.description}>{senderName}</Text>
      </View>
      <View style={styles.descriptionCont}>
        <Text style={styles.description}>Recipient Details</Text>
        <Text style={styles.description}>{recevierName}</Text>
      </View>
      <View
        style={[
          styles.descriptionCont,
          { borderBottomWidth: 1, paddingBottom: 12 },
        ]}
      >
        <Text style={styles.description}>Item Type</Text>
        <Text style={styles.description}>{selecteParcelType}</Text>
      </View>

      <View style={[styles.descriptionCont]}>
        <Text style={styles.description}>Delivery Charge</Text>
        <Text style={styles.description}>₹ {Math.ceil(+price)}</Text>
      </View>
      <View
        style={[
          styles.descriptionCont,
          { borderBottomWidth: 1, paddingBottom: 12 },
        ]}
      >
        <Text style={[styles.description, { fontWeight: "bold" }]}>
          Total Bill (With Convenience Fees)
        </Text>
        <Text style={[styles.description]}>₹ {Math.ceil(+price + 5)}</Text>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={[styles.description, { fontWeight: "bold" }]}>Note</Text>

        <Text style={{ textAlign: "justify" }}>
          A 100% fee will be charged if orders are cancelled by any time after
          they are accepted. However , in case of unusual delays you will not be
          charged for cancellation fees.
        </Text>

        <Pressable>
          <Text style={{ color: "#e02e88", fontWeight: "bold" }}>
            View Cancellation Policy
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },

  descriptionCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
