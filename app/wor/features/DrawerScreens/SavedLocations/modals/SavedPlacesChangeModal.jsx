import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ModalUI from "../../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import ParAddressInputItem from "../../../Parcels/Components/ParAddressInputItem";
import CustomBtn from "../../../../utiles/CustomBtn";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateSavedParcelAddress } from "../../../Parcels/services/parSavedAddressServices";
import { fetchSavedPlace } from "../../../Parcels/redux/parcelSavedPlace.slice";

const SavedPlacesChangeModal = ({
  openSavedPlacesModal,
  handleModalSavedPlaces,
  place,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const [formData, setFormData] = useState({
    senderName: place?.senderName,
    mobile: place?.mobile,
    landmark: place?.landMark,
    address: place?.address,
  });

  useEffect(() => {
    setFormData({
      senderName: place?.senderName,
      mobile: place?.mobile,
      landmark: place?.landMark,
      address: place?.address,
    });
  }, [place]);

  const [errors, setErrors] = useState({ senderName: "" });
  const [validationCheck, setValidationCheck] = useState({
    senderName: "",
    mobile: "",
    landmark: "",
    address: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let valid = true;
    let validationErrors = {};

    // Validation for each field
    if (!formData?.senderName?.trim()) {
      validationErrors.senderName = "Sender name is required.";
      valid = false;
    }

    // if (!formData.mobile.trim()) {
    //   validationErrors.mobile = "Mobile number is required.";
    //   valid = false;
    // } else if (!/^\d{10}$/.test(formData.mobile)) {
    //   validationErrors.mobile = "Mobile number must be 10 digits.";
    //   valid = false;
    // }

    if (!formData.landmark.trim()) {
      validationErrors.landmark = "Landmark is required.";
      valid = false;
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required.";
      valid = false;
    }

    setErrors(validationErrors);
    return valid;
  };

  useEffect(() => {
    if (formData?.senderName?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        senderName: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        senderName: true,
      }));
    }
    if (!formData.senderName && validationCheck.senderName) {
      setErrors((prev) => ({
        ...prev,
        senderName: "Name is required",
      }));
    }
    // mobile number

    if (formData?.landmark?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        landmark: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        landmark: true,
      }));
    }

    if (!formData?.landmark && validationCheck?.landmark) {
      setErrors((prev) => ({
        ...prev,
        landmark: "Landmark is required.",
      }));
    }

    if (formData?.address?.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        address: "",
      }));
      setValidationCheck((prev) => ({
        ...prev,
        address: true,
      }));
    }
    if (!formData?.address && validationCheck?.address) {
      setErrors((prev) => ({
        ...prev,
        address: "Address is required.",
      }));
    }

    // land marks
  }, [formData]);

  const onHandlerContinueNext = async () => {
    if (validateInputs()) {
      const data = await onUpdateSavedParcelAddress({
        token,
        formData,
        id: place?._id,
      });

      if (data) {
        handleModalSavedPlaces();
        dispatch(fetchSavedPlace({ token }));
      }
    }
  };

  return (
    <ModalUI
      openCloseState={openSavedPlacesModal}
      closeModalFun={handleModalSavedPlaces}
      style={infoModalStyles.aadharModalStyles}
      insideCardStyle={infoModalStyles.insideCardStyle}
      closebtn={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Change Saved Place</Text>
        <ParAddressInputItem
          iconType="Feather"
          iconName="user"
          placeholder="Name"
          value={formData.senderName}
          onChangeText={(text) => handleInputChange("senderName", text)}
          isValid={errors?.senderName?.length > 0 ? true : false}
        />

        <ParAddressInputItem
          iconType="Entypo"
          iconName="pin"
          placeholder="Land Mark"
          value={formData.landmark}
          onChangeText={(text) => handleInputChange("landmark", text)}
          isValid={errors?.landmark?.length > 0 ? true : false}
        />
        <ParAddressInputItem
          iconType="FontAwesome6"
          iconName="location-arrow"
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange("address", text)}
          isValid={errors?.address?.length > 0 ? true : false}
        />
        <View style={{ gap: 10 }}>
          <CustomBtn
            title="Update"
            btnBg="#e02e88"
            btnColor="#fff"
            onPress={onHandlerContinueNext}
          />
          <CustomBtn
            title="Cancel"
            btnBg="#f7f7f7"
            onPress={handleModalSavedPlaces}
          />
        </View>
      </View>
    </ModalUI>
  );
};

export default SavedPlacesChangeModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    gap: 13,
  },
});
