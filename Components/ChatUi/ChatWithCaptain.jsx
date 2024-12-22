import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomeAppbar from "../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import SendText from "./SendText";
import RecieveText from "./RecieveText";

const screenHeight = Dimensions.get("window").height;
const androidHeight = [screenHeight * 0.35, screenHeight * 0.5]; // Adjust snap points
const iosHeight = [screenHeight * 0.15, screenHeight * 0.6];

export default function ChatWithCaptain() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const [message, setMessage] = useState(""); // State for the message input
  const [messages, setMessages] = useState([
    { type: "send", text: "Hi" },
    { type: "receive", text: "Hello!" },
  ]); // State to store messages

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(
    () => (Platform.OS === "ios" ? iosHeight : androidHeight),
    []
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { type: "send", text: message }]);
      setMessage(""); // Clear the input
    }
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <CustomeAppbar
          title="Chat With Dharani"
          onBack={() => navigation.goBack()}
        />

        <View style={{ height: 460 }}></View>

        <BottomSheet
          ref={bottomSheetRef}
          index={1} // Initial snap point
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose={false} // Prevent closing
          style={styles.bottomSheet} // Apply custom styles
          backgroundStyle={styles.backgroundStyle} // Set pink background
          handleIndicatorStyle={styles.handleIndicator}
        >
          <BottomSheetView style={{ flex: 1 }}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <Entypo name="chevron-left" size={30} color="#e02e88" />

              <View style={{ gap: 1, alignItems: "center" }}>
                <Text style={styles.headerSmallText}>Dharani B</Text>
                <Text style={styles.headerBigText}>TS07 AB 1234</Text>
              </View>

              <Entypo name="phone" size={30} color="#e02e88" />
            </View>

            {/* Messages */}
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <ScrollView
                contentContainerStyle={styles.messageContainer}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((msg, index) =>
                  msg.type === "send" ? (
                    <SendText key={index} text={msg.text} />
                  ) : (
                    <RecieveText key={index} text={msg.text} />
                  )
                )}
              </ScrollView>

              {/* Input Section */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type a message"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendMessage}
                >
                  <Entypo name="paper-plane" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  chatHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  headerSmallText: {
    color: "#757575",
    fontWeight: "bold",
    fontSize: 12,
  },
  headerBigText: {
    color: "#757575",
    fontWeight: "bold",
    fontSize: 18,
  },
  messageContainer: {
    flexGrow: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#e02e88",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
