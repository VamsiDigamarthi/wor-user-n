export const walletData = {
  start: {
    message: "Please select the issue that you need support with",
    options: [
      {
        text: "I want to add money to my wallet",
        next: "want_to_add_money",
      },
      {
        text: "I need a refund for a failed transaction.",
        next: "need_a_refund",
      },
      {
        text: "I want to check my wallet balance and transaction history.",
        next: "check_my_wallet_balance",
      },
      {
        text: "I have been charged incorrectly",
        next: "have_been_chatged_incorrectly",
        type: "form",
      },
    ],
    isSender: false,
  },

  want_to_add_money: {
    message: "Please follow these steps to add money:",
    subMessage: [
      "1.Open the Women Rider app",
      "2.Go to the 'Wallet' section.",
      "3.Tap on 'Add Money'.",
      "4.Choose the amount and select your preferred payment method.",
      "5.Confirm the transaction.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  need_a_refund: {
    message: "Thank you for reaching out",
    subMessage: [
      "Currently, we do not have a refund facility available for wallet transactions.We understand this may be inconvenient and are actively working on adding this feature in the future for a better user experience.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  check_my_wallet_balance: {
    message: "Please follow these steps:",
    subMessage: [
      "1.Open the Women Rider app.",
      "2.Go to the 'Wallet' section.",
      "3.Your current wallet balance will be displayed at the top.",
      "4.Tap on 'Transaction History' to view your past transactions",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  have_been_chatged_incorrectly: {
    type: "form",
    message: "We’re here to help. Please provide the following details:",
    fields: [
      { label: "Ride ID or Transaction ID", key: "rideId", inputType: "text" },
      { label: "Date", inputType: "date", key: "date" },
      { label: "Amount", inputType: "text", key: "amount" },
      { label: "Description", inputType: "textarea", key: "description" },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  //
  //
  //   common
  to_assist_you_further: {
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
  },
  contact_support: {
    message:
      "Please write to us at [support@womenrider.com] with the details above, and our team will get back to you within 24 hours.",
    isSender: false,
  },

  thump_up: {
    message: "Was this helpful?",
    options: [
      {
        text: "👍",
        next: "Upthumb",
      },
      {
        text: "👎",
        next: "Downthumb",
      },
    ],
    isSender: false,
  },
  Upthumb: {
    message: "Thank you for your valuable feedback!",
    isSender: false,
  },
  Downthumb: {
    message: "Sorry for the inconvenience. We’ll try to improve.",
    isSender: false,
  },
};
