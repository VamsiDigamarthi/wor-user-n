import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import faqData from "../../../../../../Constants/FaqData.json";
import { useNavigation } from "@react-navigation/native";
export default function FaqListCard() {
  const navigation = useNavigation();
  function handleNavigation(title) {
    navigation.navigate("FaqHome", { title: title });
  }
  return (
    <View style={style.container}>
      {faqData?.map((e, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={style.card}
            onPress={() => handleNavigation(e.maintitle)}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome name="book" size={30} color="#414141" />
              <Text style={style.text}>{e?.maintitle}</Text>
            </View>
            <Feather name="chevron-right" size={30} color="#B0B0B0" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  card: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#EEEEEE",
    paddingVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
