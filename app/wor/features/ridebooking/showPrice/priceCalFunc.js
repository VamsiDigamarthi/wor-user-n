import moment from "moment-timezone";
// cal distance from google map

export const handleCalBaseFare = ({ vehicleType, distance, newBaseFare }) => {
  if (vehicleType?.toLowerCase() === "scooty") {
    if (distance <= 2) {
      return 0;
    }

    return newBaseFare;
  } else if (vehicleType?.toLowerCase() === "scooty-lite") {
    if (distance <= 2) {
      return 0;
    }

    return newBaseFare;
  } else if (vehicleType?.toLowerCase() === "car") {
    if (distance <= 4) {
      return 0;
    }

    return newBaseFare;
  } else if (vehicleType?.toLowerCase() === "wor-premium") {
    if (distance <= 4) {
      return 0;
    }

    return newBaseFare;
  } else if (vehicleType?.toLowerCase() === "promax") {
    if (distance <= 4) {
      return 0;
    }

    return newBaseFare;
  } else if (vehicleType?.toLowerCase() || "bookany") {
    if (distance <= 4) {
      return 0;
    }

    return newBaseFare;
  }
};

export const calcPlatformFeer = ({ vehicleType, distance, platformFee }) => {
  if (vehicleType?.toLowerCase() === "scooty") {
    if (distance <= 2) {
      return 0;
    }
    return platformFee;
  } else if (vehicleType?.toLowerCase() === "scooty-lite") {
    if (distance <= 2) {
      return 0;
    }

    return platformFee;
  } else if (vehicleType?.toLowerCase() === "car") {
    if (distance <= 4) {
      return 0;
    }

    return platformFee;
  } else if (vehicleType?.toLowerCase() === "wor-premium") {
    if (distance <= 4) {
      return 0;
    }

    return platformFee;
  } else if (vehicleType?.toLowerCase() === "promax") {
    if (distance <= 4) {
      return 0;
    }

    return platformFee;
  } else if (vehicleType?.toLowerCase() || "bookany") {
    if (distance <= 4) {
      return 0;
    }
    return platformFee;
  }
};

export const calculateDistanceFare = (distance, vehcilePrices, vehicleType) => {
  if (vehcilePrices?.vehicleType?.toLowerCase() === "scooty") {
    console.log("distance in calculateDistanceFare", distance);

    if (distance <= 2) {
      return +vehcilePrices?.forTwoKm;
    } else if (distance > 2 && distance <= 10) {
      return distance * +vehcilePrices?.twoToTenKmPrice;
    }
    return distance * +vehcilePrices?.tenToHunderPrice;
  } else if (vehcilePrices?.vehicleType?.toLowerCase() === "scooty-lite") {
    if (distance <= 2) {
      return +vehcilePrices?.forTwoKm;
    } else if (distance > 2 && distance <= 10) {
      return distance * +vehcilePrices?.twoToTenKmPrice;
    }
    return distance * +vehcilePrices?.tenToHunderPrice;
  } else if (vehcilePrices?.vehicleType?.toLowerCase() === "car") {
    if (distance <= 4) {
      return +vehcilePrices?.forTwoKm;
    } else if (distance > 4 && distance <= 20) {
      return distance * +vehcilePrices?.twoToTenKmPrice;
    }
    return distance * +vehcilePrices?.tenToHunderPrice;
  } else if (vehcilePrices?.vehicleType?.toLowerCase() === "wor-premium") {
    if (distance <= 4) {
      return +vehcilePrices?.forTwoKm;
    } else if (distance > 4 && distance <= 20) {
      return distance * +vehcilePrices?.twoToTenKmPrice;
    }
    return distance * +vehcilePrices?.tenToHunderPrice;
  } else if (vehcilePrices?.vehicleType?.toLowerCase() === "promax") {
    if (distance <= 4) {
      return +vehcilePrices?.forTwoKm;
    } else if (distance > 4 && distance <= 20) {
      return distance * +vehcilePrices?.twoToTenKmPrice;
    }
    return distance * +vehcilePrices?.tenToHunderPrice;
  }
  //  else if (
  //   vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase()
  // ) {
  //   if (distance <= 2) {
  //     return +vehcilePrices?.forTwoKm;
  //   }
  //   if (distance > 2 && distance <= 20) {
  //     return distance * +vehcilePrices?.twoToTenKmPrice;
  //   }
  //   return distance * +vehcilePrices?.tenToHunderPrice;
  // }
  else if (
    vehcilePrices?.vehicleType?.toLowerCase() === vehicleType?.toLowerCase() ||
    "bookany"
  ) {
    return 56;
  }

  // if (distance <= 2) {
  //   return 24 + baseFare - 5;
  // }
  // if (distance > 2 && distance <= 10) {
  //   return distance * +priceDetails?.twoToTenKmPrice + baseFare;
  // }
  // // if (distance > 5 && distance <= 10) {
  // //   return distance * 7.2 + baseFare;
  // // }
  // return distance * +priceDetails?.tenToHunderPrice + baseFare;
};

