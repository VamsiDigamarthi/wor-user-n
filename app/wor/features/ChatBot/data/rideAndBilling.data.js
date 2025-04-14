export const chatbotData = {
  start: {
    message: "Please select the issue you need help with:",
    options: [
      {
        text: "I want to report an issue with my completed ride",
        next: "want_to_report_an_issue_with_my_completed_ride",
      },
      {
        text: "My fare was incorrect or higher than expected",
        next: "fare_was_incorrect_or_higher_than_expected",
      },
      {
        text: "I didn’t receive my refund or cashback",
        next: "didt_receive_my_refund_or_cashback",
      },
      {
        text: "I was charged a cancellation fee unfairly",
        next: "was_charged_a_cancellation_fee_unfairly",
        type: "form",
      },
    ],
    isSender: false,
  },

  want_to_report_an_issue_with_my_completed_ride: {
    type: "form",
    message: "Please provide the following details:",

    fields: [
      {
        label: "Ride ID",
        inputType: "text",
        key: "rideId",
      },
      { label: "Description", inputType: "description", key: "text" },
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

  fare_was_incorrect_or_higher_than_expected: {
    type: "form",
    message: "Please share the following:",

    fields: [
      {
        label: "Ride ID",
        inputType: "text",
        key: "rideId",
      },
      {
        label: "Date & Time of the ride",
        inputType: "description",
        key: "date",
      },
      {
        label: "Expected Fare vs Charged Fare",
        inputType: "fareExpectedVSFareReceived",
        key: "date",
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

  didt_receive_my_refund_or_cashback: {
    type: "form",
    message: "Please share the following:",
    forSubList: [
      "Have you completed the eligible ride(s)?",
      "Was your payment method valid and active?",
      "Was the refund/cashback offer applicable at the time?",
    ],
    if_eligible: true,
    fields: [
      {
        label: "Ride ID",
        inputType: "text",
        key: "rideId",
      },
      {
        label: "Date & Time of the ride",
        inputType: "description",
        key: "date",
      },
      {
        label: "Refund and Cash Amount",
        inputType: "refundVsCashbackAmountExpected",
        key: "date",
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
    message: "To help resolve this, please provide:",

    fields: [
      {
        label: "Ride ID",
        inputType: "text",
        key: "rideId",
      },
      {
        label: "Date & Time of the ride",
        inputType: "description",
        key: "date",
      },
      {
        label: "Reason For Cancellation",
        inputType: "reasonForCalcellingTheRide",
        key: "date",
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
      },
    ],
    isSender: false,
  },
  contact_support: {
    message:
      "Please write to us at [support@womenrider.com] with the details above, and our team will get back to you within 24 hours.",
    isSender: false,
  },
};
