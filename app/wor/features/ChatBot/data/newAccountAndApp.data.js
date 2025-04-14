export const newAcoountAndApp = {
  start: {
    message: "Please select the issue that you need help with:",
    options: [
      {
        text: "I want to book a ride",
        next: "want_to_book_ride",
      },
      {
        text: "I want to schedule a ride",
        next: "want_to_schedule_a_ride",
      },
      {
        text: "I need to report an app issue",
        next: "need_to_report_an_app",
      },
      {
        text: "I want to view my ride history",
        next: "want_to_view_my_ride",
      },
    ],
    isSender: false,
  },

  want_to_book_ride: {
    message: "Please follow these steps to book a ride successfully:",
    subMessage: [
      "1. Open the Women Rider app",
      "2. Enter your pickup and drop-off locations",
      "3. Choose your ride type ( Scooty,  Auto and  Car)",
      "4. Review the fare estimate",
      "5. Confirm your ride,Then enter the wor-pin.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  want_to_schedule_a_ride: {
    message: "We're really sorry for the inconvenience!",
    subMessage: [
      "Right now, we are not offering the ride scheduling feature.",
      "But don’t worry — our team is actively working on it, and we’re hoping to make it available soon! ",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  need_to_report_an_app: {
    type: "form",
    message:
      "We’re here to help fix anything that’s not working smoothly on the Women Rider app.To help us resolve your issue faster, please provide the following:",
    fields: [
      {
        label: "Date of Issue:",
        inputType: "text",
        key: "date",
      },
      { label: "Ride ID", inputType: "text", key: "rideId" },
      {
        label: "Description of the Issue",
        inputType: "text",
        key: "description",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  want_to_view_my_ride: {
    message: "Here’s how to see all your past trips:",
    subMessage: [
      "1. Open the Women Rider app",
      "2. Go to the menu",
      "3. Tap on My Rides",
      "4. View details like date, fare, route, and status",
    ],
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
