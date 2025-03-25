import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  fetchChatMessagesApi,
  handleSendImage,
} from "../services/SupportChat.serv";
import { socketUrl } from "../../../../../Constants/url";
import io from "socket.io-client";

import ImageCropPicker from "react-native-image-crop-picker";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFS from "react-native-fs";
import { PermissionsAndroid } from "react-native";
import { getMimeType } from "../../../../../Constants/imageAccepts";

const audioRecorderPlayer = new AudioRecorderPlayer();

export const useSupportChatHook = () => {
  const insets = useSafeAreaInsets();
  const hasSoftwareNavigationBar = insets.bottom > 0;

  const mref = useRef(null);
  const socketRef = useRef(null);
  const isFocused = useIsFocused();

  const { profile } = useSelector((state) => state.profileSlice);
  const { chat } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.token);

  const [chatMessages, setChatMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState(null);

  const [imageSource, setImageSource] = useState(null);
  const [audioPath, setAudioPath] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");

  const [showScrollButton, setShowScrollButton] = useState(false);

  const fetchChatMessages = async () => {
    const messages = await fetchChatMessagesApi({
      token,
      chatId: chat?._id,
    });

    messages[0]?.messages
      ? setChatMessages(messages[0]?.messages)
      : setChatMessages([]);
  };

  useEffect(() => {
    socketRef.current = io(`${socketUrl}/new-support-chat`);

    if (chat && profile) {
      socketRef.current.emit("support-chat-connected", {
        chatId: chat?._id,
        userId: profile?._id,
      });
    }

    // socketRef.current.off("message");

    socketRef.current?.on("message", ({ message }) => {
      console.log("messages received", message);
      setChatMessages((prev) => [...prev, message]);
    });

    if (chat) {
      fetchChatMessages();
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, [chat, profile, token]);

  useEffect(() => {
    if (chatMessages?.length > 0 && isFocused) {
      mref.current?.scrollToEnd({ animated: true });
    }
  }, [chatMessages, isFocused]);

  const scrollToBottom = () => {
    mref.current?.scrollToEnd({ animated: true });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Check if the user has scrolled near the bottom
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    setShowScrollButton(!isAtBottom);
  };

  const pickImage = async () => {
    try {
      const selectedImage = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: "photo",
      });
      setImageSource(selectedImage.path);
    } catch (error) {
      if (error.code !== "E_PICKER_CANCELLED") {
        console.log("Image selection error:", error);
      }
    }
  };

  const clearImage = () => setImageSource(null);

  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "App needs access to your microphone to record audio.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleAudioRecording = async () => {
    try {
      if (!(await requestAudioPermission())) {
        alert("Microphone permission is required to record audio.");
        return;
      }

      if (isRecording) {
        const result = await audioRecorderPlayer.stopRecorder();
        setAudioPath(result);
        setIsRecording(false);
      } else {
        const path = `${RNFS.DocumentDirectoryPath}/${Date.now()}.mp3`;
        await audioRecorderPlayer.startRecorder(path);
        setIsRecording(true);
      }
    } catch (error) {
      console.error("Recording error:", error);
      alert("Failed to record audio. Please try again.");
    }
  };

  const handleAudioPreview = async () => {
    if (!audioPath) return;

    if (isPlaying) {
      await audioRecorderPlayer.stopPlayer();
      setIsPlaying(false);
    } else {
      await audioRecorderPlayer.startPlayer(audioPath);
      setIsPlaying(true);

      // Listen for when playback completes
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          setIsPlaying(false);
        }
      });
    }
  };

  const clearAudio = () => {
    setAudioPath(null);
    setIsPlaying(false);
  };

  const handleSendMessage = async () => {
    if (message) {
      if (message?.trim() === "") return;

      handleSendTextMsg();
    } else if (imageSource) {
      handleSendImageMessage({ type: "image", mediaSource: imageSource });
    } else {
      handleSendImageMessage({ type: "audio", mediaSource: audioPath });
    }
  };

  const handleSendTextMsg = () => {
    console.log("chat", chat, "profile", profile);
    console.log("chat", chatId, "userId", userId);

    if (!(chat && profile) && !(chatId && userId)) return;

    let newMessage = {
      chatId: chat ? chat?._id : chatId,
      message: message,
      sender: "captain",
      userId: profile ? profile?._id : userId,
      type: "text",
      _id: new Date()?.toISOString(),
    };

    if (socketRef.current) {
      socketRef.current.emit("sendMessage", newMessage);

      try {
        setChatMessages([...chatMessages, { ...newMessage }]);
      } catch (error) {
        console.log(error, "error hewewlkel");
      }
    } else {
      console.warn("Socket is not connected.");
    }

    setMessage("");
  };

  const handleSendImageMessage = async ({ type, mediaSource }) => {
    if (!(chat && profile) && !(chatId && userId)) return;

    const formData = new FormData();
    const mimeType = getMimeType(mediaSource);
    let image = "image";
    formData.append(image, {
      uri: mediaSource,
      type: mimeType,
      name: `aadhar.${mimeType.split("/")[1]}`,
    });
    formData.append("chatId", chat ? chat?._id : chatId);
    formData.append("sender", "captain");
    formData.append("userId", profile ? profile?._id : userId);
    formData.append("type", type);

    const resData = await handleSendImage(formData);

    if (resData) {
      type === "image" ? setImageSource(null) : setAudioPath(null);
      setChatMessages((prev) => [...prev, resData]);
    }
  };

  return {
    hasSoftwareNavigationBar,

    mref,
    chatMessages,
    pickImage,
    imageSource,
    clearImage,
    audioPath,
    isPlaying,
    isRecording,
    clearAudio,
    handleAudioRecording,
    handleAudioPreview,
    setMessage,
    message,
    handleSendMessage,
    scrollToBottom,
    //
    showScrollButton,
    handleScroll,
  };
};
