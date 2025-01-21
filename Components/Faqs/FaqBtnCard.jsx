import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function FaqBtnCard({ title, onclick }) {
  return (
    <TouchableOpacity style={styles.FaqBtnCard} onPress={onclick}>
      <Text style={{ fontWeight: "bold", width: "80%" }}>{title}</Text>
      <View>
        <Entypo name="chevron-right" size={30} color="#B0B0B0" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  FaqBtnCard: {
    // borderColor: "#FFE2E6",
    // borderColor: "#e02e88",
    borderBottomWidth: 1,
    borderRadius: 10,
    borderBottomColor: "#B0B0B0",
    // height: 50,
    width: "100%",
    // backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
