export const newPaymentWalletData = {
  start: {
    message: "Please select the issue you need help with:",
    options: [
      {
        text: "I was charged incorrectly for my ride",
        next: "was_charged_incorrectly_for_my_ride",
        type: "form",
      },
      {
        text: "My wallet balance is incorrect",
        next: "wallet_balance_is_incorrect",
        type: "form",
      },
      {
        text: "I want to update my payment method (Wallet, UPI, or Cash)",
        next: "want_to_update_my_payment_method",
        type: "form",
      },
      {
        text: "I need assistance with a refund or cashback",
        next: "need_assistance_with_a_refund",
        type: "form",
      },
      {
        text: "I was charged a cancellation fee unfairly",
        next: "was_charged_a_cancellation_fee_unfairly",
        type: "form",
      },
    ],
    isSender: false,
  },

  was_charged_incorrectly_for_my_ride: {
    type: "form",
    message: "Please confirm the following before proceeding:",
    forSubList: [
      "Was the payment deducted from your Wallet/UPI or in Cash?",
      "Did you encounter any errors or issues during payment (e.g., app crash, double charge)?",
      "Can you see any discrepancies between the fare shown and the amount charged?",
    ],
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "Expected Fare vs Charged Fare",
        inputType: "text",
        key: "fareExpectedVSFareReceived",
      },
      {
        label: "Screenshot (if available)",
        inputType: "image",
        key: "image",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  wallet_balance_is_incorrect: {
    type: "form",
    message: "Please confirm the following before proceeding:",

    fields: [
      {
        label: "Date or Trip ID related to the issue",
        inputType: "text",
        key: "rideId",
      },
      {
        label: "Wallet Balance Expected vs Actual",
        inputType: "text",
        key: "walletBalanceExpectedVsActuval",
      },
      {
        label: "Screenshot (if available)",
        inputType: "image",
        key: "image",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  want_to_update_my_payment_method: {
    message: "To update your payment method during vehicle selection:",

    subMessage: [
      "1.	Select your vehicle on the booking page.",
      "2.	Scroll down to the payment options section on the right side of the screen.",
      "3.	Click on Wallet to change your preferred payment method.",
      "4.	Double-click on your desired payment method (Wallet, UPI, or Cash) to select it.",
      "5.	Click Save and wait for confirmation that your payment method has been updated.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  need_assistance_with_a_refund: {
    type: "form",
    message: "To assist you better, please confirm",
    forSubList: [
      "Was the refund or cashback offer applicable for the ride?",
      "Have you completed the eligible ride(s)?",
      "Was your payment method valid and active at the time?",
    ],

    if_eligible: true,
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "refund Vs Cashback Amount Expected",
        inputType: "text",
        key: "refundVsCashbackAmountExpected",
      },
      {
        label: "Screenshot (if available)",
        inputType: "image",
        key: "image",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  was_charged_a_cancellation_fee_unfairly: {
    type: "form",
    message:
      "Please provide the following to investigate the cancellation fee:",

    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "Reason for cancelling the ride",
        inputType: "text",
        key: "reasonForCalcellingTheRide",
      },
      {
        label: "Screenshot (if available)",
        inputType: "image",
        key: "image",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  //
  //
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
