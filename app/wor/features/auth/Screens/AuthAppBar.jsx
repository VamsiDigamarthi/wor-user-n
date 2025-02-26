import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackIcon } from "../../../Icons/Icons";
import SupportIcon from "../Components/SupportIcon";
import { useNavigation } from "@react-navigation/native";
import FQs from "../Components/F&Qa";

const AuthAppBar = ({ isLoginScreen = true , supportNavigate,faqs}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {isLoginScreen ? (
        <Image
          style={{ width: 140, height: 60, resizeMode: "contain" }}
          source={require("./../../../../../assets/images/logo.png")}
        />
      ) : (
        <View style={styles.innerAppBar}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable onPress={() => navigation.goBack()}>
              <BackIcon size={20} color="#000" />
            </Pressable>
            <Image
              style={{ width: 100, height: 40, resizeMode: "contain" }}
              source={require("./../../../../../assets/images/logo.png")}
            />
          </View>
          <FQs faqs={faqs} />
          {/* <SupportIcon supportNavigate={supportNavigate}/> */}
        </View>
      )}
    </View>
  );
};

export default AuthAppBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    overflow: "hidden",
  },
  innerAppBar: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    flexDirection: "row",
    height: 50,
    paddingHorizontal: 15,
  },
});
