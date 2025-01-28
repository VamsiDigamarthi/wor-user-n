import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useState } from "react";

export default function TopCard({
  title,
  subtitle,
  icon,
  type = "ride",
  otherData,
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
              <Text style={styles.heading}>{title}</Text>
              <Text style={styles.subHeading}>{subtitle}</Text>
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
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {open && <EditDelete />}
      </View>
    </TouchableWithoutFeedback>
  );
}

function EditDelete({ editPress, deletePress }) {
  return (
    <View style={styles.editBox}>
      <TouchableOpacity style={styles.editDeleteButton} onPress={editPress}>
        <FontAwesome name="pencil-square-o" size={20} color="green" />
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editDeleteButton} onPress={deletePress}>
        <MaterialIcons name="delete-outline" size={20} color="red" />
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
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
    fontWeight: "bold",
  },
  subHeading: {
    fontWeight: "400",
  },
  editBox: {
    position: "absolute",
    top: 10,
    right: 9,
    backgroundColor: "#f5f5f5",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    elevation: 1,
    zIndex: 10,
  },
  editDeleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5, // Space between icon and text
  },
});
