import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AadharFaceNagivetor from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DocumentRelatedChecCom from "./DocumentRelatedChecCom";
import BottomLayout from "../../../Layouts/BottomLayout";
const DocumentRelatedCheck = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("Press");
    navigation.navigate("aadharverification");
  };

  const onFaceAuthentication = () => {
    console.log("Face Authentication");
  };

  return (
    <BottomLayout
      title="User Verification"
      subTitle="Identity Check with Aadhaar and Face Scan for Safe Ride Bookings"
    >
      <View style={styles.container}>
        <OnAddharVerification
          onPress={handlePress}
          idTitle="Government ID"
          title="Aadhaar information will be used to verify and create your account."
        />
        <OnAddharVerification
          onPress={onFaceAuthentication}
          idTitle="Face Authentication"
          title="Face scan is required to complete your registration. It will be used to verify your identity when booking rides."
        />
      </View>
    </BottomLayout>
  );
};

const OnAddharVerification = ({ idTitle, title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.aadgarCard}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#e02e88",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowsalt" size={20} />
          </View>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>{idTitle}</Text>
        </View>
        <Text style={styles.aatextColor}>{title}</Text>
      </View>
    </Pressable>
  );
};
export default DocumentRelatedCheck;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
  aadgarCard: {
    width: "100%",
    borderRadius: 10,
    elevation: 1,
    backgroundColor: "#fff",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  aatextColor: {
    color: "#808080",
    textAlign: "center",
  },
});
