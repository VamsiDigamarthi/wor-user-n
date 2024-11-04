import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";

export const useSignUpHook = () => {
  const route = useRoute();
  const { mobile } = route.params;
  console.log("sign up", mobile);

  const [selectedImage, setSelectedImage] = useState(null);
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
    }
  };

  console.log(selectedImage);

  return {
    selectedImage,
    handleImagePick,
  };
};
