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

let aadharData = {
  aadhaar_number: "812205103025",
  aadhaar_pdf: null,
  address: {
    country: "India",
    dist: "West Godavari",
    house: "3-164",
    landmark: "",
    loc: "Palakollu Mandalam",
    po: "Aratlakatta",
    state: "Andhra Pradesh",
    street: "Church Peta",
    subdist: "Palakollu",
    vtc: "Aratlakatla",
  },
  care_of: "S/O: Achuta Ramayya",
  client_id: "aadhaar_v2_kzoKVNUbCwannfuhMksp",
  dob: "1999-05-08",
  email_hash: "",
  face_score: -1,
  face_status: false,
  full_name: "Digamarthi Vamsi",
  gender: "M",
  has_image: true,
  mobile_hash:
    "599c4db1ef6e7f5abf54501032a3ef5374907b3ba030f27a84f9e19b39675bfd",
  mobile_verified: false,
  profile_image:
    "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",
  raw_xml:
    "https://aadhaar-kyc-docs.s3.amazonaws.com/nuhvin02/aadhaar_xml/302520250127164939296/302520250127164939296-2025-01-27-111939408004.xml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY5K3QRM5FYWPQJEB%2F20250127%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250127T111939Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=97f23703185fda32dcfa3c1cfd9591ef0468cb9186bffda2e1593edc853f4102",
  reference_id: "302520250127164939296",
  share_code: "3886",
  status: "success_aadhaar",
  uniqueness_id:
    "791e767d53ac43c589c03c339505c5077dc8be67d7073bf3bd2eaf3b9f2c1cbc",
  zip: "534250",
  zip_data:
    "https://aadhaar-kyc-docs.s3.amazonaws.com/nuhvin02/aadhaar_xml/302520250127164939296/302520250127164939296-2025-01-27-111939357063.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY5K3QRM5FYWPQJEB%2F20250127%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250127T111939Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=0b8406f59ef3aaf049c21f6bfec452fe055e58ba04436fb8d589c6ecdee9e587",
};
