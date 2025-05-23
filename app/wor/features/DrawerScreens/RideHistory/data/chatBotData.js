export const chatBot = [
  {
    message: "What is your favorite color?",
    subQuestion: [
      "Why do you like that color?",
      "Do you prefer bright or dark colors?",
      "Has your favorite color changed over the years?",
      "Do you like to decorate your space with that color?",
    ],
    isSender: false,
  },
  {
    message: "Where did you grow up?",
    subQuestion: [
      "What’s your favorite memory from your childhood?",
      "Did you have any childhood friends you’re still in touch with?",
      "What’s the best part about your hometown?",
      "Would you ever consider moving back there?",
    ],
    isSender: false,
  },
  {
    message: "What do you like to do in your free time?",
    subQuestion: [
      "Do you prefer indoor or outdoor activities?",
      "Do you enjoy spending time with friends or alone?",
      "Do you have a hobby you’re passionate about?",
      "What’s a new activity you’d like to try?",
    ],
    isSender: false,
  },
  {
    message: "Why do you like that color?",
    description:
      "This question is meant to dive deeper into the emotional or psychological reasons behind someone’s favorite color. It encourages the user to reflect on their personal preferences, experiences, or feelings connected to a particular color.",
    subQuestion: [
      "What emotions does this color evoke for you?",
      "Have you always liked this color, or did your preference change over time?",
      "Is this color related to any special memories for you?",
      "Do you think this color influences your choices in other areas, like fashion or home decor?",
    ],
    isSender: false,
  },
  {
    message: "Do you prefer bright or dark colors?",
    description:
      "This question aims to understand a user's overall preference for color tones. Bright colors are often associated with energy, optimism, and visibility, while dark colors can evoke feelings of calm, sophistication, or mystery.",
    subQuestion: [
      "What makes you lean toward bright or dark colors in your everyday life?",
    ],
    isSender: false,
  },
  {
    message: "Has your favorite color changed over the years?",
    description:
      "This question delves into whether a person’s color preferences have evolved over time. It reflects how personal tastes can shift due to experiences, emotional growth, or exposure to new environments, fashion trends, or even cultural influences.",
    subQuestion: [
      "What influenced your change in favorite color?",
      "Do you think your current favorite color reflects your personality now?",
      "Are there colors you disliked before but like now?",
    ],
    isSender: false,
  },
];

let safetyAndSecutyData = [
  {
    message: "Please select the issue that you need support with:",
    subQuestion: [
      "I feel unsafe during the ride.",
      "I need to report an incident during my ride.",
      "I need to share my ride details with someone.",
      "I need assistance with the SOS button.",
    ],
    isSender: false,
  },
  {
    message: "I feel unsafe during the ride.",
    description: "Please select the concern that you need support with:",
    subQuestion: [
      "I need assistance immediately.",
      "I felt uncomfortable with my driver’s behavior.",
      "I had an emergency and need help.",
      "I would like to report an issue with my ride.",
    ],
    isSender: false,
  },
  {
    message: "I need assistance immediately",
    description:
      "We understand your concern. Please provide the following details:",
    subQuestion: [
      "Ride ID: [Enter your ride ID]",
      "I felt uncomfortable with my driver’s behavior.",
      "I had an emergency and need help.",
      "I would like to report an issue with my ride.",
    ],
    isSender: false,
  },
];

// billng

export let billing = [
  {
    message: "Please select the issue that you need support with",
    subQuestion: [
      {
        text: "I have a billing issue",
        nextIndex: 1,
      },
      {
        text: "I have a problem with my ride",
        nextIndex: null,
      },
      {
        text: "I need to update my payment method",
        inputType: "text",
      },
      {
        text: "I need to inquire about my ride charges",
        nextIndex: null,
      },
    ],
    isSender: false,
  }, // 0
  {
    message: "I have a billing issue",
    description: "Please select the billing concern that you need support with",
    subQuestion: [
      {
        text: "I’ve been charged incorrectly",
        nextIndex: "text",
      },
      {
        text: "I need a refund for a canceled ride",
        nextIndex: "text",
      },
      {
        text: "I need a detailed breakdown of my ride charges",
        inputType: null,
      },
      {
        text: "I have an issue with my promotional code or discount",
        inputType: null,
      },
    ],
    isSender: false,
  }, // 1
  {
    message: "I’ve been charged incorrectly",
    description: "Please provide the following details for us to investigate:",
    subQuestion: [
      {
        text: "Yes",
        nextIndex: 3,
      },
      {
        text: "No",
        nextIndex: null,
      },
    ],
    isSender: false,
  }, // 2
  {
    message: "Yes",
    description:
      "Please email us at [support@womenrider.com] with the details, and we will prioritize your refund request. You will receive an update within 24 hours.",
    subQuestion: [],
    isSender: false,
  }, // 3
];
