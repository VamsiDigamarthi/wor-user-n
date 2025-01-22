let nearPlaces = {
  id: "ChIJx9Lr6tqZyzsRwvu6koO3k64",
  location: { lat: 17.406498, lng: 78.47724389999999 },
  name: "Hyderabad",
  photo:
    "AWYs27yqs8P8GagZED9fqPK9UxSIGhnhOP1g6u1gpGV_5-Yr-hUQ6PN5mbglk6cZTzkG2O3FmA88_P8WUZ87pQ6T92B8h27QHiCY4pP8VNGq8HEu1HVia5QssjT5eN0G34yFhwWPZz81QLSgaS2JZkJWHA8IwmVlR2xlkvGCobv6QLlgLDFV",
  vicinity: "Hyderabad",
};

// suggestion place google map dont given coordinates
let suggetionPlace = {
  description: "Kukatpally, Hyderabad, Telangana, India",
  name: "Kukatpally",
  placeId: "ChIJPfRiAeyRyzsRSM9YQ_7GiDI",
  vicinity: "Hyderabad, Telangana, India",
};

// from ride booking screen to sedn params data (show price screen)
// 1, placeName
// 2, pickUpCoordinated
// 3, dropDetails,
// 4, selectedVehicleType
// ------------ parcel screen ------------
// 5, isPichLocationFromParc
// 6, parcelDetails
// 7, selectedCard

// 1, dropDetails --- from ride booking screeen
// let dropDetails = {
//   id: "ChIJ37ZrTf6hyzsRejW7XzCru1Y",
//   location: { lat: 17.4801969, lng: 78.4171029 },
//   name: "Emami Ltd",
//   photo:
//     "AWYs27xcUKQG3bgk2lpNnlo54uLSIL-XAJsbo9EC84AC2yadhYNZylqYxLMx7oR3FEjYHQSuohjlBi9wREaDThe1kkdU3jkENsfENcYg--wa-_TqVjqILQngMa_ZLzZ1V_hwGTi_xehnb8HjCZYFemNbtJS_7u-mYQ6X6SbgZMKID1oZYVBo",
//   vicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
// };

// 5, parcelDetails
// let parcelDetails = {
//   address: "Hitech city",
//   landMark: "Hyderabad",
//   location: { lat: 17.4801969, lng: 78.4171029 },
//   mobile: 7997979797,
//   name: "Emami Ltd",
//   senderName: "Vamai",
//   vicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
// };

let navigationStack = [
  {
    key: "DrawerNavigator-gaPUnquvZnvPsahwy8Sv8",
    name: "DrawerNavigator",
    params: undefined,
    state: {
      default: "closed",
      history: [Array],
      index: 0,
      key: "drawer-SqZfahraxdeUrjzGAFix0",
      routeNames: [Array],
      routes: [Array],
      stale: false,
      type: "drawer",
    },
  },
  {
    key: "ParcelHome-gDEyRSI1udXeAi-6s-Mj0",
    name: "ParcelHome",
    params: undefined,
    path: undefined,
  },
];

let acceptRideData = {
  _id: "678e920b0aab5f9e600898ad",
  acceptCaptain: {
    _id: "677cc106de6ae9d8356197b0",
    email: "N@gmail.com",
    mobile: "8978106223",
    name: "Narasimha",
    rcCardDetails: {
      _id: "677cc363de6ae9d835619805",
      color: "BLACK",
      maker_model: "GIXXER SF FI BSIV",
      owner_name: "D BALACHANDRA RAO",
      permanent_address:
        "5-6-124, DHAYARGUDA, KUKATPALLY, HYDERABAD, HYDERABAD, SECUNDRABAD, 500038",
      present_address:
        "5-6-124, DHAYARGUDA, KUKATPALLY, HYDERABAD, HYDERABAD, SECUNDRABAD, 500038",
      registered_at: "RTA-HYDERABAD-NZ, TELANGANA",
      registration_date: "2018-01-12",
    },
    rcNumber: "Ts10ep0061",
    vehicleName: "GIXXER SF FI BSIV",
    vehicleNumber: "Ts10ep0061",
  },
  drop: { coordinates: [78.36523609999999, 17.4535649], type: "Point" },
  dropAddress: "Monday Hotels Hitec City",
  dropVicinity: "#2-91/14/8, White Fields, Kondapur, Hitech City, Kondapur",
  futureTime: "1970-01-01T00:00:00.000Z",
  giveVehicleNumber: true,
  head: "677cc42947aac41f9ff808f9",
  howManyMans: 0,
  isArrived: false,
  mensProblem: false,
  onNaviagtionChange: false,
  orderOtp: 7297,
  orderOtpVerified: false,
  orderPlaceDate: "20-1-2025",
  orderPlaceTime: "11:42:27 pm",
  pickup: { coordinates: [78.419029, 17.4828078], type: "Point" },
  pickupAddress: "5/7/8",
  price: 46,
  ratings: [],
  receivedAmount: false,
  status: "accept",
  useScheduleActualTime: null,
  vehicleType: "scooty",
};

