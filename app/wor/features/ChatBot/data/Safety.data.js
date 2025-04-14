export const safetyAndSecureData = {
  start: {
    message: "Please select the issue that you need support with:",
    options: [
      {
        text: "I feel unsafe during the ride.",
        next: "feel_unsafe_during_the_ride",
      },
      {
        text: "I need to report an incident during my ride.",
        next: "need_to_report_an_incident_during_my_ride",
      },
      {
        text: "I need to share my ride details with someone.",
        next: "need_to_share_my_ride_details_with_someone",
      },
      {
        text: "I need assistance with the SOS button",
        next: "need_assistance_with_the_sos_button",
        type: "form",
      },
    ],
    isSender: false,
  },

  feel_unsafe_during_the_ride: {
    message: "Please select the concern that you need support with:",
    options: [
      {
        text: "1.	I need assistance immediately.",
        next: "need_assistance_immediately",
      },
      {
        text: "2.	I felt uncomfortable with my driver’s behavior.",
        next: "felt_uncomfortable_with_my_driver",
      },
      {
        text: "3.	I had an emergency and need help.",
        next: "had_an_emergency_and_need_help",
      },
      {
        text: "4.	I would like to report an issue with my ride.",
        next: "would_like_to_report_an_issue_with_my_ride",
        type: "form",
      },
    ],
  },

  need_assistance_immediately: {
    type: "form",
    message:
      "We understand your concern. Please provide the following details:",

    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "Description of the Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  felt_uncomfortable_with_my_driver: {
    type: "form",
    message: "Please provide details about your discomfort:",
    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "Description of the Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  had_an_emergency_and_need_help: {
    message: "Please follow these steps for better assistance:",

    subMessage: [
      "1.	Open the Women Rider app.",
      "2.	Go to the Safety icon on the home page.",
      "3.	Click on WOR Support.",
      "4.	You can then share your emergency details with our support team.",
    ],

    next: "to_assist_you_further",
    isSender: false,
  },

  would_like_to_report_an_issue_with_my_ride: {
    type: "form",
    message: "Please provide details about the issue:",

    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "Description of the Issue",
        inputType: "textarea",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  need_to_report_an_incident_during_my_ride: {
    type: "form",
    message: "Please provide the following details for reporting the incident:",

    fields: [
      { label: "Ride ID", inputType: "text", key: "rideId" },
      { label: "Date & Time of the Ride", inputType: "text", key: "date" },
      {
        label: "Description of the Issue",
        inputType: "textarea",
        key: "description",
      },
      {
        label: "location",
        inputType: "textarea",
        key: "location",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  need_to_share_my_ride_details_with_someone: {
    message: "Please follow these steps to share your ride details:",

    subMessage: [
      "1.	Open the Women Rider app",
      "2.	Go to the Safety icon on the home page.",
      "3.	Click on Trusted Contacts.",
      "4.	Add up to 5 contacts that you want to share your ride details with",
      "5.	When your ride starts, click on Track Me and share your ride with your preferred contacts.",
    ],

    next: "to_assist_you_further",
    isSender: false,
  },

  need_assistance_with_the_sos_button: {
    message:
      "Please follow these steps to activate the SOS feature in the app:",

    subMessage: [
      "1.	Open the Women Rider app.",
      "2.	Click on the Safety icon on the home page",
      "3.	There is an option called SOS Button",
      "4.	Tap on the SOS button to make a call if necessary",
      "If you are unable to activate the SOS button, please ensure that your location services are enabled and you have an active internet connection.",
    ],

    next: "to_assist_you_further",
    isSender: false,
  },

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
