import { View, Text, StyleSheet } from 'react-native'
import AntDesign from "@expo/vector-icons/AntDesign";

export default function FaqAnswerCard({question, answer}) {
    return (
      <View style={styles.FaqAnswerCard}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AntDesign name="questioncircleo" size={20} color="#e02e88" />
          <Text style={{ fontWeight: "bold" }}>
            {question}
          </Text>
        </View>
  
        <Text style={{ color: "#757575", marginTop: 10, textAlign: "justify" }}>
          {answer}
        </Text>
      </View>
    );
  }


  const styles = StyleSheet.create({
    FaqAnswerCard: {
        borderColor: "#FFE2E6",
        width: "100%",
        backgroundColor: "#FDFDFD",
        // flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
      },
  })