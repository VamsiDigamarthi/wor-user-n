import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAadharFrontBackImageCardHook } from "./AadharFrontBackImageCard.hook";
import CustomBtn from "../CustomBtn/CustomBtn";

const AadharFrontBackImageCard = ({ otpVerified }) => {
  const {
    frontImage,
    backImage,
    handleImagePick,
    handleSubmit,
    showErrorMessage,
  } = useAadharFrontBackImageCardHook();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable
          style={[
            styles.imageBox,
            styles.frontBox,
            !otpVerified && { backgroundColor: "#808080" },
          ]}
          onPress={otpVerified ? () => handleImagePick("front") : null}
        >
          {frontImage ? (
            <Image source={{ uri: frontImage }} style={styles.image} />
          ) : (
            <Text style={styles.boxText}>Front</Text>
          )}
        </Pressable>
        <Pressable
          style={[styles.imageBox, styles.backBox]}
          onPress={otpVerified ? () => handleImagePick("back") : null}
        >
          {backImage ? (
            <Image source={{ uri: backImage }} style={styles.image} />
          ) : (
            <Text style={styles.boxText}>Back</Text>
          )}
        </Pressable>
      </View>
      {showErrorMessage && (
        <View style={styles.errorCard}>
          <Text style={styles.errorMsg}>{showErrorMessage}</Text>
        </View>
      )}
      <CustomBtn
        title="continue"
        btnBg={frontImage && backImage ? "#e02e88" : "#fff"}
        btnColor={frontImage && backImage ? "#fff" : "#e02e88"}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default AadharFrontBackImageCard;

const styles = StyleSheet.create({
  container: { gap: 20, marginBottom: 20 },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  imageBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  frontBox: {
    backgroundColor: "#E02E88", // Pink background for front
  },
  backBox: {
    backgroundColor: "#A9A9A9", // Gray background for back
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  errorCard: {
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
  },
});
