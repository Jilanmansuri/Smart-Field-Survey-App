import { router } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSurveyContext } from "../../../contexts/survey-context";
import { Colors } from "../../../constants/theme";

export default function Survey() {
    const { survey, updateSurvey } = useSurveyContext();
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const styles = getStyles(colors);

    // Auto-fill today's date if empty
    useEffect(() => {
        if (!survey.date) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            updateSurvey({ date: `${dd}-${mm}-${yyyy}` });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveSurvey = () => {
        if (
            survey.siteName.trim() === "" ||
            survey.clientName.trim() === "" ||
            survey.priority.trim() === ""
        ) {
            Alert.alert("Error", "Please fill all required fields.");
            return;
        }

        router.push("/(drawer)/preview");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.heading}>Create Survey</Text>

            <View style={styles.idContainer}>
                <Text style={styles.idLabel}>Survey ID: </Text>
                <Text style={styles.idValue}>{survey.surveyId}</Text>
            </View>

            <Text style={styles.label}>
                Site Name <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Site Name"
                placeholderTextColor={colors.textSecondary}
                value={survey.siteName}
                onChangeText={(value) => updateSurvey({ siteName: value })}
            />

            <Text style={styles.label}>
                Client Name <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Client Name"
                placeholderTextColor={colors.textSecondary}
                value={survey.clientName}
                onChangeText={(value) => updateSurvey({ clientName: value })}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                placeholder="Enter Description"
                placeholderTextColor={colors.textSecondary}
                value={survey.description}
                onChangeText={(value) => updateSurvey({ description: value })}
            />

            <Text style={styles.label}>
                Priority <Text style={{ color: colors.error }}>*</Text>
            </Text>
            
            <View style={styles.priorityContainer}>
                {["High", "Medium", "Low"].map((level) => (
                    <Pressable
                        key={level}
                        style={[
                            styles.priorityChip,
                            survey.priority === level && styles.activePriorityChip,
                            survey.priority === level && level === "High" && { backgroundColor: colors.error + "22", borderColor: colors.error },
                            survey.priority === level && level === "Medium" && { backgroundColor: colors.warning + "22", borderColor: colors.warning },
                            survey.priority === level && level === "Low" && { backgroundColor: colors.success + "22", borderColor: colors.success },
                        ]}
                        onPress={() => updateSurvey({ priority: level })}
                    >
                        <Text
                            style={[
                                styles.priorityChipText,
                                survey.priority === level
                                    ? (level === "High" ? { color: colors.error } : level === "Medium" ? { color: colors.warning } : { color: colors.success })
                                    : { color: colors.textSecondary }
                            ]}
                        >
                            {level}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.label}>Date</Text>
            <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                placeholderTextColor={colors.textSecondary}
                value={survey.date}
                onChangeText={(value) => updateSurvey({ date: value })}
            />

            {/* Attachment Status Cards */}
            <Text style={styles.sectionHeader}>Survey Attachments</Text>
            
            <View style={styles.attachmentCard}>
                <View style={styles.attachmentInfo}>
                    <Ionicons name="camera" size={24} color={survey.photo ? colors.success : colors.icon} />
                    <View style={styles.attachmentTexts}>
                        <Text style={styles.attachmentTitle}>Site Photo</Text>
                        <Text style={styles.attachmentValue} numberOfLines={1}>
                            {survey.photo ? "Photo Attached Successfully" : "No Photo Attached"}
                        </Text>
                    </View>
                </View>
                <Pressable
                    style={styles.attachmentAction}
                    onPress={() => router.push("/(drawer)/camera")}
                >
                    <Text style={styles.attachmentActionText}>
                        {survey.photo ? "Retake" : "Capture"}
                    </Text>
                </Pressable>
            </View>

            <View style={styles.attachmentCard}>
                <View style={styles.attachmentInfo}>
                    <Ionicons name="location" size={24} color={survey.location ? colors.success : colors.icon} />
                    <View style={styles.attachmentTexts}>
                        <Text style={styles.attachmentTitle}>GPS Coordinates</Text>
                        <Text style={styles.attachmentValue} numberOfLines={1}>
                            {survey.location || "No Coordinates Selected"}
                        </Text>
                    </View>
                </View>
                <Pressable
                    style={styles.attachmentAction}
                    onPress={() => router.push("/(drawer)/location")}
                >
                    <Text style={styles.attachmentActionText}>
                        {survey.location ? "Update" : "Acquire"}
                    </Text>
                </Pressable>
            </View>

            <View style={styles.attachmentCard}>
                <View style={styles.attachmentInfo}>
                    <Ionicons name="people" size={24} color={survey.contact ? colors.success : colors.icon} />
                    <View style={styles.attachmentTexts}>
                        <Text style={styles.attachmentTitle}>Site Contact</Text>
                        <Text style={styles.attachmentValue} numberOfLines={1}>
                            {survey.contact || "No Contact Person Linked"}
                        </Text>
                    </View>
                </View>
                <Pressable
                    style={styles.attachmentAction}
                    onPress={() => router.push("/(drawer)/contacts")}
                >
                    <Text style={styles.attachmentActionText}>
                        {survey.contact ? "Change" : "Link"}
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.button} onPress={saveSurvey}>
                <Text style={styles.buttonText}>Review & Save Survey</Text>
            </Pressable>
        </ScrollView>
    );
}

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 16,
        marginTop: 8,
        color: colors.text,
    },

    idContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 10,
    },

    idLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    idValue: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.primary,
    },

    label: {
        fontSize: 15,
        marginBottom: 6,
        marginTop: 12,
        color: colors.textSecondary,
        fontWeight: "600",
    },

    input: {
        borderWidth: 1,
        borderColor: colors.inputBorder,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: colors.inputBg,
        color: colors.text,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },

    priorityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },

    priorityChip: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingVertical: 12,
        marginHorizontal: 4,
        alignItems: "center",
        backgroundColor: colors.card,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },

    activePriorityChip: {
        borderColor: colors.primary,
    },

    priorityChipText: {
        fontWeight: "700",
        fontSize: 14,
    },

    sectionHeader: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
        marginTop: 24,
        marginBottom: 10,
    },

    attachmentCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },

    attachmentInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    attachmentTexts: {
        marginLeft: 12,
        flex: 1,
    },

    attachmentTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },

    attachmentValue: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },

    attachmentAction: {
        backgroundColor: colors.primary + "15",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
    },

    attachmentActionText: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.primary,
    },

    button: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        marginTop: 28,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },

    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "700",
    },
});