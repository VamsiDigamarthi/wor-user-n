import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatBotIcons = ({ chatBotText }) => {
  const navigation = useNavigation();

  const handleNavigateChatbot = () => {
    navigation.navigate("ChatBot", { caterogy: chatBotText });
  };

  return (
    <Pressable onPress={handleNavigateChatbot} style={styles.container}>
      <MaterialIcons size={20} name="support-agent" color="#fff" />
    </Pressable>
  );
};

export default ChatBotIcons;

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#e02e88",
    justifyContent: "center",
    alignItems: "center",
  },
});
