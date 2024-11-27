import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";

import DonationImage from "../../../Components/Dashboard/DonationCom/DonationImage/DonationImage";
import DonationSelectBox from "../../../Components/Dashboard/DonationCom/DonationSelectBox/DonationSelectBox";
import DonationSuccessStories from "../../../Components/Dashboard/DonationCom/DonationSuccesStories/DonationSuccessStories";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const Donation = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.conatiner}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 15,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <DonationImage />
        <Text style={styles.mainText}>Empower Women Rider</Text>
        <Text style={styles.subText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the
        </Text>
        <DonationSelectBox />
        <DonationSuccessStories />
        <Text style={styles.mainText}>Enter Amount</Text>
        <Text style={styles.womenRiderText}>
          Make sure this is Monthly Donation for the Empower Women Rider
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={styles.ruppesCard}>
            <Text style={{ fontWeight: "bold" }}>10 Rs</Text>
          </View>
          <View style={styles.ruppesCard}>
            <Text style={{ fontWeight: "bold" }}>20 Rs</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.positionCard}>
        <CustomBtn title="Donate Now" btnBg="#e02e88" btnColor="#fff" onPress={()=>{
          navigation.navigate("Coins")
        }} />
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderColor: "#ffe2e6",
    borderWidth: 2,
    borderRadius: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  womenRiderText: {
    fontSize: 14,
    lineHeight: 20,
  },
  ruppesCard: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 2,
    borderColor: "#e02e88",
    borderRadius: 25,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
});
