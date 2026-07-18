import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from "react-native";
import { router } from "expo-router";

export default function SurveyPreview() {

  const submitSurvey = () => {
    Alert.alert("Success", "Survey Submitted Successfully");
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.heading}>Survey Preview</Text>

      <Image
        source={{ uri: "https://picsum.photos/400/250" }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Site Name</Text>
        <Text style={styles.value}>ABC Construction</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Client Name</Text>
        <Text style={styles.value}>Reliance Ltd.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>High</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>9876543210</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>
          23.0225, 72.5714
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>
          Site inspection completed successfully.
        </Text>
      </View>

      <View style={styles.buttonContainer}>

        <Pressable
          style={[styles.button, styles.edit]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Edit Survey</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.submit]}
          onPress={submitSurvey}
        >
          <Text style={styles.buttonText}>Submit Survey</Text>
        </Pressable>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    padding: 16,
  },

  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#161B22",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2A2F38",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  value: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  button: {
    width: "48%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  edit: {
    backgroundColor: "#F59E0B",
  },

  submit: {
    backgroundColor: "#22C55E",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});