import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AppBarLayout from "../../../ridebooking/sharedLogics/AppBarLayout";
import AadharModal from "../Modal/AadharModal/AadharModal";
import { useSelector } from "react-redux";
export default function AadharNewScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const { profile } = useSelector((state) => state.profileSlice);
  return (
    <AppBarLayout title="Documents" isPositionAppbar={true}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Dear Women Rider User , Please verify your Gender Identity by using
          your government ID
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
              <Text style={{ fontSize: 10 }}>Verified</Text>
              <MaterialIcons name="verified" size={15} color="black" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <AadharModal openModal={modalOpen} closeModal={setModalOpen} />
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
  },
  heading: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 21,
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
});
