import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustDatePickBtn = ({ title = "2000-12-05", onPress, isValid = true }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.mainContainer, !isValid && styles.invalidInputCard]}
    >
      <View style={styles.container}>
        <Text style={[styles.label, !isValid && styles.invalidLabel]}>
          CustDatePickBtn
        </Text>
        <View style={[styles.inputCard]}>
          <Ionicons name="calendar-clear-outline" size={20} />
          <Text style={styles.inputStyle}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CustDatePickBtn;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
  },
  container: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 7,
  },
  label: {
    fontSize: 8,
    color: "#000",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  inputStyle: {
    color: "gray",
  },
  invalidInputCard: {
    borderWidth: 1,
    borderColor: "red", // Change border color to red
  },
  invalidLabel: {
    color: "red", // Change label color to red
  },
});
