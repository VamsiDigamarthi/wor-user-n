import { useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { chatbotData } from "./data/rideAndBilling.data";
import { safetyAndSecureData, safetyChatBptData } from "./data/Safety.data";
import { paymentWalletData } from "./data/paymentWallet.data";
import { walletData } from "./data/wallet.data";
import { addedQueryToDb } from "./services/AddedQueryToDb";
import { savedDetailsSupportData } from "./data/savedDetailsSupport.data";
import { newPaymentWalletData } from "./data/newPaymentWallet.data";
import { newReferalAndReward } from "./data/referalAndReward.data";
import { newAcoountAndApp } from "./data/newAccountAndApp.data";

export const useChatbotScreenHook = () => {
  const { caterogy } = useRoute()?.params || {};
  const { token } = useSelector((state) => state.token);
  const [dumyAllMsg, setDumyAllMsg] = useState(null);
  const scrollViewRef = useRef(null);
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

      setDumyAllMsg(safetyAndSecureData);
      setSpecificChat([
        {
          message: safetyAndSecureData?.start?.message,
          options: safetyAndSecureData?.start?.options,
        },
      ]);
    } else if (caterogy === "Referrals") {
      setDumyAllMsg(newReferalAndReward);
      setSpecificChat([
        {
          message: newReferalAndReward?.start?.message,
          options: newReferalAndReward?.start?.options,
        },
      ]);
    } else if (caterogy === "Payment & Wallet") {
      setDumyAllMsg(newPaymentWalletData);
      setSpecificChat([
        {
          message: newPaymentWalletData.start.message,
          options: newPaymentWalletData.start.options,
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
    } else if (caterogy === "Account And App") {
      setDumyAllMsg(newAcoountAndApp);
      setSpecificChat([
        {
          message: newAcoountAndApp.start.message,
          options: newAcoountAndApp.start.options,
        },
      ]);
    } else {
      setSpecificChat([]);
    }
  };

  // newAcoountAndApp

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
      setFormData((prev) => ({ ...prev, question: newMessage.message }));
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

    scrollViewRef,
  };
};
