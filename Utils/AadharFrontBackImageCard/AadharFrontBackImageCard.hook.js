import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getMimeType } from "../../Constants/imageAccepts";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../Constants/url";
import { useNavigation } from "@react-navigation/native";
export const useAadharFrontBackImageCardHook = ({ isPriceScreen }) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleImagePick = async (side) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      if (side === "front") {
        setFrontImage(result.assets[0].uri);
      } else {
        setBackImage(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    if (!frontImage) {
      setShowErrorMessage("Please select front aadhar images.");
      return;
    }

    if (!backImage) {
      setShowErrorMessage("Please select back aadhar images.");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();

    if (frontImage) {
      const mimeType = getMimeType(frontImage);

      formData.append("adhar", {
        uri: frontImage,
        type: mimeType,
        name: `aadhar.${mimeType.split("/")[1]}`,
      });
    }

    if (backImage) {
      const mimeType = getMimeType(backImage);
      formData.append("adharBack", {
        uri: backImage,
        type: mimeType,
        name: `aadhar.${mimeType.split("/")[1]}`,
      });
    }

    // console.log(formData);

    try {
      const response = await API.patch(
        "/captain/upload-security-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      Toast.show({
        text1: "Upload Aadhar Successfully",
        type: "success",
        position: "bottom",
      });
      if (isPriceScreen) {
        navigation.goBack();
      } else {
        navigation.navigate("documentCheck");
      }
    } catch (error) {
      console.log(error?.response);
      Toast.show({
        text1: "Failed to Upload Aadhar ",
        type: "error",
        position: "bottom",
      });
    }
  };

  return {
    frontImage,
    backImage,
    handleImagePick,
    handleSubmit,
    showErrorMessage,
  };
};
