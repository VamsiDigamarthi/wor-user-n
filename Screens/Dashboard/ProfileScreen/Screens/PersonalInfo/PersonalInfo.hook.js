import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../../Constants/url";
import Toast from "react-native-toast-message";
import { onProfileSection } from "../../../../../redux/Features/Auth/ProfileSlice";

export const usePersonalInfoHook = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { profile } = useSelector((state) => state.profileSlice);
  const [userData, setUserData] = useState({
    name: profile.name || "",
    email: profile.email || "",
    dateOfBirth: profile.dateOfBirth || "",
    address: profile.address || "",
  });

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onChangeProfile = async () => {
    try {
      const response = await API.patch("/auth/edit-user-data", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.show({
        text1: response?.data?.message,
        type: "success",
        position: "bottom",
      });

      dispatch(onProfileSection({ token }));
    } catch (error) {
      console.log(error.message);
      Toast.show({
        text1: "Profile update failed, please try again",
        type: "error",
        position: "bottom",
      });
    }
  };

  return {
    userData,
    handleInputChange,
    onChangeProfile,
  };
};
