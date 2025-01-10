export const customMapStyle = [
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },

  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      { color: "#76c893" }, // Light green parks
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      { visibility: "off" }, // Hide park labels (optional)
    ],
  },

  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#4a80f5" }, // Blue for water bodies
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#ffffff" }, // White text for water labels
    ],
  },

  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      { color: "#e0e0e0" }, // Beige for man-made areas
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      { color: "#f5dcdc" }, // Light gray for natural landscapes
    ],
  },
];
