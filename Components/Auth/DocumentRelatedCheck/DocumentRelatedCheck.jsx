import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BottomLayout from "../../../Layouts/BottomLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../Constants/url";
import ModalUI from "../../../Utils/Modal/Modal";
import { infoModalStyles } from "../../InfoUi/Styles/InfoModalStyles";
import OtpInfoUi from "../../InfoUi/OtpInfoUi";
import { userVerification } from "../../InfoUi/data/infoData";

const DocumentRelatedCheck = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);

  const onFetchProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  // Use useFocusEffect to re-trigger the API call when navigating back to this screen
  useFocusEffect(
    useCallback(() => {
      onFetchProfile();
    }, [])
  );

  // console.log("Profile Data:", profile?.aadharCarVerificaation);

  const handlePress = () => {
    navigation.navigate("aadharverification");
  };

  const onFaceAuthentication = () => {
    console.log("onFaceAuthentication");
    navigation.navigate("MPin");
  };

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <BottomLayout
      title="User Verification"
      subTitle="Identity Check with Aadhaar and Face Scan for Safe Ride Bookings"
      onHandleOpenInfoModal={onHandleOpenInfoModal}
    >
      <View style={styles.container}>
        <OnAddharVerification
          onPress={handlePress}
          idTitle="Government ID"
          title="Aadhaar information will be used to verify and create your account."
          isBackground={profile?.adhar}
        />

        {profile?.aadharCarVerificaation && (
          <OnAddharVerification
            onPress={onFaceAuthentication}
            idTitle="M-PIN"
            // title="Face scan is required to complete your registration. It will be used to verify your identity when booking rides."
            title="Set an M-PIN to complete your registration; it will be used to secure your account"
            isBackground={profile?.mpin}
          />
        )}

      </View>
      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
      >
        <OtpInfoUi mainTitle="User Verification" data={userVerification} />
      </ModalUI>
    </BottomLayout>
  );
};

const OnAddharVerification = ({ idTitle, title, onPress, isBackground }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.aadgarCard,
          isBackground && { backgroundColor: "#fac9c5" },
        ]}
      >
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
