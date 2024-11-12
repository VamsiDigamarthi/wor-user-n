import { useState } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { API, imageUrl } from "../../../../Constants/url";
import Toast from "react-native-toast-message";
import { getMimeType } from "../../../../Constants/imageAccepts";

export const useProfileCardHook = () => {
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const [imageSource, setImageSource] = useState(
    profile?.profilePic
      ? { uri: `${imageUrl}/${profile.profilePic}` }
      : require("../../../../assets/images/profile/Services.png")
  );

  // Function to open the gallery
  const pickImage = async () => {
    // Request permission to access the media library (gallery)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission to access the gallery is required!");
      return;
    }

    // Open the image library (gallery) to select an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setImageSource({ uri: selectedImage.uri });
      onProfilePicChange(selectedImage.uri); // Send the image URI for upload
    }
  };

  // Function to handle the image upload
  const onProfilePicChange = async (image) => {
    let formData = new FormData();
    const mimeType = getMimeType(image);
    formData.append("profilePic", {
      uri: image,
      type: mimeType,
      name: `profilePic.${mimeType.split("/")[1]}`,
    });

    try {
      const response = await API.patch("/auth/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.show({
        text1: response?.data?.message,
        type: "success",
        position: "bottom",
      });
    } catch (error) {
      console.log(error.message);
      Toast.show({
        text1: "Profile update failed, please try again",
        type: "error",
        position: "bottom",
      });
    }
  };

  return {
    profile,
    imageSource,
    pickImage, // Expose the function to trigger image picker
  };
};
