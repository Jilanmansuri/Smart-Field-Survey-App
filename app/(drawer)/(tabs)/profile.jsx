import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.image}
      />

      <Text style={styles.name}>Jilan Mansuri</Text>
      <Text style={styles.course}>Computer Engineering</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Enrollment</Text>
        <Text style={styles.value}>24CE001</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Semester</Text>
        <Text style={styles.value}>1</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Today's Surveys</Text>
        <Text style={styles.value}>12</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    padding: 20,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#2563EB",
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  course: {
    color: "#A5B4FC",
    fontSize: 16,
    marginBottom: 25,
  },

  card: {
    width: "100%",
    backgroundColor: "#161B22",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2A2F38",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});