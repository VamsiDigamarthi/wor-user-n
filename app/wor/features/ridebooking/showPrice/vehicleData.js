export const VEHICLE_PRICES = {
  scooty: 7,
  car: 10,
  auto: 8,
  "wor-premium": 12,
};

export const vehicles = [
  {
    image: require("../../../../../assets/images/HomeServiceImages/scooty.png"),
    personCount: 1,
    vehicleType: "Scooty",
    isDisplayFastTag: true,
    isDisplayBeatTheTraffic: true,
    isDisplayUsericon: true,
    displayName: "WoR Scooty",
    discountPrice: 2,
  },
  // {
  //   image: require("../../../../../assets/images/HomeServiceImages/cab.png"),
  //   personCount: 4,
  //   vehicleType: "Car",
  //   displayName: "WoR Mini",
  //   discountPrice: 2,
  // },

  // {
  //   image: require("../../../../../assets/images/HomeServiceImages/auto.png"),
  //   personCount: 3,
  //   vehicleType: "Auto",
  //   displayName: "Auto",
  // },
  // {
  //   image: require("../../../../../assets/images/HomeServiceImages/cab.png"),
  //   personCount: 4,
  //   vehicleType: "wor-premium",
  //   displayName: "WoR Luxury",
  //   discountPrice: 2,
  // },
  // {
  //   image: require("../../../../../assets/images/HomeServiceImages/cab.png"),
  //   personCount: 3,
  //   vehicleType: "bookany",
  //   displayName: "Book Any",
  //   discountPrice: 2,
  // },
  // {
  //   image: require("../../../../../assets/images/HomeServiceImages/cab.png"),
  //   personCount: 6,
  //   vehicleType: "proMax",
  //   displayName: "WoR Pro Max",
  //   discountPrice: 2,
  // },
];

// Calculate price details based on distance
export const calculatePriceDetails = (distance) => {
  return Object.keys(VEHICLE_PRICES).reduce((acc, vehicleType) => {
    acc[vehicleType] = (distance * VEHICLE_PRICES[vehicleType])?.toFixed(0);
    return acc;
  }, {});
};
