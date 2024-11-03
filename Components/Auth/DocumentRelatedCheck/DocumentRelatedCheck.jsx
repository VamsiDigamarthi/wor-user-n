import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import AadharFaceNagivetor from "../../../Utils/AadharFaceNagivetor/AadharFaceNagivetor";

import { useNavigation } from "@react-navigation/native";
const DocumentRelatedCheck = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    console.log("Press");
    navigation.navigate("aadharverification");
  };
  return (
    <View style={styles.container}>
      <AadharFaceNagivetor
        title="For Aadhar Verification"
        onPress={handlePress}
      />
      <AadharFaceNagivetor
        title="For Face Authentication"
        onPress={handlePress}
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
