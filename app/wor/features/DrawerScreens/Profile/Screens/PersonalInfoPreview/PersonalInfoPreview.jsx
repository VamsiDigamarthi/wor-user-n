import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomeAppbar from "../../../../../../../Utils/CustomeAppbar/CustomeAppbar";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { infoModalStyles } from "../../../../../../../Components/InfoUi/Styles/InfoModalStyles";
import ModalUI from "../../../../../utiles/Modal/Modal";
import CustomBtn from "../../../../../utiles/CustomBtn";
import { usePersonalInfoHook } from "./PersonalInfo.hook";

const PersonalInfoPreview = () => {
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.profileSlice);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("name");

  function openModalToEdit(type) {
    setOpen(true);
    setCurrent(type);
  }

  function UpdateData() {}

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <CustomeAppbar
        title="Personal Information"
        top={25}
        onBack={() => navigation.goBack()}
        // rightText="Edit"
        // showRight
        // navigationText="PersonalInfo"
      />

      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <ProfileTextCard
            text={profile?.name}
            title="Full Name"
            edit={true}
            onclick={() => openModalToEdit("name")}
          />
          <ProfileTextCard text={profile?.gender || "Female"} title="Gender" />
          <ProfileTextCard text={profile?.mobile} title="Mobile Number" />
          <ProfileTextCard text={profile?.dateOfBirth} title="Date of Birth" />
          <ProfileTextCard
            text={profile?.email}
            title="Email Id"
            edit={true}
            onclick={() => openModalToEdit("email")}
          />
          <ProfileTextCard text={"20 days"} title="Member Since" />
          <ProfileTextCard
            text={profile?.address}
            title="Address"
            edit={true}
            onclick={() => openModalToEdit("address")}
          />
        </View>

        {open && (
          <ModalUI
            modalStyle="slide"
            style={infoModalStyles.aadharModalStyles}
            insideCardStyle={infoModalStyles.insideCardStyle}
            closebtn={false}
            //   closeModalFun={() => setModalOpen(!modalOpen)}
          >
            <View style={styles.btContainer}>
              <EditTextInp label="First Name" />
              <EditTextInp label="Last Name" />

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
                    setOpen(!open);
                    setCurrent("name");
                  }}
                />

                <CustomBtn
                  width="50%"
                  title="update"
                  borderColor={"#e02e88"}
                  btnColor={"#e02e88"}
                  borderWidth={1}
                />
              </View>
            </View>
          </ModalUI>
        )}
      </View>
    </View>
  );
};

export default PersonalInfoPreview;

function ProfileTextCard({ title, text, edit, onclick }) {
  return (
    <View style={styles.singleCard}>
      <AntDesign name="profile" size={24} color="black" />

      <View
        style={{
          borderBottomWidth: 1,
          width: "80%",
          paddingBottom: 5,
          borderBottomColor: "#E0E0E0",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text>{text}</Text>
      </View>

      {edit && (
        <TouchableOpacity onPress={onclick}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

function EditTextInp({ value, setValue, label }) {
  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
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
});
