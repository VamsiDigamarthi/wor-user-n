import { StyleSheet, Text, View, Pressable, TextInput } from "react-native"; // Import Pressable
import { Ionicons } from "@expo/vector-icons";

const AadharFaceNavigator = ({
  title,
  onPress,
  isInput = false,
  isText = false,
  inputWidth = "80%",
  textWidth = "20%",
  onTextChange = () => {},
  value = "",
  isEditable = true,
  pressBtnOrText = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.firstCard, { width: inputWidth }]}>
        {isInput ? (
          <TextInput
            onChangeText={onTextChange}
            placeholder="Enter your aadhar number"
            value={value}
            keyboardType="numeric"
            editable={isEditable}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
      <View
        style={[
          styles.secondCard,
          { width: textWidth, backgroundColor: !pressBtnOrText && "#f797c7" },
        ]}
      >
        {pressBtnOrText ? (
          <Pressable android_ripple={{ color: "#ccc" }} onPress={onPress}>
            {isText ? (
              <Text style={styles.otpTextColor}>Get OTP</Text>
            ) : (
              <Ionicons name="arrow-forward-outline" size={25} color="#fff" />
            )}
          </Pressable>
        ) : (
          <Text style={styles.verifiedText}>Verified</Text>
        )}
      </View>
    </View>
  );
};

export default AadharFaceNavigator;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EDEDED",
    backgroundColor: "#F7F7F7",
    overflow: "hidden",
  },
  firstCard: {
    width: "80%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  secondCard: {
    width: "20%",
    height: "100%",
    backgroundColor: "#E02E88",
    justifyContent: "center",
    alignItems: "center",
  },
  otpTextColor: {
    color: "#fff",
    fontWeight: "600",
  },
  verifiedText: {
    color: "#fff",
  },
});
