import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";
import CustomBtn from "../../../utiles/CustomBtn";

const ChatBotFormModal = ({
  openForm,
  handleFormModal,
  hadleSubmitForm,
  data,
  setFormData,
  formData,
}) => {
  // State to store user input
  // const [formData, setFormData] = useState({});
  const [isFilled, setIsFilled] = useState(false);

  // Handle input change
  const handleInputChange = (key, value) => {
    // console.log("key", key, "value", value);
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Check if all fields are filled
  useEffect(() => {
    if (data?.fields?.length) {
      const allFilled = data.fields.every((field) =>
        formData[field.key]?.trim()
      );
      setIsFilled(allFilled);
    }
  }, [formData, data]);

  // Handle form submission
  const handleSubmit = () => {
    if (isFilled) {
      hadleSubmitForm(formData);
      handleFormModal();
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

        {data?.fields?.map((field, index) => (
          <TextInput
            key={index}
            placeholder={field.label}
            style={styles.input}
            value={formData[field.key] || ""}
            onChangeText={(text) => handleInputChange(field.key, text)}
          />
        ))}

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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
