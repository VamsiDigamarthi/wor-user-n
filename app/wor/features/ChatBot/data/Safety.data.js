export const chatbotData = {
  start: {
    message: "Please select the issue that you need support with:",
    options: [
      { text: "I have a billing issue.", next: "billing_issue" },
      { text: "I have a problem with my ride.", next: "ride_problem" },
      { text: "I need to update my payment method.", next: "update_payment" },
      {
        text: "I need to inquire about my ride charges.",
        next: "ride_charges",
        type: "form",
      },
    ],
    isSender: false,
  },
  //  completed
  billing_issue: {
    message: "Please select the billing concern that you need support with:",
    options: [
      {
        text: "I’ve been charged incorrectly.",
        next: "charged_incorrectly",
        type: "form",
      },
      {
        text: "I need a refund for a canceled ride.",
        next: "refund_request",
        type: "form",
      },
      {
        text: "I need a detailed breakdown of my ride charges.",
        next: "breakdown_request",
        type: "form",
      },
      {
        text: "I have an issue with my promotional code or discount.",
        next: "promo_issue",
        type: "form",
      },
    ],
    isSender: false,
  },
  // completed
  charged_incorrectly: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Billing Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  // completed
  refund_request: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Billing Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },
  // completed
  breakdown_request: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Billing Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  // completed
  promo_issue: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Billing Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },
  // billing chat bot end

  ride_problem: {
    message: "Please select the issue related to your ride:",
    options: [
      { text: "My ride was delayed.", next: "ride_delayed", type: "form" },
      {
        text: "My driver took a longer route.",
        next: "long_route",
        // type: "upload",
        type: "form",
      },
      {
        text: "I had an issue with the vehicle condition.",
        next: "vehicle_issue",
        type: "api",
      },
      {
        text: "My ride was canceled without notice.",
        next: "canceled_ride",
        type: "form",
      },
    ],
    isSender: false,
  },
  // completed
  ride_delayed: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Delay",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },
  // completd
  long_route: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Delay",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  vehicle_issue: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Delay",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  // completed
  canceled_ride: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Delay",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },
  //   ride problem end

  //   payment method problem start
  update_payment: {
    message:
      "Open the Women Rider app. Go to 'Payment Methods' under your account settings.  Select 'Add Payment Method' and enter your new payment details. Save your updated payment information.",
    next: "to_assist_you_further",
    isSender: false,
  },

  ride_charges: {
    type: "form",
    message: "Please provide the following details for us to investigate:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date of Ride", inputType: "date", key: "date" },
      {
        label: "Description of the Billing Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  //   dummy check if and api call
  //   long_route: {
  //     type: "upload",
  //     message: "Please upload an image showing the route issue.",
  //     uploadText: "Upload Image",
  //     next: "contact_support",
  //   },
  //   vehicle_issue: {
  //     type: "api",
  //     message: "Fetching vehicle details...",
  //     endpoint: "https://api.womenrider.com/vehicle_issue",
  //     method: "GET",
  //     next: "show_vehicle_data",
  //   },
  //   common object
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
