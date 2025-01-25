import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function TopCard({ title, subtitle, icon }) {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {icon}

        <View>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.subHeading}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </TouchableOpacity>

      {/* {open && <EditDelete />} */}
    </View>
  );
}

function EditDelete() {
  return (
    <View style={styles.editBox}>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: "#b0b0b0",
  },

  heading: {
    fontWeight: "bold",
  },

  subHeading: {
    fontWeight: "400",
  },
  editBox: {
    elevation: 1,
    backgroundColor: "red",
    position: "absolute",
    zIndex: 10,
    right: 15,
    padding: 10,
  },
});
