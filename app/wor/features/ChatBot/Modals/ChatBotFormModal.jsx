import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import CustomBtn from "../../../utiles/CustomBtn";

import ImagePicker from "react-native-image-crop-picker";

const ChatBotFormModal = ({
  openForm,
  handleFormModal,
  hadleSubmitForm,
  data,
  setFormData,
  formData,
}) => {
  const [isFilled, setIsFilled] = useState(false);

  // Handle input change
  const handleInputChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (data?.fields?.length) {
      const allFilled = data.fields.every((field) =>
        formData[field.key]?.toString().trim()
      );
      setIsFilled(allFilled);
    }
  }, [formData, data]);

  const handleSubmit = () => {
    if (isFilled) {
      hadleSubmitForm(formData);
      handleFormModal();
    }
  };

  const pickImage = async (key) => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
      });

      if (image?.path) {
        handleInputChange(key, image.path);
      }
    } catch (error) {
      console.log("Image selection cancelled or failed:", error);
    }
  };

  return (
    <ModalUI
      openCloseState={openForm}
      closeModalFun={handleFormModal}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{data?.message}</Text>

        <View style={{ padding: 5, gap: 4 }}>
          {data?.forSubList?.map((each, index) => (
            <Text
              key={index}
              style={{ lineHeight: 22, fontWeight: "500", fontSize: 14 }}
            >
              {index + 1} Was the payment deducted from your Wallet/UPI or in
              Cash?
            </Text>
          ))}

          {data?.if_eligible && (
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              If eligible, please provide:
            </Text>
          )}
        </View>

        {data?.fields?.map((field, index) => {
          if (field.inputType === "image") {
            return (
              <TouchableOpacity
                key={index}
                style={styles.imageUploadBox}
                onPress={() => pickImage(field.key)}
              >
                {formData[field.key] ? (
                  <Image
                    source={{ uri: formData[field.key] }}
                    style={styles.imagePreview}
                  />
                ) : (
                  <Text style={{ color: "#999" }}>Tap to select image</Text>
                )}
              </TouchableOpacity>
            );
          }

          return (
            <TextInput
              key={index}
              placeholder={field.label}
              style={styles.input}
              value={formData[field.key] || ""}
              onChangeText={(text) => handleInputChange(field.key, text)}
              multiline={field.inputType === "textarea"}
              numberOfLines={field.inputType === "textarea" ? 4 : 1}
            />
          );
        })}

        <CustomBtn
          title={data?.submitText}
          btnBg={isFilled ? "#e02e88" : "#f7f7f7"}
          btnColor={isFilled ? "#fff" : "#e02e88"}
          width="100%"
          onPress={handleSubmit}
        />
      </View>
    </ModalUI>
  );
};

export default ChatBotFormModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
    padding: 10,
    paddingBottom: 20,
  },
  text: {
    textAlign: "left",
    lineHeight: 22,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  imageUploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "cover",
  },
});
