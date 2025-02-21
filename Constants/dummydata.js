let priceDetails = [
  {
    image: 71,
    personCount: 1,
    vehicleType: "Scooty",
    isDisplayFastTag: true,
    isDisplayBeatTheTraffic: true,
    isDisplayUsericon: true,
    displayName: "Scooty",
    distance: "1.7 km",
    duration: 4,
    price: 33,
  },
  {
    image: 72,
    personCount: 4,
    vehicleType: "Car",
    displayName: "Wor Mini",
    distance: "1.7 km",
    duration: 4,
    price: 33,
  },
  {
    image: 72,
    personCount: 4,
    vehicleType: "bookany",
    displayName: "Book Any",
    distance: "1.7 km",
    duration: 4,
    price: 33,
  },
  {
    image: 73,
    personCount: 3,
    vehicleType: "Auto",
    displayName: "Auto",
    distance: "1.7 km",
    duration: 4,
    price: 33,
  },
  {
    image: 72,
    personCount: 6,
    vehicleType: "wor-premium",
    displayName: "Wor Luxury",
    distance: "1.7 km",
    duration: 4,
    price: 33,
  },
];

let priceDetailsss = {
  __v: 0,
  _id: "67b707ac5f5584b878d0c57d",
  baseFare: 10,
  cancellationFree: 10,
  createdAt: "2025-02-20T10:45:00.853Z",
  forTwoKm: 24,
  longPickUpFare: 3.5,
  nightFarePercentage: [20, 25],
  platformFee: 2,
  tenToHunderPrice: 8.2,
  timeFace: 0.5,
  twoToTenKmPrice: 7.2,
  updatedAt: "2025-02-20T10:45:00.853Z",
  waitingChargerAfter3Min: 1,
};

// const handleCalculatePrices = (result) => {
//   // distance = 0.4 km this is formate
//   const checkDistance = result?.distance?.split(" ");
//   const duration = result?.duration;

//   let price;
//   if (checkDistance[0] <= 2) {
//     price = 24 + +priceDetails?.baseFare - 5;
//   } else {
//     if (checkDistance[0] > 2 && checkDistance[0] <= 10) {
//       if (checkDistance[0] <= 5) {
//         price = +checkDistance[0] * 7.2 + +priceDetails?.baseFare - 5;
//       } else {
//         price = +checkDistance[0] * 7.2 + +priceDetails?.baseFare;
//       }
//     } else {
//       price = +checkDistance[0] * 8.2 + +priceDetails?.baseFare;
//     }

//   }

//   let timeFare = +duration * 0.5;
//   return Math.ceil(price + timeFare + +priceDetails?.platformFee);
// };

let rideHistory = [
  {
    _id: "67b8042680804609aa8ab817",
    addTip: 0,
    attempts: 0,
    cancelReason: {
      reason: "Looking for another vehicle",
      role: "user",
      user: "677cc42947aac41f9ff808f9",
    },
    captainCoor: [],
    createdAt: "2025-02-21T04:42:14.510Z",
    deletRequest: false,
    drop: { coordinates: [Array], type: "Point" },
    dropAddress: "Minerva Grand Kondapur",
    dropVicinity:
      "Door No. 2, adjacent to Jayabheri Silicon Towers, Survey No. 13, Hitech City Road, Kondapur",
    extraCharge: 0,
    favorite: false,
    futureTime: "1970-01-01T00:00:00.000Z",
    giveVehicleNumber: true,
    head: "677cc42947aac41f9ff808f9",
    howManyMans: 0,
    isArrived: false,
    isGivenReviewOrNotByCaptain: false,
    isGivenReviewOrNotByUser: false,
    isSendOrReceiveParcel: "send",
    mensProblem: false,
    orderOtp: 3295,
    orderOtpVerified: false,
    orderPlaceDate: "21-02-2025",
    orderPlaceTime: "10:12:14 am",
    paymentMethod: "wallet",
    pickup: { coordinates: [Array], type: "Point" },
    pickupAddress: "HCL Technologies",
    pickupVicinity:
      "HCL Technologies, G -1, near Google Office, Kothaguda, Hyderabad, Telangana 500084, India",
    price: 31,
    ratings: {
      author: null,
      orderId: "67b8042680804609aa8ab817",
      rating: 0,
      text: "",
    },
    receivedAmount: false,
    rejectedCaptaine: [],
    saved: false,
    sendReceiverData: [],
    status: "cancelled",
    time: null,
    useScheduleActualTime: null,
    vehicleType: "auto",
  },
];
