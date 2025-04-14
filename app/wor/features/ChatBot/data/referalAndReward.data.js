export const newReferalAndReward = {
  start: {
    message: "Please select the option you need help with:",
    options: [
      {
        text: "I want to know how the Refer & Earn program works.",
        next: "want_to_know_how_refer_earn_program",
        type: "form",
      },
      {
        text: "I want to check my referral reward status",
        next: "want_to_check_my_referral",
        type: "form",
      },
      {
        text: "I have a question about my referral.",
        next: "have_a_question_about_my_referral",
        type: "form",
      },
      {
        text: " I have an issue with my referral reward.",
        next: "have_an_issue_with_my_referral",
        type: "form",
      },
    ],
    isSender: false,
  },

  want_to_know_how_refer_earn_program: {
    message: "Here’s how it works:",
    subMessage: [
      "If you refer 10 new users and each of them completes 3 rides within 3 days,",
      " You will receive ₹50 – ₹300 directly into your Women Rider Wallet.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  want_to_check_my_referral: {
    type: "form",
    message: "Please provide the following information:",

    fields: [
      {
        label: "Your Registered Phone Number",
        inputType: "text",
        key: "mobile",
      },
      { label: "Referral Code Shared", inputType: "text", key: "referalCode" },
      {
        label: "Approximate Date of Referral",
        inputType: "text",
        key: "date",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  have_a_question_about_my_referral: {
    type: "form",
    message: "Please share these details:",

    fields: [
      {
        label: "Your Name",
        inputType: "text",
        key: "name",
      },
      {
        label: "Registered Phone Number",
        inputType: "text",
        key: "mobile",
      },
      {
        label: "Question or Concern",
        inputType: "text",
        key: "questionOrConcern",
      },
    ],
    submitText: "Proceed",
    next: "to_assist_you_further",
    isSender: false,
  },

  have_an_issue_with_my_referral: {
    type: "form",
    message: "Please provide the following:",
    fields: [
      {
        label: "Type of Issue",
        key: "issue",
        inputType: "select",
      },
      { label: "Date of Issue", inputType: "text", key: "date" },
      { label: "Description", inputType: "description", key: "text" },
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
