import React, { useState } from "react";
import {Alert,Pressable,StyleSheet,Text,TextInput,View,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const ClipboardScreen = () => {
  const surveyId = "SURVEY-2026-001";
  const contactNumber = "+91 9876543210";
  const currentLocation = "23.0225, 72.5714";

  const [notes, setNotes] = useState("");
  const [pastedNotes, setPastedNotes] = useState("");

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
    <View style={styles.container}>
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
        value={notes}
        onChangeText={setNotes}
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
        style={[styles.button, { backgroundColor: "red" }]}
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
    </View>
  );
};

export default ClipboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
  },

  output: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },

  label: {
    fontWeight: "bold",
    fontSize: 18,
  },

  outputText: {
    marginTop: 8,
    fontSize: 16,
    color: "#444",
  },
});