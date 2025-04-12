import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useChatbotScreenHook } from "./ChatbotScreen.hook";
import ChatBotMessage from "./ChatBotMessage";
import ChatBotFormModal from "./Modals/ChatBotFormModal";
import AppBarLayout from "../ridebooking/sharedLogics/AppBarLayout";

const ChatbotScreen = () => {
  const {
    caterogy,
    specificChat,
    handleOptionClick,
    showForm,
    handleFormModal,
    hadleSubmitForm,
    setFormData,
    formData,
  } = useChatbotScreenHook();

  return (
    <>
      <AppBarLayout title={`${caterogy} Chat Bot`} isPositionAppbar={true}>
        <View style={styles.container}>
          <ScrollView style={styles.messageContainer}>
            {specificChat?.map((chat, index) => (
              <ChatBotMessage
                key={index}
                chat={chat}
                handleSelectOption={handleOptionClick}
              />
            ))}
          </ScrollView>
        </View>
      </AppBarLayout>
      <ChatBotFormModal
        openForm={showForm !== null}
        handleFormModal={handleFormModal}
        hadleSubmitForm={hadleSubmitForm}
        data={showForm}
        setFormData={setFormData}
        formData={formData}
      />
    </>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 15,
    flex: 1,
    width: "100%",
    backgroundColor: "#f7f7f7",
    paddingTop: 80,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // paddingVertical: 10,
    marginBottom: 25,
    // backgroundColor: "red",
  },
});
