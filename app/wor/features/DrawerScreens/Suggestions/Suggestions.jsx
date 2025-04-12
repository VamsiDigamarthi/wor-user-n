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
import { COLORS } from "../../../../../Constants/colors";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Suggestions({ navigation }) {
  const { token } = useSelector((state) => state.token);
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const hasSoftwareNavigationBar = insets.bottom > 0;

  const handleChangeText = useCallback((value) => {
    setText(value);
  }, []);

  const SendData = useCallback(async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const response = await API.post(
        "/saved-address/suggestToWor",
        { message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setText("");
      setOpenModal(true);
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        text1: "Something went wrong!",
        text2: "Try Again Later",
        position: "top",
        type: "error",
      });
      setIsLoading(false);
    }
  }, [text, token]);

  const buttonStyles = useMemo(
    () => ({
      btnColor: text ? "#fff" : "#EA4C89",
      btnBg: text ? "#EA4C89" : "#fff",
      borderColor: !text && "#EA4C89",
      // position: "absolute",
      // width: "100%",

      // backgroundColor: "red",
      // borderWidth: 1,
    }),
    [text]
  );

  return (
    <KeyboardAvoidingView
      style={styles.flexContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <AppBarLayout title="Suggestion" isPositionAppbar={true}>
          <View
            style={[
              styles.container,
              { paddingTop: Platform.OS == "ios" ? 115 : 80 },
            ]}
          >
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
            <Text style={styles.staticText}>
              At Women Rider (WoR), we are focused on making every ride better,
              safer, and more secure for women user(passenger). Your suggestions
              help us enhance comfort ,safety, and security. Whether it's about
              improving your overall riding experience or introducing new
              features ,your thoughts are crucial to us.
            </Text>

            <Text style={styles.staticText}>
              We are dedicated to designing products that empower women to ride
              with confidence and comfort. Together, we will continue to create
              experiences that meet your needs and expectations.
            </Text>
            <Text style={styles.staticText}>
              Thank you for being a part of this journey — we’re excited to hear
              from you and continuously improve to serve you better.
            </Text>
            <View
              style={[
                styles.sendButton,
                // { bottom: hasSoftwareNavigationBar ? 50 : 90 },
              ]}
            >
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
              isLoding={isLoading}
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
    backgroundColor: COLORS.mainBackgroundColor,
  },
  mainText: {
    fontFamily: fonts.robotoSemiBold,
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "lightgray",
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

    width: "100%",
    left: 10,
    bottom: 10,
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
  staticText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
    fontFamily: fonts.robotoMedium,
  },
});
