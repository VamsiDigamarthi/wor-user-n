import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AddPaymnetCard = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AntDesign name="plus" size={17} color="#EA4C89" />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default AddPaymnetCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginLeft: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    fontSize: 13,
    color: "#808080",
    fontWeight: "600",
  },
  card: {
    width: 25,
    height: 25,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
