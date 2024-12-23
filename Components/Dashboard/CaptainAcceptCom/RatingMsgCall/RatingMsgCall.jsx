import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RatingMsgCall = ({ otpVerified, orderId, captainDetails }) => {
  const navigation = useNavigation();
  // console.log(captainDetails);

  return (
    <View style={styles.container}>
      <View style={styles.ratingCard}>
        <Text style={styles.ratingText}>4.3</Text>
        <Ionicons name="star" size={20} color="#e02e88" />
      </View>
      {!otpVerified && (
        <View style={styles.messageCard}>
          {/* <TextInput placeholder="Message Dharani" /> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat", { orderId, captainDetails });
            }}
          >
            <Text style={styles.ratingText}>
              Message {captainDetails?.name}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!otpVerified && (
        <View style={styles.callCard}>
          <Ionicons name="call" size={20} color="#e02e88" />
        </View>
      )}
      {otpVerified && (
        <View style={styles.supportCard}>
          <View style={styles.supportSingleCard}>
            <MaterialIcons name="support-agent" size={20} color="#e02e88" />
            <Text style={{ fontSize: 14, fontWeight: "600" }}>Support</Text>
          </View>
          <View style={styles.supportSingleCard}>
            <FontAwesome name="share-square-o" size={20} color="#e02e88" />
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Share Live Location
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default RatingMsgCall;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "flex-end",
    // backgroundColor: "red",
  },
  ratingCard: {
    width: "25%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e02e88",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    flexDirection: "row",
    gap: 5,
    height: 38,
  },
  ratingText: {
    color: "#e02e88",
    fontWeight: "700",
  },
  messageCard: {
    width: "60%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e02e88",
    padding: 4,
    paddingHorizontal: 10,
    height: 38,
  },
  callCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e02e88",
    paddingHorizontal: 7,
    justifyContent: "center",
    alignItems: "center",
    height: 38,
  },
  supportCard: {
    width: "70%",
    // backgroundColor: "red",
    gap: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  supportSingleCard: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
