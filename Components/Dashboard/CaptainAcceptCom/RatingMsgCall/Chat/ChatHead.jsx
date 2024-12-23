import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../../Constants/colors";
import { imageUrl } from "../../../../../Constants/url";
import { useNavigation } from "@react-navigation/native";

const ChatHead = ({ captainDetails }) => {
  // console.log(userDetails);
  const captainImageUrl = `${imageUrl}/${captainDetails?.profilePic}`;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color={COLORS.heading}
          />
        </View>
      </Pressable>
      <Text
        style={{
          width: "70%",
          fontSize: 16,
          fontWeight: "600",
          color: COLORS.heading,
        }}
      >
        {captainDetails?.name}
      </Text>
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e02e88",
          borderRadius: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{ uri: captainImageUrl }}
        />
        <View
          style={{
            width: 5,
            height: 5,
            borderr: 2,
            backgroundColor: "blue",
            position: "absolute",
            top: 4,
            right: 4,
            borderRadius: 4,
          }}
        ></View>
      </View>
    </View>
  );
};

export default ChatHead;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
