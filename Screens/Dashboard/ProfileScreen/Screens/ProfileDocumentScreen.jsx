import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../Constants/colors";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";

const ProfileDocumentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 12, color: COLORS.subHeading }}>ID Prof</Text>
      <SingleAadharCardNumberDetail />
      <Text style={{ fontSize: 12, color: COLORS.subHeading }}>
        Aadhar Images
      </Text>
      <AadharImageDetail />
      <View style={{ height: 40 }} />
      <CustomBtn title="Upload Addhar Card" btnBg="#fff" btnColor="#e02e88" />
    </View>
  );
};

export default ProfileDocumentScreen;

const SingleAadharCardNumberDetail = () => {
  return (
    <View style={styles.documnetCard}>
      <Text style={{ fontSize: 14, color: COLORS.heading, fontWeight: "600" }}>
        Aadhar Card
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
          2482 2937 2827
        </Text>
      </View>
    </View>
  );
};

const AadharImageDetail = () => {
  return (
    <View style={styles.aadharImageCard}>
      <AadharImageSingleCard title="Front" />
      <AadharImageSingleCard title="Back" />
    </View>
  );
};

const AadharImageSingleCard = ({ title }) => {
  return (
    <View style={styles.aadharcardSingleCard}>
      <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  documnetCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
    gap: 8,
  },
  aadharImageCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  aadharcardSingleCard: {
    width: "45%",
    height: 130,
    borderRadius: 10,
    backgroundColor: COLORS.heading,
    justifyContent: "center",
    alignItems: "center",
  },
});
