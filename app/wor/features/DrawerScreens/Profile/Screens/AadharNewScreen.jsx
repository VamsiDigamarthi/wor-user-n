import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import AadharModal from "../Modal/AadharModal/AadharModal";
import { useSelector } from "react-redux";
import { fonts } from "../../../../fonts/Fonts";
export default function AadharNewScreen() {
  const [modalOpen, setModalOpen] = useState(false);

  const { profile } = useSelector((state) => state.profileSlice);

  return (
    <AppBarLayout title="Gender Identity" isPositionAppbar={true}>
      <View style={styles.container}>
        <Text style={[styles.heading]}>
          Aadhaar verification is an essential step to ensure the authenticity
          of our users. By using Aadhaar, we can confirm your identity quickly
          and securely, making it easier to access our services. This helps us
          create a safe and trustworthy environment for all the users.
        </Text>
        <Text style={styles.heading}>Documents required</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            if (profile?.aadharCarVerificaation) {
              return;
            }
            setModalOpen(true);
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <AntDesign name="idcard" size={24} color="black" />
            <Text style={styles.heading}>Aadhaar</Text>
          </View>

          {profile?.aadharCarVerificaation && (
            <View style={styles.verifiedBtn}>
              <Text style={{ fontSize: 10 , fontFamily:fonts.robotoSemiBold }}>Verified</Text>
              <MaterialIcons name="verified" size={15} color="black" />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.bottomText}>
          <AntDesign name="Safety" size={15} color="#036413" />
          <Text
            style={styles.secureText}
          >
            Your Data is 100% Safe and Secure
          </Text>
        </View>
      </View>
      <AadharModal openModal={modalOpen} closeModal={()=>setModalOpen(!modalOpen)} />
    </AppBarLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    paddingTop: 100,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    // fontWeight: "600",
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.robotoRegular,
    textAlign: "justify",
    // color: "red",
  },
  card: {
    backgroundColor: "#FFFCF5",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verifiedBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#DCFCE7",
    padding: 8,
    borderRadius: 20,
  },
  bottomCardContainer: {
    width: "100%",
    // borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 200,
    backgroundColor: "black",
    marginTop: 5,
  },
  inputCard: {
    width: "100%",
    height: 66,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 20,
    height: 20,
    borderRadius: 20,
    fontSize: 16,
  },
  bottomText: {

    position: "absolute",
    bottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  secureText:{
    color: "#757575",
    fontFamily: fonts.robotoRegular,
    fontSize: 10,
  }
});
