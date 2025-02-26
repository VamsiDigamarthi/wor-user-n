import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { faqData } from "../../../../../../Constants/FaqData";

import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../../fonts/Fonts";

export default function FaqListCard({ orderId, isRideHistorySreen = true }) {
  const navigation = useNavigation();

  function handleNavigation(caterogy) {
    navigation.navigate("ChatBot", {
      caterogy,
      orderId,
      isRideHistorySreen: isRideHistorySreen,
    });
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
            <View style={style.iconContainer}>
              <Image source={e.icon} style={style.icon} />
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
    fontFamily: fonts.robotoBold,
    fontSize: 16,
  },
  iconContainer: { flexDirection: "row", gap: 10, alignItems: "center" },
  icon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
