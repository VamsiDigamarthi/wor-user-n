import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DocumentRelatedChecCom = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstCard}>
        <Text>{title}</Text>
      </View>
      <View style={styles.secondCard}>
        <Pressable android_ripple={{ color: "#ccc" }} onPress={onPress}>
          <Ionicons name="arrow-forward-outline" size={25} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default DocumentRelatedChecCom;

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
    backgroundColor: "#EA4C89",
    justifyContent: "center",
    alignItems: "center",
  },
});
