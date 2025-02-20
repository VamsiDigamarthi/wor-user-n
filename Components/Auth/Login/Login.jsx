import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputBox from "../../../Utils/InputCard/InputCard";
import CustomCheckbox from "../../../Utils/CustomCheckbox/CustomCheckbox";
import CustomBtn from "../../../Utils/CustomBtn/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../Constants/url";
import { loginValidation } from "../../../Validations/LoginValidation";
import BottomLayout from "../../../Layouts/BottomLayout";
import ModalUI from "../../../Utils/Modal/Modal";
import LoginInfoUi from "../../InfoUi/LoginInfoUi";
import { COLORS } from "../../../Constants/colors";
import { infoModalStyles } from "../../InfoUi/Styles/InfoModalStyles";

const LoginRelatedInput = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errorState, setErrorState] = useState({
    mobile: "",
    termsAndCondition: "",
  });
  const navigation = useNavigation();

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleMobileChange = (text) => {
    setMobile(text);
  };

  const handleLogin = async () => {
    const errors = loginValidation(mobile, isChecked);
    setErrorState(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await API.post("/auth/send-otp", { mobile: mobile });
      setIsLoading(false);
      navigation.navigate("otp", {
        mobile: mobile,
        termsAndCondition: isChecked,
        message:
          response.data?.name === "user not found"
            ? "WOR"
            : response.data?.name,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setApiError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (mobile?.length === 10) {
      setErrorState((prevState) => ({
        ...prevState,
        mobile: "",
      }));
    }
    if (isChecked) {
      setErrorState((prevState) => ({
        ...prevState,
        privacy: "",
      }));
    }
    if (isChecked && mobile?.length === 10) {
      setErrorState({});
    }
  }, [mobile, isChecked]);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const onHandleOpenInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <BottomLayout
      title="Enter Your Mobile Number"
      // subTitle="By entering your mobile number, you agree it will be used for verification process ."
      subTitle="By entering your mobile number, you agree that it will be used for verification purposes and to receive updates."
      onHandleOpenInfoModal={onHandleOpenInfoModal}
    >
      <View style={styles.container}>
        <InputBox
          label={errorState.mobile ? errorState.mobile : "Mobile Number"}
          isIconsNotText={false}
          keyboardType="numeric"
          value={mobile}
          onChangeText={handleMobileChange}
          isValid={!errorState.mobile}
          maxLength={10}
        />
        <View style={styles.checkboxCard}>
          <CustomCheckbox handleCheck={handleCheck} isChecked={isChecked} />
          {errorState.privacy && (
            <View style={styles.errorCard}>
              <Text style={styles.errorMsg}>{errorState.privacy}</Text>
            </View>
          )}
        </View>
        {apiError && (
          <View style={styles.errorCard}>
            <Text style={styles.errorMsg}>{apiError}</Text>
          </View>
        )}

        <CustomBtn
          title="Continue"
          btnBg={Object.keys(errorState)?.length > 0 ? "#fdfdfd" : "#EA4C89"}
          btnColor={Object.keys(errorState)?.length > 0 ? "#EA4C89" : "#fff"}
          onPress={handleLogin}
          width="100%"
          isLoding={isLoading}
        />
      </View>
      <ModalUI
        openCloseState={isInfoModalOpen}
        closeModalFun={onHandleOpenInfoModal}
        modalStyle="slide"
        style={infoModalStyles.aadharModalStyles}
        insideCardStyle={infoModalStyles.insideCardStyle}
        btnText="Okay, Got It"
        btnStyles={infoModalStyles.modalCloseBtn}
        btnTextStyle={infoModalStyles.btnTextStyle}
      >
        <LoginInfoUi />
      </ModalUI>
    </BottomLayout>
  );
};

export default LoginRelatedInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 11,
  },
  checkboxCard: {
    gap: 2,
  },
});
