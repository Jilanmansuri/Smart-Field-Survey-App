import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from "react-native";
import { useSurveyContext } from "../../contexts/survey-context";
import { Colors } from "../../constants/theme";

export default function SurveyPreview() {
  const { survey, submitSurvey } = useSurveyContext();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>

      <Text style={styles.heading}>Survey Preview</Text>

      <Image
        source={{ uri: survey.photo || "https://picsum.photos/400/250" }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Survey ID</Text>
        <Text style={styles.value}>{survey.surveyId || "SURVEY-2026-001"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Site Name</Text>
        <Text style={styles.value}>{survey.siteName || "ABC Construction"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Client Name</Text>
        <Text style={styles.value}>{survey.clientName || "Reliance Ltd."}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Priority</Text>
        <Text style={styles.value}>{survey.priority || "High"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>{survey.contact || "9876543210"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>
          {survey.location || "23.0225, 72.5714"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Notes</Text>
        <Text style={styles.value}>
          {survey.notes || "Site inspection completed successfully."}
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

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  button: {
    width: "48%",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  edit: {
    backgroundColor: colors.warning,
  },

  submit: {
    backgroundColor: colors.success,
  },

  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "700",
  },
});