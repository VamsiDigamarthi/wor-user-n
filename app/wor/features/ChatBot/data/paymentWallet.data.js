// export const paymentWalletData = {
//   start: {
//     message: "Please select the issue that you need support with:",
//     options: [
//       {
//         text: "My payment is not reflecting in my history.",
//         next: "my_payment_not_reflection",
//         type: "form",
//       },
//       {
//         text: "I was charged multiple times for the same ride.",
//         next: "charged_multiple_times",
//         type: "form",
//       },
//       {
//         text: "My payment failed, but the amount was deducted.",
//         next: "my_payment_failed",
//         type: "form",
//       },
//       {
//         text: "I used a promo code, but the discount was not applied",
//         next: "used_promo_code",
//         type: "form",
//       },
//     ],
//     isSender: false,
//   },

//   my_payment_not_reflection: {
//     type: "form",
//     message: "Please provide the following details",
//     fields: [
//       { label: "Ride ID", inputType: "text", key: "rideId" },
//       { label: "Payment Method", inputType: "text", key: "paymentMethod" },
//       { label: "Number of Charges", inputType: "text", key: "numberOfCharges" },
//       { label: "Transaction IDs", inputType: "text", key: "transactionId" },
//     ],
//     submitText: "Proceed",
//     next: "to_assist_you_further",
//     isSender: false,
//   },

//   charged_multiple_times: {
//     type: "form",
//     message: "Please provide the following details for verification:",
//     fields: [
//       { label: "Payment Method Used", inputType: "text", key: "paymentMethod" },
//       { label: "Transaction ID", inputType: "text", key: "transactionId" },
//       { label: "Date of Payment", inputType: "date", key: "dateOfPayment" },
//       { label: "Amount Paid", inputType: "text", key: "amount" },
//     ],
//     submitText: "Proceed",
//     next: "to_assist_you_further",
//     isSender: false,
//   },

//   my_payment_failed: {
//     type: "form",
//     message: "Please share the following details for verification",
//     fields: [
//       { label: "Transaction ID", inputType: "text", key: "transactionId" },
//       { label: "Date of Payment", inputType: "date", key: "dateOfPayment" },
//       { label: "Payment Method Used", inputType: "text", key: "paymentMethod" },
//       { label: "Amount Deducted", inputType: "text", key: "amount" },
//     ],
//     submitText: "Proceed",
//     next: "to_assist_you_further",
//     isSender: false,
//   },

//   used_promo_code: {
//     type: "form",
//     message: "Please provide the following details:",
//     fields: [
//       { label: "Promo Code Used", inputType: "text", key: "promoCode" },
//       { label: "Ride ID (if applicable)", inputType: "text", key: "rideId" },
//       {
//         label: "Expected Discount",
//         inputType: "text",
//         key: "expectedDiscount",
//       },
//     ],
//     submitText: "Proceed",
//     next: "to_assist_you_further",
//     isSender: false,
//   },

//   //
//   //
//   //
//   //   common
//   to_assist_you_further: {
//     message:
//       "Thank you for your inquiry. We will assist you further in this matter.",
//     options: [
//       {
//         text: "Yes",
//         next: "contact_support",
//       },
//       {
//         text: "No",
//       },
//     ],
//     isSender: false,
//   },
//   contact_support: {
//     message:
//       "Please write to us at [support@womenrider.com] with the details above, and our team will get back to you within 24 hours.",
//     isSender: false,
//   },
// };

// ---------------------------------------------------------

export const paymentWalletData = {
  start: {
    message: "Please select the issue that you need support with:",
    options: [
      {
        text: "My payment is not reflecting in my history.",
        next: "my_payment_not_reflection",
        type: "form",
      },
      {
        text: "I was charged multiple times for the same ride.",
        next: "charged_multiple_times",
        type: "form",
      },
      {
        text: "My payment failed, but the amount was deducted.",
        next: "my_payment_failed",
        type: "form",
      },
      {
        text: "I used a promo code, but the discount was not applied",
        next: "used_promo_code",
        type: "form",
      },
    ],
    isSender: false,
  },

  my_payment_not_reflection: {
    type: "form",
    message: "Please provide the following details",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Payment Method", inputType: "text", key: "paymentMethod" },
      { label: "Number of Charges", inputType: "text", key: "numberOfCharges" },
      { label: "Transaction IDs", inputType: "text", key: "transactionId" },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  charged_multiple_times: {
    type: "form",
    message: "Please provide the following details for verification:",
    fields: [
      { label: "Payment Method Used", inputType: "text", key: "paymentMethod" },
      { label: "Transaction ID", inputType: "text", key: "transactionId" },
      { label: "Date of Payment", inputType: "date", key: "dateOfPayment" },
      { label: "Amount Paid", inputType: "text", key: "amount" },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  my_payment_failed: {
    type: "form",
    message: "Please share the following details for verification",
    fields: [
      { label: "Transaction ID", inputType: "text", key: "transactionId" },
      { label: "Date of Payment", inputType: "date", key: "dateOfPayment" },
      { label: "Payment Method Used", inputType: "text", key: "paymentMethod" },
      { label: "Amount Deducted", inputType: "text", key: "amount" },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  used_promo_code: {
    type: "form",
    message: "Please provide the following details:",
    fields: [
      { label: "Promo Code Used", inputType: "text", key: "promoCode" },
      { label: "Ride ID (if applicable)", inputType: "text", key: "rideId" },
      {
        label: "Expected Discount",
        inputType: "text",
        key: "expectedDiscount",
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
