import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomeAppbar from "../../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Modal from "../../../../../utiles/Modal/Modal";
import ModalUI from "../../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import InputBox from "../../../../../utiles/InputCard/InputCard";
import CustomBtn from "../../../../../utiles/CustomBtn";
export default function AadharNewScreen() {
  const [aadhar, setAadhar] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [otpPress, setOtpPress] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <CustomeAppbar title="Document" />

      <View style={styles.container}>
        <Text style={styles.heading}>
          Dear Women Rider User , Please verify your Gender Identity by using
          your government ID
        </Text>
        <Text style={styles.heading}>Documents required</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setModalOpen(true)}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <AntDesign name="idcard" size={24} color="black" />
            <Text style={styles.heading}>Aadhaar</Text>
          </View>

          <View style={styles.verifiedBtn}>
            <Text style={{ fontSize: 10 }}>Verified</Text>
            <MaterialIcons name="verified" size={15} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {modalOpen && (
        <ModalUI
          modalStyle="slide"
          style={infoModalStyles.aadharModalStyles}
          insideCardStyle={infoModalStyles.insideCardStyle}
          closebtn={false}
          //   closeModalFun={() => setModalOpen(!modalOpen)}
        >
          {!otpPress ? (
            <View style={styles.bottomCardContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.heading}>Aadhaar Details</Text>

                <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <InputBox
                keyboardType="numeric"
                maxLength={12}
                placeholder="XXXX XXXX XXXX"
                label="Enter Aadhar Number"
                isIconsNotText={true}
                icon={"id-card-o"}
                iconType="FontAwesome"
                value={aadhar}
                onChangeText={setAadhar}
                // isValid={!errorState.mobile}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "flex-start",
                }}
              >
                <View style={styles.dot}></View>
                <Text style={{ textAlign: "justify" }}>
                  By clicking this checkbox and the sign Document button, I
                  voluntarily agree to aadhaar esign the previewed document
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  justifyContent: "flex-start",
                }}
              >
                <View style={styles.dot}></View>
                <Text style={{ textAlign: "justify" }}>
                  By clicking this checkbox and the sign Document button, I
                  voluntarily agree to aadhaar esign the previewed document
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 40,
                }}
              >
                <AntDesign name="Safety" size={24} color="black" />
                <Text>Your Data is 100% Safe and Secure</Text>
              </View>

              <CustomBtn
                onPress={() => setOtpPress(true)}
                title="continue"
                btnBg={aadhar.length === 12 ? "#EA4C89" : "#F7F7F7"}
                btnColor={aadhar.length === 12 ? "#fff" : "#000"}
              />
            </View>
          ) : !otpVerified ? (
            <View style={styles.bottomCardContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ gap: 4 }}>
                  <Text style={styles.heading}>Enter Otp</Text>
                  <Text>Enter the 6 digit otp recieved on phone number</Text>
                  <Text>Linked to your Aadhar +91 1234567890</Text>
                  <Text></Text>
                </View>

                {/* <TouchableOpacity onPress={() => setModalOpen(false)}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity> */}
              </View>

              <View
                style={[
                  styles.inputCard,
                  { borderColor: isFocused && "#e02e88", borderWidth: 1 },
                ]}
              >
                {[1, 2, 3, 4, 5, 6].map((value, index) => (
                  <TextInput
                    key={index}
                    maxLength={1}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      {
                        backgroundColor: value ? "transparent" : "#f7f7f7",
                      },
                    ]}
                  />
                ))}
              </View>

              <View>
                <Text>Having trouble ?Request new OTP in 00:52 </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 40,
                }}
              >
                <AntDesign name="Safety" size={24} color="black" />
                <Text>Your Data is 100% Safe and Secure</Text>
              </View>

              <CustomBtn
                title="continue"
                onPress={() => setOtpVerified(true)}
                btnBg={aadhar.length === 12 ? "#EA4C89" : "#F7F7F7"}
                btnColor={aadhar.length === 12 ? "#fff" : "#000"}
              />
            </View>
          ) : (
            <View
              style={[styles.bottomCardContainer, { alignItems: "center" }]}
            >
              <TouchableOpacity
                style={{ width: "100%", alignItems: "flex-end" }}
                onPress={() => setModalOpen(false)}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              <MaterialIcons name="verified" size={200} color="#DCFCE7" />
              <Text
                style={[styles.heading, { fontSize: 24, textAlign: "center" }]}
              >
                Your adhaar has verified
              </Text>
              <Text
                style={[styles.heading, { fontSize: 24, textAlign: "center" }]}
              >
                Successfully
              </Text>
            </View>
          )}
        </ModalUI>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
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
