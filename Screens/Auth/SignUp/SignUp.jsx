import { Image, StyleSheet, View } from "react-native";
import AuthScreenLayout from "../../../Layouts/AuthScreenLayout";
import Logo from "../../../Utils/Logo/Logo";
import BottomSheet from "../../../Utils/BottomSheet/BottomSheet";

import { TouchableOpacity } from "react-native";
import { useSignUpHook } from "./SignUp.hook";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

const SignUp = () => {
  const route = useRoute();
  const { mobile } = route.params;
  const { selectedImage, handleImagePick } = useSignUpHook();
  const [imageBorder, setImageBorder] = useState(false);
  const onImageError = () => {
    setImageBorder(true);
  };

  return (
    <AuthScreenLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
          <TouchableOpacity
            style={styles.imgeContainer}
            onPress={handleImagePick}
          >
            <View style={[styles.imageInnerCard, imageBorder && styles.border]}>
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require("../../../assets/images/undraw_profile_pic_re_iwgo 2.png")
                }
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <BottomSheet
          uiDisplay="signup"
          selectedImage={selectedImage}
          mobile={mobile}
          onImageError={onImageError}
        />
      </View>
    </AuthScreenLayout>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  logoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 12,
  },
  imgeContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: "red",
  },
  imageInnerCard: {
    width: 150,
    height: 150,
    borderRadius: 75,
    // backgroundColor: "red",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  border: {
    borderWidth: 3,
    borderColor: "red",
  },
});
