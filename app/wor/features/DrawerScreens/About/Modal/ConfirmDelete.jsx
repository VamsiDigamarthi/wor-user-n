import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TickCard } from "../components/TickCard";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useSelector } from "react-redux";
import { API } from "../../../../../../Constants/url";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ConfirmDelete = ({
  handleDeleteAcoountModal,
  setDisplayModalType,
  selectedValue,
}) => {
  const { token } = useSelector((state) => state.token);
  const navigation = useNavigation();
  const data = [
    "We will get back to you within 30 business days.",
    "If there are no pending actions on your end, we will delete the account",
    "If there are pending actions we will reach out to you and inform you of the actions you need to take before we can process your account deletion request",
  ];

  const handleAccountDeletRequest = async () => {
    console.log("iuhgf");
    try {
      await API.patch(
        "/auth/account-deletion-request",
        { selectedValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      AsyncStorage.removeItem("token");
      navigation.navigate("AuthStack");
      handleDeleteAcoountModal();
      setDisplayModalType("lease");
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Your Request Received..!",
        type: "success",
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstCard}>
        <View style={{ width: "70%", gap: 5 }}>
          <Text style={styles.mainHeading}>
            Account deletion request received
          </Text>
          <Text style={styles.subText}>We are processing your request</Text>
        </View>
      </View>
      <Text style={styles.pleaseNote}>PLEASE NOTE</Text>
      {data?.map((dat, index) => (
        <TickCard key={index} text={dat} />
      ))}
      <CustomBtn
        title="Okay"
        btnBg="#e02e88"
        btnColor="#fff"
        onPress={handleAccountDeletRequest}
      />
    </View>
  );
};

export default ConfirmDelete;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  firstCard: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    color: "gray",
  },
  pleaseNote: {
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
});
