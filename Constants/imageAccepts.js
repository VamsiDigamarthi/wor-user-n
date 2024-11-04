export const getMimeType = (uri) => {
  const extension = uri.split(".").pop();
  switch (extension) {
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
};
