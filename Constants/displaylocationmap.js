const YOUR_API_KEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8";

import axios from "axios";
export const coordinationMap = (lat, lng) => {
  // Construct the correct URL for the Google Static Maps API
  let mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${YOUR_API_KEY}`;

  return mapImage;
};

export const fetchNearbyPlaces = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&key=${YOUR_API_KEY}`
    );
    const data = await response.json();

    const places = data.results.map((place) => ({
      id: place.place_id, // Unique identifier for the place
      name: place.name, // Name of the place
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      // icon: place.icon, // Icon URL
      photo: place.photos ? place.photos[0].photo_reference : null,
      vicinity: place.vicinity,
    }));
    return places;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
};

export const nearPlacesByText = async (text) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${YOUR_API_KEY}&components=country:in`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.predictions) {
      const formattedPredictions = data.predictions.map((prediction) => ({
        description: prediction.description,
        placeId: prediction.place_id,
        name: prediction.structured_formatting.main_text,
        vicinity: prediction.structured_formatting.secondary_text,
      }));

      return formattedPredictions;
    }
    return [];
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
};

export const getCoordinatesFromPlaceId = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${YOUR_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const location = data.result.geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
      }; // Return coordinates as an object
    } else {
      console.error("Error fetching place details:", data.status);
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
  }

  return null; // Return null if there was an issue
};

// const getPlaceName = async (lat, lon) => {
//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const placeName = data.display_name;
//     console.log("Place Name:", placeName);
//     return placeName;
//   } catch (error) {
//     console.error("Error fetching place name:", error);
//   }
// };

export const getPlaceName = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${YOUR_API_KEY}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      // console.log("map", data.results[0]);
      const address = data.results[0].formatted_address;
      // console.log("Place Name:", address);
      return address; // Returning the place name
    } else {
      console.log("No results found for the given coordinates.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching place name:", error);
  }
};

// calcualte time and distance

const adjustTimeForAutoRickshaw = (carDurationInSeconds) => {
  const autoMultiplier = 1.2; // Adjust based on local speeds
  return carDurationInSeconds * autoMultiplier;
};

export const getTravelDetails = async (
  startCoordinates,
  endCoordinates,
  vehicleType
) => {
  const [startLon, startLat] = startCoordinates;
  const [endLon, endLat] = endCoordinates;

  let mode;

  // Select mode based on vehicle type
  switch (vehicleType) {
    case "car":
      mode = "driving";
      break;
    case "scooty":
      mode = "bicycling";
      break;
    case "auto":
      mode = "driving"; // Use driving but adjust time later
      break;
    default:
      mode = "driving"; // Default to driving
      break;
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLat},${startLon}&destinations=${endLat},${endLon}&key=${YOUR_API_KEY}&mode=driving`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.rows[0].elements[0].status === "OK") {
      let distance = data.rows[0].elements[0].distance.text;
      let duration = data.rows[0].elements[0].duration.value; // Duration in seconds

      // Adjust duration for auto-rickshaw
      if (vehicleType === "auto") {
        duration = adjustTimeForAutoRickshaw(duration);
      }

      const durationInMinutes = Math.round(duration / 60); // Convert to minutes

      return {
        distance,
        durationInMinutes,
      };
    } else {
      console.error("No route found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching travel details:", error);
  }
};

export const fetchNearbyPoliceStations = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=7000&type=police&key=${YOUR_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      // Fetch police stations and additional details using the place_id
      const policeStationsWithDetails = await Promise.all(
        response.data.results.map(async (station) => {
          const details = await fetchPlaceDetails(station.place_id); // Fetch additional details using the place_id
          return {
            ...station,
            policeStationNumber: details?.result?.place_id, // Add your custom police station number or identifier here
            // You can extract other useful information here as well
            address: details?.result?.formatted_address,
            phone: details?.result?.formatted_phone_number,
          };
        })
      );
      // Calculate distances and return the full list with details
      const stationsWithDistances = await calculateDistances(
        policeStationsWithDetails,
        {
          lat: latitude,
          lng: longitude,
        }
      );
      return stationsWithDistances;
    } else {
      Alert.alert("Error", "No police stations found nearby");
    }
  } catch (error) {
    console.error("Error fetching police stations:", error);
    Alert.alert("Error", "Failed to fetch nearby police stations");
  }
};

// Function to fetch more details about a police station using place_id
const fetchPlaceDetails = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${YOUR_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.result; // Return the detailed result which includes address, phone, etc.
    } else {
      console.error("Error fetching place details");
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
};

// Function to calculate distances using Google Distance Matrix API
const calculateDistances = async (policeStations, location) => {
  const origins = `${location.lat},${location.lng}`;
  const destinations = policeStations
    .map(
      (station) =>
        `${station.geometry.location.lat},${station.geometry.location.lng}`
    )
    .join("|");

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${YOUR_API_KEY}`;

  try {
    const response = await axios.get(url);
    const { rows } = response.data;
    if (rows.length > 0) {
      const distances = rows[0].elements;

      // Attach distance and duration to each police station
      return policeStations.map((station, index) => ({
        ...station,
        distance: distances[index]?.distance?.text || "N/A",
        duration: distances[index]?.duration?.text || "N/A",
      }));
    }
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
  }
};

export const fetchNameAndVicinity = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${YOUR_API_KEY}`;

  try {
    const response = await axios.get(url);
    const location = response.data.results[0]; // The first result is usually the most relevant

    // Extract formatted address
    const nameAndVicinity = {
      name: location.address_components[0].long_name, // Example of a specific name
      vicinity: location.formatted_address, // The full address of the location
    };

    // console.log(nameAndVicinity); // Display the extracted data
    return nameAndVicinity; // Return the result if needed elsewhere
  } catch (error) {
    console.log(error, "Location name and vicinity fetching failed");
  }
};

export const calculateBearing = (startCoords, endCoords) => {
  const { latitude: lat1, longitude: lon1 } = startCoords;
  const { latitude: lat2, longitude: lon2 } = endCoords;

  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const dLon = toRadians(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);

  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360; // Normalize to 0-360 degrees
};
