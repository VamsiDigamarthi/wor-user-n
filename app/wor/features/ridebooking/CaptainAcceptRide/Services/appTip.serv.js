import { API } from "../../../../../../Constants/url";

export const addTip = async ({ tip, token }) => {
  try {
    await API.patch(
      "/user/add-tip",
      { tip },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    Toast.show({
      text1: "Failed to add Tip",
      type: "error",
      position: "bottom",
    });
  }
};
