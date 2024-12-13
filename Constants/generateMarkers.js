export const generateRandomMarkers = (location) => {
  const types = ["bike", "auto", "car"];
  const newMarkers = Array.from({ length: 20 }, (_, index) => {
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomRotation = Math.floor(Math.random() * 360);
    return {
      id: index,
      latitude: location.lat + (Math.random() - 0.5) * 0.01,
      longitude: location.lng + (Math.random() - 0.5) * 0.01,
      type: randomType,
      rotation: randomRotation,
    };
  });
  return newMarkers;
};
