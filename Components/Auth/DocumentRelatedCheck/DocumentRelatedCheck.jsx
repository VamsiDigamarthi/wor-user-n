import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AadharFaceNagivetor from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const DocumentRelatedCheck = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("Press");
    navigation.navigate("aadharverification");
  };

  const onFaceAuthentication = () => {
    console.log("Face Authentication");
    // navigation.navigate("faceauthentication");
  };

  return (
    <View style={styles.container}>
      <AadharFaceNagivetor
        title="For Aadhar Verification"
        onPress={handlePress}
      />
      <AadharFaceNagivetor
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
