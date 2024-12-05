import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native'
import Entypo from "@expo/vector-icons/Entypo";

export default function FaqBtnCard({ title, onclick }) {
    return (
      <View style={styles.FaqBtnCard}>
        <Text style={{ fontWeight: "bold", width: "80%" }}>
          {title}
        </Text>
        <TouchableOpacity onPress={onclick}>
          <Entypo name="chevron-right" size={30} color="#e02e88" />
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    FaqBtnCard: {
        borderColor: "#FFE2E6",
        // borderColor: "#e02e88",
        borderWidth: 1,
        borderRadius: 10,
        // height: 50,
        width: "100%",
        backgroundColor: "#FDFDFD",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 15,
      },
  })