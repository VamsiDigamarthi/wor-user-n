import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
export default function SafetyHome() {

const navigation = useNavigation()    
  return (
    <ScrollView contentContainerStyle={{}}>

      <View style={[styles.parcelContainer]}>

        <View style={[styles.safetyImgContainer]}>
          <Image style={[styles.safetyImg, { width: "80%", margin: "auto" }]} resizeMode='contain' source={require('../../../assets/images/safetylock.png')} />
        </View>


      </View>


      <View style={[styles.menuContainer]}>
        <MenuHead icon={require('../../../assets/images/shield.png')} title="Safety and Privacy" text="Manage Account Security and Privacy" />
        <MenuItem text="Email Verification" onClick={()=>{navigation.navigate("EmailVerification")}}/>
        <MenuItem text="Mobile Verification" onClick={()=>{navigation.navigate("MobileVerification")}}/>

        <MenuHead icon={require('../../../assets/images/gear.png')} title="Ride Settings" text="Manage Your Ride Prefrences" />
        <MenuItem text="Ride Insurance"/>
        <MenuItem text="Donation"/>


        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={40} color="#e02e88" />
          <Text style={{fontWeight:"bold"}}>Logout</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}



function MenuHead({ icon, title, text }) {
  return <View style={[styles.menuHead]}>
    <Image resizeMode='contain' style={[styles.menuHeadImg]} source={icon} />
    <View>
      <Text style={[styles.menuHeading]}>{title}</Text>
      <Text style={[styles.menuPara]}>{text}</Text>

    </View>
  </View>
}


function MenuItem({ text, onClick }) {
  return <View style={[styles.menuItem, styles.fontsemibold]}><Text>
    {text}
  </Text>

    <TouchableOpacity style={[styles.btn]} onPress={onClick}>
      <Ionicons name="chevron-forward" size={24} color="#e02e88" />
    </TouchableOpacity>
  </View>
}


const styles = StyleSheet.create({
  parcelContainer: {
    padding: 24,
    backgroundColor: "#fff",

  },
  safetyImgContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical:10
  },
  safetyImg: {
    height: 220,
  },
  menuContainer: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical:20,
  },
  menuHead: {
    flexDirection: "row",
    gap: 16,
    alignItems:"center"
  },
  menuHeadImg: {
    height: 60,
    width: 60
  },
  menuHeading: {
    fontSize: 14,
    color: "black",
    fontWeight:"bold"
  },
  menuPara: {
    fontSize: 10,
    fontWeight:"semibold"
  },


  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#e02e88",
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingVertical:10,
    fontSize:14
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  fontsemibold:{
    fontWeight:800
  }
})