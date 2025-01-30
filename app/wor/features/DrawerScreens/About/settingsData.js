import {
  gear,
  license,
  logout,
  privacy,
  terms,
} from "../../../Images/abouticons";

export const settingsData = [
  {
    name: "App Settings",
    navigationScreen: "AppSettings",
    icon: gear,
  },
  {
    name: "Terms And Condition",
    navigationScreen: null,
    isFunc: true,
    icon: terms,
  },
  {
    name: "Privacy Policy",
    navigationScreen: null,
    isFunc: true,
    icon: privacy,
  },
  {
    name: "Software License",
    navigationScreen: null,
    isFunc: true,
    icon: license,
  },
  {
    name: "Logout",
    navigationScreen: null,
    isFunc: true,
    icon: logout,
  },
];