let completeRideHistory = {
  _id: "678f870991869db615468133",
  acceptCaptain: {
    _id: "677cc106de6ae9d8356197b0",
    email: "N@gmail.com",
    mobile: "8978106223",
    name: "Narasimha",
    profilePic: null,
    rcCardDetails: {
      _id: "677cc363de6ae9d835619805",
      color: "BLACK",
      maker_model: "GIXXER SF FI BSIV",
      owner_name: "D BALACHANDRA RAO",
      permanent_address:
        "5-6-124, DHAYARGUDA, KUKATPALLY, HYDERABAD, HYDERABAD, SECUNDRABAD, 500038",
      present_address:
        "5-6-124, DHAYARGUDA, KUKATPALLY, HYDERABAD, HYDERABAD, SECUNDRABAD, 500038",
      registered_at: "RTA-HYDERABAD-NZ, TELANGANA",
      registration_date: "2018-01-12",
    },
    rcNumber: "Ts10ep0061",
    vehicleName: "GIXXER SF FI BSIV",
    vehicleNumber: "Ts10ep0061",
  },
  captainCoor: [78.3981353, 17.4367735],
  drop: { coordinates: [78.4171029, 17.4801969], type: "Point" },
  dropAddress: "Emami Ltd",
  dropVicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
  futureTime: "1970-01-01T00:00:00.000Z",
  giveVehicleNumber: true,
  head: "677cc42947aac41f9ff808f9",
  howManyMans: 0,
  isArrived: false,
  isSendOrReceiveParcel: "send",
  mensProblem: false,
  orderOtp: 7326,
  orderOtpVerified: false,
  orderPlaceDate: "21-1-2025",
  orderPlaceTime: "5:07:44 pm",
  pickup: { coordinates: [78.3705218, 17.458714], type: "Point" },
  pickupAddress: "HCL Technologies",
  pickupVicinity:
    "HCL Technologies, G -1, near Google Office, Kothaguda, Hyderabad, Telangana 500084, India",
  price: 38,
  ratings: [],
  receivedAmount: false,
  status: "accept",
  useScheduleActualTime: null,
  vehicleType: "scooty",
};

let drop = {
  id: "ChIJSRuNtd2TyzsRyeFsL3etzs8",
  location: { lat: 17.4584134, lng: 78.3725586 },
  name: "Google Hyderabad - DivyaSree Omega",
  photo:
    "AWYs27zJQWUP4y_NP0sC8qHHf9DTdqONPk29VOugR4DniWhaiQmYRxlFEz1RNlwb2M-4LXCkfyGSzsOdqloijr14p35lJYjLv6KM1gbLfAb96_f4AcCFMbaDwvt8j9kTZ0MgjJ7SGK7m0RQ0kcx97B0t8gm0610dN3NGf_E4am8xLgDmGeBe",
  vicinity: "Block 1, DivyaSree Omega Survey No 13, Kothaguda",
};

let pickUp = {
  location: { lat: 17.4587279, lng: 78.3705312 },
  name: "6th Floor",
  vicinity:
    "Sprint Business Centre, 6th Floor, Jayabheri Silicon Towers, Kothaguda, Hyderabad, Telangana 500084, India",
};

let favorite = [
  {
    __v: 0,
    _id: "678aa6fadd47b3d0a64748cb",
    head: "677cc42947aac41f9ff808f9",
    location: { coordinates: [Array], type: "Point" },
    name: "Adidas",
    vicinity:
      "Shop No. 529, Srinivasa Complex, Vivek Nagar, Kukatpally, Hyderabad",
  },
  {
    __v: 0,
    _id: "678aa702dd47b3d0a64748db",
    head: "677cc42947aac41f9ff808f9",
    location: { coordinates: [Array], type: "Point" },
    name: "Emami Ltd",
    vicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
  },
  {
    __v: 0,
    _id: "678aa923dd47b3d0a6474b22",
    head: "677cc42947aac41f9ff808f9",
    location: { coordinates: [Array], type: "Point" },
    name: "VSP Industries",
    vicinity:
      "Shed No: 4-B, Type1, TSIIC, IALA, Besides Daewoong Pharrmsutical, TGIIC Road, Prashanth Nagar, Kukatpally, Hyderabad",
  },
];

let favoritess = {
  id: "ChIJSRuNtd2TyzsRyeFsL3etzs8",
  location: { lat: 17.4584134, lng: 78.3725586 },
  name: "Google Hyderabad - DivyaSree Omega",
  photo:
    "AWYs27zvOlgvkP4U-XgAeZx_3EvLYBzNz48_Lv1Zcj7dPwLL9c3Glt3RSCllDrgDRkaqZX7yfS9EN_BDu8Sz4d4ClOlGgGJgc6FH8WUyR0Wk4cQfBpzalyXMcJqZdwO3ljcSEJ2e2gZ8w9WIgDWlmMR5sSGBRBT9UIAbzMM-I1WKrc4ahUXi",
  vicinity: "Block 1, DivyaSree Omega Survey No 13, Kothaguda",
};

let fav = {
  __v: 0,
  _id: "678aa702dd47b3d0a64748db",
  head: "677cc42947aac41f9ff808f9",
  location: { coordinates: [78.4171029, 17.4801969], type: "Point" },
  name: "Emami Ltd",
  vicinity: "5-5-184, Panama Godowns, Vanasthalipuram, Hyderabad",
};
