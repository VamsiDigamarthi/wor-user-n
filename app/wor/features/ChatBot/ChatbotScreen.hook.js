import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chatbotData } from "./data/rideAndBilling.data";
import { safetyChatBptData } from "./data/Safety.data";
import { paymentWalletData } from "./data/paymentWallet.data";
import { walletData } from "./data/wallet.data";
import { addedQueryToDb } from "./services/AddedQueryToDb";
import { savedDetailsSupportData } from "./data/savedDetailsSupport.data";

export const useChatbotScreenHook = () => {
  const { caterogy } = useRoute()?.params || {};
  const { token } = useSelector((state) => state.token);
  const [dumyAllMsg, setDumyAllMsg] = useState(null);

  const [specificChat, setSpecificChat] = useState([]);

  const [showForm, setShowForm] = useState(null);

  const [formData, setFormData] = useState({});

  const filterSpecificChat = () => {
    console.log("caterogy---", caterogy);

    if (caterogy === "Ride & Billing") {
      setDumyAllMsg(chatbotData);
      setSpecificChat([
        {
          message: chatbotData.start.message,
          options: chatbotData.start.options,
        },
      ]);
    } else if (caterogy === "Safe & Secure") {
      console.log("-------------------------------------");

      setDumyAllMsg(safetyChatBptData);
      setSpecificChat([
        {
          message: safetyChatBptData?.start?.message,
          options: safetyChatBptData?.start?.options,
        },
      ]);
    } else if (caterogy === "Payment & Wallet") {
      setDumyAllMsg(paymentWalletData);
      setSpecificChat([
        {
          message: paymentWalletData.start.message,
          options: paymentWalletData.start.options,
        },
      ]);
    } else if (caterogy === "wallet") {
      setDumyAllMsg(walletData);
      setSpecificChat([
        {
          message: walletData.start.message,
          options: walletData.start.options,
        },
      ]);
    } else if (caterogy === "Saved Parcel Places") {
      setDumyAllMsg(savedDetailsSupportData);
      setSpecificChat([
        {
          message: savedDetailsSupportData.start.message,
          options: savedDetailsSupportData.start.options,
        },
      ]);
    } else {
      setSpecificChat([]);
    }
  };

  useEffect(() => {
    filterSpecificChat();
  }, [caterogy]);

  const handleOptionClick = async (option) => {
    const nextStep = dumyAllMsg[option.next];

    const newMessage = {
      message: option.text,
      isSender: true,
    };

    setSpecificChat((prev) => {
      const updatedChat = [...prev];
      const lastIndex = updatedChat.length - 1;
      if (updatedChat[lastIndex]?.options) {
        updatedChat[lastIndex] = {
          ...updatedChat[lastIndex],
          options: null,
        };
      }

      return [...updatedChat, newMessage];
    });

    if (!nextStep) return;
    // console.log("nextStep", nextStep);

    if (nextStep.type === "form") {
      setShowForm(nextStep);
    } else {
      setSpecificChat((prev) => [
        ...prev,
        {
          message: nextStep.message,
          options: nextStep.options,
          subMessage: nextStep?.subMessage ?? null,
          isSender: false,
        },
      ]);

      if (nextStep?.subMessage) {
        const nextStep = {
          message:
            "Thank you for your inquiry. We will assist you further in this matter.",
          options: [
            {
              text: "Yes",
              next: "contact_support",
            },
            {
              text: "No",
              next: "thump_up",
            },
          ],
          isSender: false,
        };

        setSpecificChat((prev) => [
          ...prev,
          {
            message: nextStep.message,
            options: nextStep.options,
            isSender: false,
          },
        ]);
      }
    }
  };

  const handleFormModal = () => {
    setShowForm(null);
  };

  const hadleSubmitForm = async () => {
    const apiQuery = await addedQueryToDb({
      formData: { ...formData, botType: caterogy },
      token,
    });
    if (apiQuery) {
      setFormData({});
    }

    const newMessage = {
      message: "Please Wait untill your problem resolve",
      isSender: true,
    };

    setSpecificChat((prev) => [...prev, newMessage]);

    const nextStep = {
      message:
        "Thank you for your inquiry. We will assist you further in this matter.",
      options: [
        {
          text: "Yes",
          next: "contact_support",
        },
        {
          text: "No",
          next: "thump_up",
        },
      ],
      isSender: false,
    };

    setSpecificChat((prev) => [
      ...prev,
      {
        message: nextStep.message,
        options: nextStep.options,
        isSender: false,
      },
    ]);
  };

  return {
    caterogy,
    specificChat,
    handleOptionClick,
    // form
    showForm,
    handleFormModal,
    hadleSubmitForm,
    setFormData,
    formData,
  };
};
