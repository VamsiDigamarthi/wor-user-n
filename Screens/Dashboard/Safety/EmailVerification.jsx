import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For checkbox icons
import CustomBtn from '../../../Utils/CustomBtn/CustomBtn';

export default function EmailVerification() {

    const [verified, Setverified] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confPassword , setConfPassword] = useState('');

    // Error states for validation
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPasswordError, setConfPasswordError] = useState('');

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

   
    const validatePassword = (password) => {
        // Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
        } else {
            setPasswordError('');
        }
    };
    

    const validateConfPassword = (confPassword) => {
        if (confPassword !== password) {
            setConfPasswordError('Passwords do not match');
        } else {
            setConfPasswordError('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={style.mainContainer}>

                    {!verified && <>
                        <View style={[style.inputContainer]}>
                            <TextInput 
                                value={email} 
                                onChangeText={(text) => {
                                    setEmail(text);
                                    validateEmail(text);
                                }} 
                                style={[style.input]} 
                                placeholder='Enter Mail ID' 
                                placeholderTextColor="black" 
                            />
                            <Ionicons name="mail" size={24} color="#e02e88" style={style.icon} />
                            {emailError ? <Text style={style.errorText}>{emailError}</Text> : null}
                        </View>
                        <View style={{marginTop: 500}}>
                            <CustomBtn 
                                borderWidth={1} 
                                title="Continue" 
                                btnBg={email && !emailError ? "#e02e88" : "#fff"} 
                                btnColor={email && !emailError ? "#fff" : "#000"} 
                                borderColor="#e02e88" 
                            />
                        </View>
                    </>}

                    {verified && <>
                        <View style={[style.inputContainer, { gap: 20 }]}>
                            <TextInput
                                style={[style.input]}
                                placeholder='Password'
                                placeholderTextColor="black"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    validatePassword(text);
                                }}
                            />
                            {passwordError ? <Text style={style.errorText}>{passwordError}</Text> : null}
                            <TextInput
                                style={[style.input]}
                                placeholder='Confirm Password'
                                placeholderTextColor="black"
                                secureTextEntry={!showPassword}
                                value={confPassword}
                                onChangeText={(text) => {
                                    setConfPassword(text);
                                    validateConfPassword(text);
                                }}
                            />
                            {confPasswordError ? <Text style={style.errorText}>{confPasswordError}</Text> : null}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <MaterialCommunityIcons
                                        name={showPassword ? "checkbox-marked" : "checkbox-blank-outline"}
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 8 }}>
                                    Show Password
                                </Text>
                            </View>
                        </View>

                        <View style={{marginTop: 390}}>
                            <CustomBtn 
                                borderWidth={1} 
                                title="Continue" 
                                btnBg={(password && confPassword && !passwordError && !confPasswordError && password === confPassword) ? "#e02e88" : "#fff"} 
                                btnColor={(password && confPassword && !passwordError && !confPasswordError && password === confPassword) ? "#fff" : "#000"} 
                                borderColor="#e02e88"
                            />
                        </View>
                    </>}
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
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
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
        marginTop: 400,
    }
});
