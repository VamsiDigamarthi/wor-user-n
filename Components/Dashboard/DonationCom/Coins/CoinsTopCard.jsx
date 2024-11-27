import { View, Text, StyleSheet, Image } from 'react-native'
import coin from "../../../../assets/images/coin.png"
import CustomBtn from '../../../../Utils/CustomBtn/CustomBtn'

export default function CoinsTopCard() {
    return (
        <View style={styles.container}>
            <View style={styles.leftCard}>
                <Text style={styles.leftHeading}>Your Rewards</Text>
                <Text style={styles.leftSubHeading}>start earning by Reffering your friend and redeem to your wallet</Text>
            </View>



            <View style={styles.rightCard}>


                <Text style={styles.rightHeading}>Your Rewards</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Image source={coin} style={{ height: 40, width: 40 }} resizeMode='contain' />
                    <Text style={styles.rightHeading}>1250 Coins</Text>
                </View>

                <View style={{ borderWidth: 1, width: "100%", borderColor: "#e02e88" }}></View>


                <CustomBtn
                    title="Reedem Now"
                    btnBg="#e02e88" btnColor="#fff"
                />

            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#FFE2E6",
        marginTop: 10,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        width: "100%"
    },

    leftHeading: {
        fontSize: 18,
        fontWeight: "bold"
    },

    leftSubHeading: {
        fontSize: 12,
    },

    leftCard: {
        width: "45%",
        flex: 1
    },

    rightCard: {
        width: "45%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#FFE2E6",
        padding: 20,
        flex: 1,
        justifyContent: "space-between",
        gap: 5

    },

    rightHeading: {
        fontSize: 12,
        fontWeight: "bold"
    },

   
})