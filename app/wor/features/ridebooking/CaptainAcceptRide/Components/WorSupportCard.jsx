import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SupportIcons } from "../../../../Icons/Icons";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../../fonts/Fonts";

const WorSupportCard = () => {
  const navigation = useNavigation();

  const handelNavigateWorSupport = () => {
    navigation.navigate("SupportChat");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <SupportIcons size={20} color="gray" />
        <Text
          style={{
            fontSize: 12,
            color: "gray",
            fontFamily: fonts.robotoRegular,
          }}
        >
          Any Issue with ride
        </Text>
      </View>
      <Pressable onPress={handelNavigateWorSupport}>
        <Text style={{ color: "#0597ff", fontFamily: fonts.robotoSemiBold }}>
          WOR Support
        </Text>
      </Pressable>
    </View>
  );
};

export default WorSupportCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
