import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
const RideDetailAmount = ({
  orderDetails,
  travellingTimeAndDistnace,
  payButton = false,
}) => {
  const navigation = useNavigation();

  const onNavigateRatingScreen = () => {
    navigation.navigate("captainrideComplete", {
      orderDetails,
      travellingTimeAndDistnace,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.fareText}>Total Fare :</Text>
        <Text style={styles.rightText}>₹ {orderDetails?.price}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.fareText}>Payment Mode : cash</Text>

        <Text style={{ color: "#EA4C89", fontWeight: "600" }}>Change</Text>
      </View>

      {/* <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: "#fff", borderWidth: 1, borderColor: "#EA4C89" },
          ]}
        >
          <Entypo name="cross" size={24} color="#EA4C89" />
          <Text style={{ fontWeight: "bold" }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <AntDesign name="customerservice" size={24} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Support</Text>
        </TouchableOpacity>
      </View> */}

      {payButton && (
        <View>
          <CustomBtn
            title="Pay Now"
            btnBg="#EA4C89"
            btnColor="#fff"
            onPress={onNavigateRatingScreen}
          />
        </View>
      )}
    </View>
  );
};

export default RideDetailAmount;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginTop: -15,
    borderRadius: 10,
    gap: 10,
    marginBottom: 7,
  },

  fareText: {
    fontWeight: "500",
    fontSize: 16,
  },

  rightText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 50,
  },

  btn: {
    flexDirection: "row",
    // justifyContent: "",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#e02388",
    width: 150,
    borderRadius: 10,
    height: "100%",
  },
});
