const YOUR_API_KEY = "AIzaSyAvJUZ3vsynRkQhXSdZL-BIFo26bXH-Al8";

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
