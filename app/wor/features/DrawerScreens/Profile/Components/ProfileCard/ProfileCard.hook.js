import { useState } from "react";
import { useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { API, imageUrl } from "../../../../../../../Constants/url";
import Toast from "react-native-toast-message";
import { getMimeType } from "../../../../../../../Constants/imageAccepts";
import { servicespng } from "../../../../../Images/ProfileImages";

export const useProfileCardHook = () => {
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const [imageSource, setImageSource] = useState(
    profile?.profilePic
      ? { uri: `${imageUrl}/${profile.profilePic}` }
      : servicespng
  );

  // Function to open the gallery
  const pickImage = async () => {
    try {
      // Open the image library with cropping enabled
      const selectedImage = await ImagePicker.openPicker({
        width: 300, // Crop width
        height: 300, // Crop height
        cropping: true, // Enable cropping
        mediaType: "photo", // Allow only photos
      });

      // Update the image source
      setImageSource({ uri: selectedImage.path });
      onProfilePicChange(selectedImage.path); // Send the image path for upload
    } catch (error) {
      if (error.code !== "E_PICKER_CANCELLED") {
        console.log("Image selection error:", error);
        Toast.show({
          text1: "Image selection failed, please try again",
          type: "error",
          position: "bottom",
        });
      }
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

      dispatch(onProfileSection({ token }));
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
