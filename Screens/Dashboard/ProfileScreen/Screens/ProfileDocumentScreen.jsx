import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../../Constants/colors";
import CustomBtn from "../../../../Utils/CustomBtn/CustomBtn";
import { useSelector } from "react-redux";
import { imageUrl } from "../../../../Constants/url";
import ModalUI from "../../../../Utils/Modal/Modal";
import NewAadharVefirication from "../../../../Components/Auth/NewAadharVerification/NewAadharVefirication";
import CustomeAppbar from "../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";

const ProfileDocumentScreen = () => {
  const { profile } = useSelector((state) => state.profileSlice);
  const [uploadAddharModalOpen, setUploadAddharModalOpen] = useState(false);
  const onOpenModalHandler = () => {
    setUploadAddharModalOpen(!uploadAddharModalOpen);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomeAppbar title="Documentation" onBack={() => navigation.goBack()} />
      <View style={{ height: 90 }} />
      <Text style={{ fontSize: 12, color: COLORS.subHeading }}>ID Prof</Text>
      <SingleAadharCardNumberDetail />
      <Text style={{ fontSize: 12, color: COLORS.subHeading }}>
        Aadhar Images
      </Text>
      <AadharImageDetail profile={profile} />
      <View style={{ height: 40 }} />

      <CustomBtn
        onPress={onOpenModalHandler}
        title={
          profile?.adhar === null && profile?.adharBack === null
            ? "Upload Addhar Card"
            : "Re-Upload Aadhar Card"
        }
        btnBg={
          profile?.adhar === null && profile?.adharBack === null
            ? "#fff"
            : "#e02e88"
        }
        btnColor={
          profile?.adhar === null && profile?.adharBack === null
            ? "#e02e88"
            : "#fff"
        }
      />

      <ModalUI
        openCloseState={uploadAddharModalOpen}
        closeModalFun={onOpenModalHandler}
        modalStyle="slide"
        style={styles.aadharModalStyles}
        insideCardStyle={styles.insideCardStyle}
      >
        <NewAadharVefirication isPriceScreen={true} />
      </ModalUI>
    </View>
  );
};

export default ProfileDocumentScreen;

const SingleAadharCardNumberDetail = () => {
  return (
    <View style={styles.documnetCard}>
      <Text style={{ fontSize: 14, color: COLORS.heading, fontWeight: "600" }}>
        Aadhar Card
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 13, color: COLORS.subHeading }}>
          2482 2937 2827
        </Text>
      </View>
    </View>
  );
};

const AadharImageDetail = ({ profile }) => {
  let frontImage = `${imageUrl}/${profile.adhar}`;
  let backImage = `${imageUrl}/${profile.adharBack}`;
  console.log(frontImage);
  return (
    <View style={styles.aadharImageCard}>
      <AadharImageSingleCard title="Front" image={frontImage} />
      <AadharImageSingleCard title="Back" image={backImage} />
    </View>
  );
};

const AadharImageSingleCard = ({ title, image }) => {
  const [aadharImage, setAadharImage] = useState("");
  const [isImageOpen, setIsImageOpen] = useState(false);

  const isOpenAadharImageHandler = (image) => {
    setIsImageOpen(true);
    setAadharImage(image);
  };
  const closeAadharImageHandler = () => {
    setIsImageOpen(false);
    setAadharImage("");
  };

  return (
    <View style={styles.aadharcardSingleCard}>
      {image ? (
        <Pressable
          onPress={() => isOpenAadharImageHandler(image)}
          style={{ width: "100%", height: "100%" }}
        >
          <Image source={{ uri: image }} style={styles.aadharImage} />
        </Pressable>
      ) : (
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          {title}
        </Text>
      )}
      <ModalUI
        openCloseState={isImageOpen}
        closeModalFun={closeAadharImageHandler}
      >
        <Image source={{ uri: aadharImage }} style={styles.modalaadharImage} />
      </ModalUI>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },
  aadharModalStyles: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  insideCardStyle: {
    paddingBottom: 20,
    padding: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  documnetCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 10,
    gap: 8,
  },
  aadharImageCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  aadharcardSingleCard: {
    width: "45%",
    height: 130,
    borderRadius: 10,
    backgroundColor: COLORS.heading,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  aadharImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  modalaadharImage: {
    width: "100%",
    height: 350,
  },
});
