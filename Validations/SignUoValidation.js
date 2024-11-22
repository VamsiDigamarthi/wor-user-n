export const signUpValidation = (onImageError, selectedImage, formData) => {
  const newErrors = {};

  if (!formData.name) {
    newErrors.name = "Full Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    newErrors.name = "Name should only contain alphabetic characters";
  } else if (formData.name?.length < 3) {
    newErrors.name = "Name should be at least 3 characters long";
  }

  if (!formData.dob) {
    newErrors.dob = "Date of birth is required";
  }
  if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Valid email is required";
  }
  if (!formData.address) {
    newErrors.address = "Current Address is required";
  }

  return Object.keys(newErrors)?.length > 0 ? newErrors : {};
};
