import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

const screenWidth = Dimensions.get("window").width;
const Donation = () => {
  return (
    <View style={styles.conatiner}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          //   justifyContent: "space-between",
          //   alignItems: "center",
          gap: 15,
        }}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/images/profile/donation.png")}
        />
        <Text style={styles.mainText}>Empower Women Rider</Text>
        <Text style={styles.subText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the
        </Text>
      </ScrollView>
      <View style={styles.positionCard}>
        <CustomBtn title="Donate Now" btnBg="#e02e88" btnColor="#fff" />
      </View>
    </View>
  );
};

export default Donation;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 26,
    gap: 20,
    position: "relative",
  },
  positionCard: {
    width: screenWidth,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },

  image: {
    width: "100%",
    resizeMode: "contain",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "600",
    borderBottomColor: "#ffe2e6",
    borderBottomWidth: 2,
  },
  subText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "justify",
  },
});
