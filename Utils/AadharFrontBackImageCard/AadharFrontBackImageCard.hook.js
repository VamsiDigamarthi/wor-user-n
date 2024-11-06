import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getMimeType } from "../../Constants/imageAccepts";

export const useAadharFrontBackImageCardHook = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState("");

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

    // Append back image

    // try {
    //   const response = await fetch("YOUR_API_ENDPOINT_HERE", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const responseData = await response.json();
    //   console.log(responseData);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return {
    frontImage,
    backImage,
    handleImagePick,
    handleSubmit,
    showErrorMessage,
  };
};
