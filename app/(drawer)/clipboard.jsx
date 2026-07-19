import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import {
    Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme
} from "react-native";
import { useSurveyContext } from "../../contexts/survey-context";
import { Colors } from "../../constants/theme";

const ClipboardScreen = () => {
  const { survey, updateSurvey } = useSurveyContext();
  const surveyId = survey.surveyId || "SURVEY-2026-001";
  const contactNumber = survey.contact || "+91 9876543210";
  const currentLocation = survey.location || "23.0225, 72.5714";

  const [notes, setNotes] = useState(survey.notes);
  const [pastedNotes, setPastedNotes] = useState("");

  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  const copyText = async (text, message) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Success", message);
  };

  const pasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    setPastedNotes(text);
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");
    setPastedNotes("");
    Alert.alert("Success", "Clipboard Cleared");
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clipboard Demo</Text>

      {/* Copy Survey ID */}
      <Pressable
        style={styles.button}
        onPress={() =>
          copyText(surveyId, "Survey ID Copied Successfully")
        }
      >
        <Text style={styles.buttonText}>Copy Survey ID</Text>
      </Pressable>

      {/* Copy Contact Number */}
      <Pressable
        style={styles.button}
        onPress={() =>
          copyText(contactNumber, "Contact Number Copied")
        }
      >
        <Text style={styles.buttonText}>Copy Contact Number</Text>
      </Pressable>

      {/* Copy Current Location */}
      <Pressable
        style={styles.button}
        onPress={() =>
          copyText(currentLocation, "Current Location Copied")
        }
      >
        <Text style={styles.buttonText}>Copy Current Location</Text>
      </Pressable>

      {/* Notes */}
      <TextInput
        style={styles.input}
        placeholder="Write Notes..."
        placeholderTextColor={colors.textSecondary}
        value={notes}
        onChangeText={(value) => {
          setNotes(value);
          updateSurvey({ notes: value });
        }}
      />

      <Pressable
        style={styles.button}
        onPress={() => copyText(notes, "Notes Copied")}
      >
        <Text style={styles.buttonText}>Copy Notes</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={pasteNotes}
      >
        <Text style={styles.buttonText}>Paste Notes</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: colors.error, shadowColor: colors.error }]}
        onPress={clearClipboard}
      >
        <Text style={styles.buttonText}>Clear Clipboard</Text>
      </Pressable>

      <View style={styles.output}>
        <Text style={styles.label}>Pasted Notes:</Text>
        <Text style={styles.outputText}>
          {pastedNotes || "No Notes"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ClipboardScreen;

const getStyles = (colors) => StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: colors.text,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 15,
    marginVertical: 8,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: colors.buttonText,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    padding: 12,
    marginTop: 15,
    backgroundColor: colors.inputBg,
    color: colors.text,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  output: {
    marginTop: 25,
    padding: 15,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  label: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.text,
  },

  outputText: {
    marginTop: 8,
    fontSize: 15,
    color: colors.textSecondary,
  },
});