export const calculateTimeFare = (
  duration,
  vehcilePrices,
  distance,
  vehicleType
) => {
  if (vehicleType?.toLowerCase() === "scooty") {
    if (distance <= 2) {
      return 0;
    }
    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
  } else if (vehicleType?.toLowerCase() === "scooty-lite") {
    if (distance <= 2) {
      return 0;
    }
    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
  } else if (vehicleType?.toLowerCase() === "car") {
    if (distance <= 4) {
      return 0;
    }

    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
  } else if (vehicleType?.toLowerCase() === "wor-premium") {
    if (distance <= 4) {
      return 0;
    }

    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
  } else if (vehicleType?.toLowerCase() === "promax") {
    if (distance <= 4) {
      return 0;
    }

    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
  } else if (vehicleType?.toLowerCase() || "bookany") {
    if (distance <= 4) {
      return 0;
    }
    return parseFloat((+duration * +vehcilePrices?.timeFace)?.toFixed(2));
  }
};

export const otherServicesCharges = (vehcilePrices, distance, vehicleType) => {
  if (vehicleType?.toLowerCase() === "scooty") {
    if (distance <= 2) {
      return 0;
    }
    const [min, max] = vehcilePrices?.otherServices || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  } else if (vehicleType?.toLowerCase() === "scooty-lite") {
    if (distance <= 2) {
      return 0;
    }
    const [min, max] = vehcilePrices?.otherServices || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  } else if (vehicleType?.toLowerCase() === "car") {
    if (distance <= 4) {
      return 0;
    }

    const [min, max] = vehcilePrices?.otherServices || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  } else if (vehicleType?.toLowerCase() === "wor-premium") {
    if (distance <= 4) {
      return 0;
    }
    const [min, max] = vehcilePrices?.otherServices || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  } else if (vehicleType?.toLowerCase() === "promax") {
    if (distance <= 4) {
      return 0;
    }
    const [min, max] = vehcilePrices?.otherServices || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  } else if (vehicleType?.toLowerCase() || "bookany") {
    if (distance <= 4) {
      return 0;
    }
    const [min, max] = vehcilePrices?.otherServices || [0, 0];
    return Math.ceil(Math.random() * (max - min) + min);
  }
};

export const checkNightTime = () => {
  const currentHour = moment().tz("Asia/Kolkata").hour();
  return currentHour >= 23 || currentHour < 6;
};

export const applyNightFare = (beforeNightSurgePrice, vehcilePrices) => {
  // const totalPrice = Math.ceil(price + timeFare + platFormPrice, baseFare);
  const randomPerc = getRandomNightFare(vehcilePrices);
  const increasedAmount = Math.ceil((randomPerc / 100) * beforeNightSurgePrice);
  return beforeNightSurgePrice + increasedAmount;
};

const getRandomNightFare = (vehcilePrices) => {
  const [min, max] = vehcilePrices?.nightFarePercentage || [0, 0];
  return Math.ceil(Math.random() * (max - min) + min);
};

export const getRandomSurgeFare = (vehcilePrices) => {
  const [min, max] = vehcilePrices?.surgePricePercentage || [0, 0];
  return Math.ceil(Math.random() * (max - min) + min);
};
