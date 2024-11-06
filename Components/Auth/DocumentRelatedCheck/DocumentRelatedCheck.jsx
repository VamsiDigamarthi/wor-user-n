import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AadharFaceNagivetor from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DocumentRelatedChecCom from "./DocumentRelatedChecCom";
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
    <View style={styles.container}>
      <DocumentRelatedChecCom
        title="For Aadhar Verification"
        onPress={handlePress}
      />
      <DocumentRelatedChecCom
        title="For Face Authentication"
        onPress={onFaceAuthentication}
      />
    </View>
  );
};

export default DocumentRelatedCheck;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
});
