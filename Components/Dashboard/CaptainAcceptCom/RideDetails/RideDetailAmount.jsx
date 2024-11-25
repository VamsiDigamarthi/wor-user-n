import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";

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
          borderBottomWidth: 1,
          borderBottomColor: "#ffe2e6",
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 12, color: "#808080" }}>Total Fare:</Text>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>
          ₹ {orderDetails?.price}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12, color: "#808080" }}>
          Paymnet Mode:{"   "}
          <Text style={{ fontSize: 14, color: "#000", marginLeft: 10 }}>
            Cash
          </Text>
        </Text>
        <Text style={{ color: "#e02e88", fontWeight: "600" }}>Change</Text>
      </View>
      {payButton && (
        <View>
          <CustomBtn
            title="Pay Now"
            btnBg="#e02e88"
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
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: "#ffe2e6",
    gap: 10,
    elevation: 1,
    borderColor: "#ffe2e6",
    marginBottom: 7,
  },
});
