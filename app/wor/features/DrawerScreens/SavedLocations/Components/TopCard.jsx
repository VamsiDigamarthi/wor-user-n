import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { fonts } from "../../../../fonts/Fonts";
import EditDelete from "./EditDelete";

export default function TopCard({
  title,
  subtitle,
  icon,
  type = "ride",
  otherData,
  entireItem,
  editDeleteType,
}) {
  const [open, setOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>{icon}</View>

          {/* This View now contains only the text and 3 dots */}
          <View style={styles.textAndDotsContainer}>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.heading}
              >
                {title}
              </Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.subHeading}
              >
                {subtitle}
              </Text>
              {otherData?.map((e, index) => (
                <Text key={index} style={styles.subHeading}>
                  {e}
                </Text>
              ))}
            </View>

            {type == "ride" ? (
              <TouchableOpacity onPress={() => setOpen(true)}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <AntDesign name="hearto" size={24} color="#e02e88" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {open && (
          <EditDelete place={entireItem} editDeleteType={editDeleteType} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, // Adjust bottom margin for better spacing
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10, // Space between icon and text
  },
  // Added border and style here to apply only to text and 3 dots container
  textAndDotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    borderBottomWidth: 1,
    borderBottomColor: "#b0b0b0",
    paddingBottom: 8,
  },
  heading: {
    // fontWeight: "bold",
    fontFamily: fonts.robotoSemiBold,
  },
  subHeading: {
    // fontWeight: "400",
    fontFamily: fonts.robotoRegular,
  },
});
