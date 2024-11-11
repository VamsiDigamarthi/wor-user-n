import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For checkbox icons
import CustomBtn from '../../../Utils/CustomBtn/CustomBtn';

export default function MobileVerification() {

    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mobile, setMobile] = useState('')

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Ensures smooth shifting on iOS and Android
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={style.mainContainer}>

                    {!otpSent && <>
                        <View style={[style.inputContainer]}>
                            <TextInput value={mobile} onChangeText={setMobile} style={[style.input]} placeholder='Enter Mobile Number' keyboardType='decimal-pad' placeholderTextColor="black" />
                            <Ionicons name="call" size={24} color="#e02e88" style={style.icon} />
                        </View>
                        <View style={{ marginTop: 500 }}>
                            <CustomBtn title="Continue" borderWidth={1} btnBg={mobile.length === 10 ? "#e02e88" : "#fff"} btnColor={mobile.length === 10 ? "#fff" : "#000"} borderColor="#e02e88" />
                        </View>
                    </>
                    }

                    {otpSent && <>
                        <View style={{ marginTop: 20, }}>
                            <Text>
                                Please Enter Otp Sent to your 6 digit Mobile Number
                            </Text>



                            {/* place otp inputs here */}




                            <Text style={{ textAlign: "right", fontWeight: "bold" }}>Resend Otp ?</Text>
                        </View>
                    </>}



                    <View style={{ marginTop: 500 }}>
                        <CustomBtn title="Continue" borderWidth={1} btnBg={"#fff"} btnColor={"#000"} borderColor="#e02e88" />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}









const style = StyleSheet.create({
    mainContainer: {
        padding: 24,
        backgroundColor: "#f5f5f5",
        flex: 1,
        width: "100%",
    },
    inputContainer: {
        position: "relative",
        marginTop: 50,
    },
    input: {
        borderBottomColor: "#e02e88",
        borderBottomWidth: 1,
        paddingHorizontal: 6,
    },
    icon: {
        position: "absolute",
        right: 0,
    },
    btn: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e02e88",
        width: 200,
        height: 50,
        borderRadius: 50,
        marginHorizontal: "auto",
        position: "relative",
        top: 500,
    },
    btn: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e02e88",
        width: 200,
        height: 50,
        borderRadius: 50,
        marginHorizontal: "auto",
        marginTop: 400
    },


    otpinputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
    },
    otpInput: {
        width: 40,
        height: 40,
        backgroundColor: "#FFFFFF", // White background
        borderRadius: 25, // Fully rounded input
        borderWidth: 1,
        textAlign: "center", // Center the text
        fontSize: 18, // Adjust font size
        color: "#000000", // Text color
    },
    resentOtpCard: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    errorCard: {
        width: "100%",
    },
    errorMsg: {
        color: "red",
        fontSize: 14,
    },
});
