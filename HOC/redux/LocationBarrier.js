import { getDistance } from "geolib";

const isUserWithinRange = (location, cityCoordinates, radiusInKm) => {
  const distance = getDistance(
    // { latitude: 16.5103132, longitude: 80.5624811 },
    { latitude: location?.lat, longitude: location?.lng },

    {
      latitude: cityCoordinates.latitude,
      longitude: cityCoordinates.longitude,
    }
  );
  // Convert distance to kilometers
  return distance / 1000 <= radiusInKm;
};

export const checkUserLocation = async ({ location }) => {
  try {
    // Step 2: Define multiple zones
    const zones = [
      {
        name: "Hyderabad City Center",
        coordinates: { latitude: 17.385, longitude: 78.4867 },
        radius: 15,
      },
      {
        name: "Hyderabad Suburbs",
        coordinates: { latitude: 17.385, longitude: 78.4867 },
        radius: 30,
      },
      {
        name: "Hyderabad Outskirts",
        coordinates: { latitude: 17.385, longitude: 78.4867 },
        radius: 50,
      },
    ];

    // Step 3: Check which zone the user is in
    let isInZone = false;
    for (const zone of zones) {
      if (isUserWithinRange(location, zone.coordinates, zone.radius)) {
        console.log(`User is within ${zone.name} (${zone.radius} km).`);
        //   alert(`You are within ${zone.name} (${zone.radius} km)!`);
        isInZone = true;

        return true;
      }
    }

    if (!isInZone) {
      console.log("User is outside all defined zones.");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
    //   alert("An error occurred while checking your location.");
  }
};
