import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import { Ionicons } from "@expo/vector-icons";
const RatingCard = () => {
  const [rating, setRating] = useState(0); // state to track the selected rating (0 to 5)

  // Function to handle star press
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };
  return (
    <View style={styles.container}>
      <View style={styles.vehcleConfirmCard}>
        <Text style={styles.vehicleWasCheck}>
          was the vehicle numberis correct
        </Text>
        <View style={styles.connfirmVehicleCard}>
          <Text style={[styles.confimrText, styles.confirmTextColor]}>Yes</Text>
          <Text style={styles.confimrText}>No</Text>
        </View>
      </View>
      <View style={styles.starCard}>
        <Text>Rating the Rider</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Ionicons
                name="star"
                size={30}
                color={star <= rating ? "#e02e88" : "#ccc"} // Change star color based on rating
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.starContainerInputCard}>
          {/* start place */}
          <TextInput style={styles.inputCard} placeholder="Share Experience" />
        </View>
      </View>
      <View style={styles.btnThankCard}>
        <CustomBtn
          title="Give Rating"
          btnBg="#e02088"
          btnColor="#fff"
          width="60%"
        />
        <Text style={styles.thankyou}>Thanks for choosing us.</Text>
        <Text>skip to home screen</Text>
      </View>
    </View>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 35,
  },
  vehcleConfirmCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleWasCheck: {
    fontSize: 12,
    color: "gray",
  },
  connfirmVehicleCard: {
    flexDirection: "row",
    gap: 10,
  },
  confimrText: {
    fontSize: 13,
    fontWeight: "600",
  },
  confirmTextColor: {
    color: "#e02e88",
  },
  starCard: {
    gap: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  starContainerInputCard: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e02e88",
    height: 50,
  },
  inputCard: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  btnThankCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  thankyou: {
    fontSize: 20,
    color: "#e02e88",
    fontWeight: "600",
  },
});
