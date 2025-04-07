export const savedDetailsSupportData = {
  start: {
    message: "Please select the issue that you need support with:",
    options: [
      {
        text: "I want to add a new address.",
        next: "want_to_add_new_address",
      },
      {
        text: "My saved address is not appearing",
        next: "saved_address",
      },
      {
        text: "I want to edit  my saved address.",
        next: "want_to_edit",
      },
      {
        text: "I want to  delete my saved address.",
        next: "want_to_delete",
      },
    ],
    isSender: false,
  },

  want_to_add_new_address: {
    message: "Steps to Add a New Address",
    subMessage: [
      "1. Open the Women Rider app.",
      "2. Go to parcel section enter sender or receiver location then conform the location.",
      "3. Enter your details: Full Name, Mobile Number ,Landmark ,Complete Address",
      "4. Tap 'Save Address' to add it to your saved list.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  saved_address: {
    message: "Please check:",
    subMessage: [
      "• If you have saved an address earlier.",
      "• If you are logged in with the correct account.",
      "• If the app is updated to the latest version.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  want_to_edit: {
    message: "Steps to Edit an Address",
    subMessage: [
      "1. Open the Women Rider app.",
      "2. Go to parcel section enter sender or receiver location then conform the location",
      "3. Tap on your saved address.",
      "4. Make the required changes.",
      "5. Tap 'Save' to update the address.",
    ],
    next: "to_assist_you_further",
    isSender: false,
  },

  want_to_delete: {
    message: "Steps to Delete an Address",
    subMessage: [
      "1. Open the Women Rider app",
      "2. Go to 'Saved Details' in the menu.",
      "3. Select the address you want to remove",
      "4. Tap 'Delete' and confirm the action.",
    ],
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
