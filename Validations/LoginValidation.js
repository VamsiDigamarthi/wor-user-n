export const loginValidation = (mobile, isChecked) => {
  const errors = { mobile: "", privacy: "" };

  if (!mobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^[0-9]{10}$/.test(mobile)) {
    errors.mobile = "Please enter a valid 10-digit mobile number.";
  }

  if (!isChecked) {
    errors.privacy = "You must accept the terms and conditions.";
  }

  return errors.mobile || errors.privacy ? errors : {};
};
