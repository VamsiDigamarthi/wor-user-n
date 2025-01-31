import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import AppBarLayout from "../../ridebooking/sharedLogics/AppBarLayout";
import CustomBtn from "../../../utiles/CustomBtn";
import { fonts } from "../../../fonts/Fonts";
import { API } from "../../../../../Constants/url";
import ModalUi from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import TickBig from "../../../../../assets/tickBig.png";

export default function Suggestions({ navigation }) {
  const { token } = useSelector((state) => state.token);
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleChangeText = useCallback((value) => {
    setText(value);
  }, []);

  const SendData = useCallback(async () => {
    if (!text.trim()) return;

    try {
      const response = await API.post(
        "/saved-address/suggestToWor",
        { message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setText("");
      setOpenModal(true);
      // Toast.show({
      //   text1: "Thank You For Your Suggestion!",
      //   text2: "We Will Try to improve your experience",
      //   position: "top",
      //   type: "success",
      // });
    } catch (error) {
      Toast.show({
        text1: "Something went wrong!",
        text2: "Try Again Later",
        position: "top",
        type: "error",
      });
    }
  }, [text, token]);

  const buttonStyles = useMemo(
    () => ({
      btnColor: text ? "#fff" : "#EA4C89",
      btnBg: text ? "#EA4C89" : "#fff",
      borderColor: !text && "#EA4C89",
      borderWidth: 1,
    }),
    [text]
  );

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AppBarLayout title="Suggestion" isPositionAppbar={true}>
          <View style={styles.container}>
            <Text style={styles.mainText}>Suggest To Wor</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Write your Suggestions"
              placeholderTextColor="#a9a9a9"
              value={text}
              onChangeText={handleChangeText}
              maxLength={500}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.charCount}>{text.length} / 500 Characters</Text>

            <View style={styles.sendButton}>
              <CustomBtn title="Send" onPress={SendData} {...buttonStyles} />
            </View>
          </View>
        </AppBarLayout>
      </TouchableWithoutFeedback>

      {openModal && (
        <ModalUi
          modalStyle="slide"
          style={infoModalStyles.aadharModalStyles}
          insideCardStyle={infoModalStyles.insideCardStyle}
          closebtn={false}
        >
          <View style={styles.btContainer}>
            <Image source={TickBig} style={{ height: 100, width: 100 }} />

            <Text style={styles.heading}>Thank You !</Text>
            <Text style={{ fontFamily: fonts.robotoRegular }}>
              Your Suggestion has been send to WoR team
            </Text>

            <CustomBtn
              title="Back Home"
              btnBg={"#EA4C89"}
              btnColor={"#FFF"}
              onPress={() => navigation?.navigate("Home")}
              width="100%"
            />
          </View>
        </ModalUi>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 15,
    paddingTop: 110,
  },
  mainText: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#fff5f9",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    fontFamily: fonts.robotoRegular,
  },
  charCount: {
    textAlign: "right",
    fontFamily: fonts.robotoThin,
  },
  sendButton: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 10,
  },

  btContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },

  heading: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 26,
  },
});
