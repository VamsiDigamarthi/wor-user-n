import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

export const useSignUpHook = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBorder, setImageBorder] = useState(false);
  const onImageError = () => {
    console.log("signup image function");
    setImageBorder(true);
  };
  const handleImagePick = async () => {
    // Request permission to access the camera roll
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });

    if (result.canceled) {
      console.log("User cancelled image picker");
      return;
    }
    if (result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri); // Access the uri from the first asset
      setImageBorder(false);
    }
  };

  console.log(selectedImage);

  return {
    selectedImage,
    handleImagePick,
    imageBorder,
    onImageError,
  };
};
