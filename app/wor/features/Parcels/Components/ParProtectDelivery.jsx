import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../fonts/Fonts";

const ParProtectDelivery = ({ isChecked, handleProtectedParcel }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerCard}>
        <Text style={styles.title}>
          Protect Your Delivery
        </Text>
        <Text style={styles.text}>
          Recipients will receive a 4 digits PIN once the package is on its way
        </Text>
      </View>
      <Pressable style={styles.checkBox} onPress={handleProtectedParcel}>
        <View
          style={[
            styles.checkbox,
            isChecked && { backgroundColor: "#E02E88", borderColor: "#fff5f9" }, // Changes background when checked
          ]}
        >
          {isChecked && <Ionicons name="checkmark" size={20} color="white" />}
        </View>
      </Pressable>
    </View>
  );
};

export default ParProtectDelivery;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 14,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 13,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  innerCard: {
    width: "86%",
    // backgroundColor: "red",
    gap: 3,
  },
  checkBox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    width: "100%",
    height: "100%",
  },

  title:{ fontSize: 15, fontFamily:fonts.robotoSemiBold },
  text:{ fontSize: 12, color: "gray", fontFamily:fonts.robotoRegular }
});
