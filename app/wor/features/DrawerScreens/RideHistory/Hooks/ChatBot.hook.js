import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchChatbotMessage,
  savedNewMessageApi,
} from "../service/chatBot.serv";
import { chatBot } from "../data/chatBotData";

export const useChatBotHook = () => {
  const { caterogy, orderId } = useRoute()?.params || {};

  const { token } = useSelector((state) => state.token);

  const [chatMessageHistory, setChatMessageHistory] = useState([]);

  const scrollViewRef = useRef(null);

  const handleNewQuestion = async (text) => {
    const newMessage = {
      message: text,
      isSender: true,
    };

    setChatMessageHistory((prevHistory) => [...prevHistory, newMessage]);

    const success = await savedNewMessageApi({
      token,
      orderId,
      caterogy,
      message: newMessage,
    });
    if (!success) return;

    const botMessage = chatBot.find((message) => message.message === text);

    await savedNewMessageApi({
      token,
      orderId,
      caterogy,
      message: botMessage,
    });

    if (botMessage) {
      setTimeout(() => {
        setChatMessageHistory((prevHistory) => [...prevHistory, botMessage]);
      }, 500);
    }
  };

  const fetchPreviousMeg = async () => {
    const data = await fetchChatbotMessage({ token, orderId, caterogy });
    if (!data) return;
    setChatMessageHistory(data);
  };

  useEffect(() => {
    fetchPreviousMeg();
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }
  }, [chatMessageHistory]);

  return {
    caterogy,
    chatMessageHistory,
    scrollViewRef,
    handleNewQuestion,
  };
};
