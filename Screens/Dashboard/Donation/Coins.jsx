import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { COLORS } from "../../../Constants/colors";
import CoinsTopCard from '../../../Components/Dashboard/DonationCom/Coins/CoinsTopCard';
import CoinSlider from '../../../Components/Dashboard/DonationCom/Coins/CoinSlider';
import ReedemCoins from '../../../Components/Dashboard/DonationCom/Coins/ReedemCoins';
import ReedemHistory from '../../../Components/Dashboard/DonationCom/Coins/ReedemHistory';

export default function Coins() {
    return (
        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <CoinsTopCard />
                <CoinSlider />
                <ReedemCoins />
                <ReedemHistory />
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bottomSheetBg,
        paddingHorizontal: 20
    }
})