import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomeAppbar from "../../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import ModalUI from "../../../../../utiles/Modal/Modal";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { usePersonalInfoHook } from "./PersonalInfo.hook";
import { fonts } from "../../../../../fonts/Fonts";

import {
  calendar,
  clock,
  email,
  locationpin,
  mobile,
  genderidentity,
  personalInfo,
} from "../../../../../Images/ProfileImages";
import AppBarLayout from "../../../../ridebooking/sharedLogics/AppBarLayout";

const PersonalInfoPreview = () => {
  const { onChangeProfile, handleInputChange, userData, profile } =
    usePersonalInfoHook();

  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("name");
  const [noOfDays, setnoOfDays] = useState(null);

  function openModalToEdit(type) {
    setOpen(!open);
    setCurrent(type);
  }

  function updateData() {
    // console.log("pressed");

    onChangeProfile();
    setOpen(!open);
    setCurrent("name");
  }

  useEffect(() => {
    const signUpDate = new Date(profile?.signUpDateAndTime);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = currentDate - signUpDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    setnoOfDays(diffInDays);
  });

  // console.log(diffInDays);

  return (
    <AppBarLayout title="Personal Information" isPositionAppbar={true}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <ProfileTextCard
            text={profile?.name}
            title="Full Name"
            edit={true}
            onclick={() => openModalToEdit("name")}
            icon={personalInfo}
          />
          <ProfileTextCard
            text={profile?.gender || "Female"}
            title="Gender"
            icon={genderidentity}
          />
          <ProfileTextCard
            text={profile?.mobile}
            title="Mobile Number"
            icon={mobile}
          />
          <ProfileTextCard
            text={profile?.aadharCardDetails?.dob}
            title="Date of Birth"
            icon={calendar}
          />
          <ProfileTextCard
            text={profile?.email}
            title="Email Id"
            edit={true}
            onclick={() => openModalToEdit("email")}
            icon={email}
          />
          <ProfileTextCard
            text={`${noOfDays} days`}
            title="Member Since"
            icon={clock}
          />
          <ProfileTextCard
            text={
              profile?.address ||
              `${profile?.aadharCardDetails?.address?.house} , ${profile?.aadharCardDetails?.address?.village} , ${profile?.aadharCardDetails?.address?.village}` ||
              ""
            }
            title="Address"
            edit={true}
            onclick={() => openModalToEdit("address")}
            icon={locationpin}
          />
        </View>

        {open && (
          <ModalUI
            modalStyle="slide"
            style={infoModalStyles.aadharModalStyles}
            insideCardStyle={infoModalStyles.insideCardStyle}
            closebtn={false}
            closeModalFun={() => openModalToEdit("name")}
          >
            <View style={styles.btContainer}>
              {current == "name" && (
                <>
                  <EditTextInp
                    handleInputChange={handleInputChange}
                    value={userData?.name}
                    field={"name"}
                    label="First Name"
                  />
                </>
              )}

              {current == "email" && (
                <EditTextInp
                  handleInputChange={handleInputChange}
                  value={userData?.email}
                  field={"email"}
                  label="Email Id"
                />
              )}
              {current == "address" && (
                <EditTextInp
                  value={userData?.address}
                  handleInputChange={handleInputChange}
                  field={"address"}
                  label="Address"
                />
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 25,
                }}
              >
                <CustomBtn
                  title="cancel"
                  width="50%"
                  borderColor={"#757575"}
                  borderWidth={1}
                  onPress={() => {
                    openModalToEdit("name");
                  }}
                />

                <CustomBtn
                  width="50%"
                  title="update"
                  borderColor={"#EA4C89"}
                  btnColor={"#EA4C89"}
                  borderWidth={1}
                  onPress={updateData}
                />
              </View>
            </View>
          </ModalUI>
        )}
      </View>
    </AppBarLayout>
  );
};

export default PersonalInfoPreview;

function ProfileTextCard({ title, text, edit, onclick, icon }) {
  return (
    <View style={styles.singleCard}>
      {/* <AntDesign name="profile" size={24} color="black" /> */}

      <Image source={icon} style={styles.icon} />

      <View
        style={{
          borderBottomWidth: 1,
          width: "80%",
          paddingBottom: 5,
          borderBottomColor: "#E0E0E0",
        }}
      >
        <Text style={{ fontFamily: fonts.robotoMedium, fontSize: 12 }}>
          {title}
        </Text>
        <Text style={{ fontFamily: fonts.robotoRegular, fontSize: 16 }}>
          {text}
        </Text>
      </View>

      {edit && (
        <TouchableOpacity onPress={onclick}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

function EditTextInp({ value, field, label, handleInputChange }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          marginBottom: 5,
          fontSize: 10,
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={(text) => handleInputChange(field, text)}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    marginTop: 80,

    backgroundColor: "#f7f7f7",
  },

  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 1,
    // backgroundColor: "#F7F7F7",
    backgroundColor: "#fff",
    marginTop: 10,
    width: "100%",
    borderRadius: 20,
    gap: 12,
  },
  singleCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
  },

  btContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    gap: 10,
  },

  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
