import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function FaqRatingCard() {
    return (
      <View style={[styles.FaqBtnCard]}>
        <Text style={{ color: "#2D2D2D" }}>was this article helpful ?</Text>
  
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TouchableOpacity>
            <SimpleLineIcons name="like" size={24} color="#E02E88" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="dislike" size={24} color="#E02E88" />
          </TouchableOpacity>
        </View>
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