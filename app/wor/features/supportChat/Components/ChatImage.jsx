import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ModalUI from "../../../utiles/Modal/Modal";
import { infoModalStyles } from "../../../../../Components/InfoUi/Styles/InfoModalStyles";

const ChatImage = ({ imageUrl }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const handleOpenPreview = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <>
      <Pressable onPress={handleOpenPreview} style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </Pressable>
      {openPreview && (
        <ModalUI
          closeModalFun={handleOpenPreview}
          openCloseState={openPreview}
          closebtn={false}
          style={infoModalStyles.aadharModalStyles}
          insideCardStyle={infoModalStyles.insideCardStyle}
          animationType="slide"
        >
          <View style={{ width: "100%", height: "70%", padding: 20, gap: 30 }}>
            <Image
              style={{ width: "100%", height: "90%", resizeMode: "contain" }}
              source={{ uri: imageUrl }}
            />
          </View>
        </ModalUI>
      )}
    </>
  );
};

export default ChatImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: "70%",
    height: 350,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
    padding: 10,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",

    borderRadius: 10,
  },
});
