export const newRideAndBilling = {
  start: {
    message: "Please select the issue you need help with:",
    options: [
      {
        text: "I want to report an issue with a completed ride.",
        next: "want_to_report_completed_ride",
      },
      {
        text: "My ride fare was incorrect or missing",
        next: "ride_fare_was_incorrect",
      },
      {
        text: "I didn’t receive my payment",
        next: "did_not_receive_my_payment",
      },
      {
        text: "I want to understand my ride earnings or billing breakdown",
        next: "want_to_understand_my_ride",
        type: "form",
      },
      {
        text: "I was charged a penalty or deduction and want to know why.",
        next: "was_charged_a_penalty",
        type: "form",
      },
    ],
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
