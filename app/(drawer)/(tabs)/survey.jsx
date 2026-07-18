import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";

export default function Survey() {
    const [siteName, setSiteName] = useState("");
    const [clientName, setClientName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [date, setDate] = useState("");

    const saveSurvey = () => {
        if (
            siteName.trim() === "" ||
            clientName.trim() === "" ||
            priority.trim() === ""
        ) {
            Alert.alert("Error", "Please fill all required fields.");
            return;
        }

        Alert.alert("Success", "Survey Saved Successfully");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Create Survey</Text>

            <Text style={styles.label}>
                Site Name <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Site Name"
                placeholderTextColor="#bbb"
                value={siteName}
                onChangeText={setSiteName}
            />

            <Text style={styles.label}>
                Client Name <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Client Name"
                placeholderTextColor="#bbb"
                value={clientName}
                onChangeText={setClientName}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                placeholder="Enter Description"
                placeholderTextColor="#bbb"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>
                Priority <Text style={{ color: "red" }}>*</Text>
            </Text>

            <TextInput
                style={styles.input}
                placeholder="High / Medium / Low"
                placeholderTextColor="#bbb"
                value={priority}
                onChangeText={setPriority}
            />

            <Text style={styles.label}>Date</Text>
            <TextInput
                type="date"
                style={styles.input}
                placeholder="18-07-2026"
                placeholderTextColor="#bbb"
                value={date}
                onChangeText={setDate}
            />

            <Pressable style={styles.button} onPress={saveSurvey}>
                <Text style={styles.buttonText}>Save Survey</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#121212",
    },

    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
        color: "#fff",
    },

    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
        color: "#fff",
    },

    input: {
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#1E1E1E",
        color: "#fff",
    },

    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        marginTop: 25,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});