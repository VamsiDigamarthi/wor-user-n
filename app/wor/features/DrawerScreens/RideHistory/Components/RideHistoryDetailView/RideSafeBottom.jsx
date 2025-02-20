import { Image, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  Billing,
  Helmet,
  Payment,
  Prefrences,
  Refer,
  Services,
} from "../../../../../Images/Ride";

const RideSafeBottom = () => {
  return (
    <View style={styles.container}>
      <HandlWithSupport />
      <View style={styles.cardContainer}>
        <View style={styles.singleCard}>
          <Image style={styles.singleCardImage} source={Helmet} />
          <Text style={styles.text}>Safety & Security</Text>
        </View>
        <View style={styles.singleCard}>
          <Image style={styles.singleCardImage} source={Billing} />
          <Text style={styles.text}>Ride & Billing</Text>
        </View>
        <View style={styles.singleCard}>
          <Image style={styles.singleCardImage} source={Services} />
          <Text style={styles.text}>Services</Text>
        </View>
        <View style={styles.singleCard}>
          <Image style={styles.singleCardImage} source={Prefrences} />
          <Text style={styles.text}>Account & App</Text>
        </View>
        <View style={styles.singleCard}>
          <Image style={styles.singleCardImage} source={Refer} />
          <Text style={styles.text}>Refereals</Text>
        </View>
        <View style={styles.singleCard}>
          <Image style={styles.singleCardImage} source={Payment} />
          <Text style={styles.text}>Payments & Wallets</Text>
        </View>
      </View>
    </View>
  );
};

export default RideSafeBottom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 1,
    gap: 15,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap when necessary
    justifyContent: "space-between", // Space out the items
  },
  singleCard: {
    width: "48%", // 50% minus margin for spacing
    borderWidth: 1,
    borderColor: "#ffe2e6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20, // Adds spacing between rows
  },
  singleCardImage: {
    width: "90%",
    height: 150,
    resizeMode: "contain",
  },
  text: {
    fontSize: 11,
  },
});

const HandlWithSupport = () => {
  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>Support</Text>
      <FontAwesome name="handshake-o" size={20} color="#EA4C89" />
    </View>
  );
};
