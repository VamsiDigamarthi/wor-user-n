import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import steering from "../../../../assets/images/steering.png"
import { TouchableOpacity } from "react-native";

const ReedemCoins = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Reedem Coins</Text>
            
                <View style={styles.cardCont}>
                    <CoinSliderCard title="10% off Ride" btnText="500 coins"/>
                    <CoinSliderCard title="Exclusive Voucher" btnText="500 coins"/>
                </View>
                
        </View>
    );
};



function CoinSliderCard({title, btnText}) {
    return <View style={styles.coinCard}>

        <View style={{ alignItems: "center" }}>
            <Image source={steering} style={{ height: 80, width: 80, resizeMode:"contain" }} />
        </View>

        <View style={{gap:10}}>
            <Text>
                {title}
            </Text>
            <TouchableOpacity
                style={styles.coinBtn}
            >
                <Text style={styles.btnText}>
                    {btnText}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
}






export default ReedemCoins;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 10,
        height:250
    },
    mainText: {
        fontSize: 20,
        fontWeight: "600",
        borderBottomColor: "#ffe2e6",
        borderBottomWidth: 2,
    },
    coinCard: {
        backgroundColor: "#FDFDFD",
        height: 200,
        width: "100%",
        borderRadius: 20,
        flex: 1,
        padding: 10,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        gap:10
    },
    coinBtn: {
        backgroundColor: "#e02e88",
        padding: 8,
        borderRadius: 10,
        width:150,
        margin:"auto"
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
    },

    cardCont:{
        height:250,
        flexDirection:"row"
    }
});
