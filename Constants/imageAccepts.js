export const getMimeType = (uri) => {
  const extension = uri.split(".").pop().toLowerCase(); // Ensure extension is in lowercase
  switch (extension) {
    // Image file types
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";

    // Audio file types
    case "mp3":
      return "audio/mpeg";
    case "m4a":
      return "audio/mp4";
    case "wav":
      return "audio/wav";
    case "ogg":
      return "audio/ogg";

    // Default type
    default:
      return "application/octet-stream";
  }
};
