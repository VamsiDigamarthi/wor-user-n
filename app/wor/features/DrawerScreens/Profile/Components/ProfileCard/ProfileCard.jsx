import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useProfileCardHook } from "./ProfileCard.hook";
import { fonts } from "../../../../../fonts/Fonts";

const ProfileCard = () => {
  const { profile, imageSource, pickImage, servicespng } = useProfileCardHook();

  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <Image
          style={styles.image}
          source={imageSource.uri ? imageSource : servicespng}
          defaultSource={servicespng}
          onError={(error) => {
            console.log("Image Load Error:", error.nativeEvent.error);
          }}
        />
        <View style={styles.editCard}>
          <Pressable onPress={pickImage}>
            <FontAwesome name="edit" size={25} color="#EA4C89" />
          </Pressable>
        </View>
      </View>
      <Text style={styles.textCard}>{profile?.name || "WOR"}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#ffe2e8",
    borderWidth: 2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "cover",
  },
  editCard: {
    position: "absolute",
    right: -1,
    bottom: 0,
  },
  textCard: {
    fontSize: 16,
    fontFamily: fonts.robotoSemiBold,
  },
});
