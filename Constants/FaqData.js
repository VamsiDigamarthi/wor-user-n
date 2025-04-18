import {
  safetyIcon,
  rideBilling,
  account,
  payment,
  refer,
  services,
} from "../app/wor/Images/helpandsupport";

export const faqData = [
  {
    maintitle: "Safe & Secure",
    icon: safetyIcon,
    data: [
      {
        "What is the time duration at which the insurance starts working?":
          "Your insurance cover begins with your seating on a Women Rider ride and continues until you reach the destination. The insurance can be claimed for a maximum of 24 hours.",
      },
      {
        "What are the Terms & Conditions of the Insurance cover?":
          "Insurance cover applies only to bookings made via the Women Rider platform. For full terms and conditions, see Insurance T&C.",
      },
      {
        "How do I make a claim for insurance for a ride?":
          "You can make a claim in case you are injured or met with an accident while traveling using the application under the head of Insurance",
      },
      {
        "What safety features does women riders get?":
          "Emergency Response Team: Available 24/7 to address any emergency during the ride. Activate the SOS button via the app after booking a ride.",
      },
      {
        "How does the SOS option work?":
          "The SOS button connects you to the emergency response team for quick action. You can also share ride details with your trusted contacts.",
      },
    ],
  },

  {
    icon: rideBilling,
    maintitle: "Ride & Billing",
    data: [
      {
        "How do I know how much a ride will cost?":
          "Input your pickup and drop-off addresses in the app to get an estimate of the fare. Fare varies by location, time booked, and rider availability",
      },
      {
        "How do I see a breakdown of the fare?":
          "On the booking page, there is an icon next to the fare. The breakdown has Base Fare, Distance Fare, Ride Time Fare, Insurance Charges, Discounts, and Surcharges.",
      },
      {
        "How do I use a coupon code for a ride?":
          "Click Apply Coupon Code while booking a ride and see the applicable codes. Choose which one you want to apply and click Apply to make it active.",
      },
      {
        "How do I contact my rider?":
          "Once your ride is confirmed you can reach your rider through either chat or call within the app.",
      },
      {
        "What are ETAs, and how is it calculated?":
          "What are ETAs, and how is it calculated?",
      },

      {
        "How do I start a ride with a PIN?":
          "After the reservation, you will receive a PIN in the Track Ride area. Share this with your rider to start the ride.",
      },
    ],
  },

  // {
  //   icon: services,
  //   maintitle: "Services",
  //   data: [
  //     {
  //       "What is Local Service?":
  //         "A same-city parcel delivery service. It has restrictions as follows: item size, weight (under 5 kg), and contents (for instance, not containing alcohol, fragile or expensive items).",
  //     },

  //     {
  //       "How to use the Local Service?":
  //         "Tap the Local Service in the app menu > Enter pickup and drop-off details > Give the rider a PIN at both ends to confirm delivery.",
  //     },
  //     {
  //       "How can I share the delivery status?":
  //         "Use the Share Status option to send a tracking link and rider details to the recipient.",
  //     },
  //   ],
  // },

  {
    icon: account,
    maintitle: "Account And App",
    data: [
      {
        "How do I book a ride?":
          "Enter your destination, confirm the pickup location, and tap Request Ride. You'll receive a notification when your ride is confirmed.",
      },
      {
        "How do I update my language preference?":
          "Proceed to Menu > Settings > Language to change your preferred language",
      },
      {
        "How do I update my favourite places?":
          "Proceed to Menu > Settings > Favorites to view or edit your saved addresses like Home and Work.",
      },
      { "Can I schedule a ride?": "Not yet, though! Keep checking for that!" },
    ],
  },

  {
    icon: refer,
    maintitle: "Referrals",
    data: [
      {
        "How do I refer a friend?":
          "Use the Invite Friends option in the menu. Share your referral code with friends and earn rewards!.",
      },
      {
        "How do I track my referral credits?":
          "You can find your referral rewards under Invite Friends > Total Rewards. You can use these credits for future rides.",
      },
    ],
  },

  {
    icon: payment,
    maintitle: "Payment & Wallet",
    data: [
      {
        "How do I link or unlink a wallet?":
          "Navigate to Menu > Payment, tap on the wallet you wish to link or unlink and follow the on-screen instructions. Please note that the wallet must be registered with the same number as your Women Rider account.",
      },
      {
        "How do I check my wallet balance?":
          "You can access the wallet balance by visiting Menu > Payment.",
      },
      {
        "What are Women Rider Coins?":
          "Reward programme wherein you earn coins with every ride and offer. One coin is equivalent to 1 INR. You can use them with other discounts for booking.",
      },
    ],
  },
];
