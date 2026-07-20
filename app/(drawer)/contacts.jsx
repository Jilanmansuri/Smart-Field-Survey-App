import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, Pressable, RefreshControl, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";
import { useSurveyContext } from "../../contexts/survey-context";

const ContactsScreen = () => {
    const [contactsList, setContactsList] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const { updateSurvey } = useSurveyContext();

    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const styles = getStyles(colors);

    const isMobileNative = Platform.OS === "android" || Platform.OS === "ios";

    const getContacts = async () => {
        setLoading(true);

        if (!isMobileNative) {
            // Mock contact list for Web and other non-native platforms
            const mockData = [
                { id: "1", name: "rock", phoneNumbers: [{ number: "+1 (555) 0199", id: "p1" }] },
                { id: "2", name: "Jilan Mansuri", phoneNumbers: [{ number: "+1 (555) 0142", id: "p2" }] },
                { id: "3", name: "Apollo Field Supervisor", phoneNumbers: [{ number: "+1 (555) 0188", id: "p3" }] },
            ];
            setContactsList(mockData);
            setFilteredContacts(mockData);
            setLoading(false);
            return;
        }

        try {
            const ContactsModule = await import("expo-contacts");
            const { status } = await ContactsModule.requestPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Permission Denied", "Contacts permission required.");
                setLoading(false);
                return;
            }

            const { data } = await ContactsModule.getContactsAsync({
                fields: [ContactsModule.Fields.PhoneNumbers],
            });

            setContactsList(data || []);
            setFilteredContacts(data || []);
        } catch (error) {
            console.error("Contacts error:", error);
            Alert.alert("Permission Error", "Unable to fetch contacts. Please grant Contacts permission in Mobile Settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearch(text);

        const filtered = contactsList.filter((contact) =>
            contact.name?.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredContacts(filtered);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getContacts();
        setRefreshing(false);
    };

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const copyNumber = async (number) => {
        if (!number) {
            Alert.alert("No Number", "This contact has no phone number.");
            return;
        }

        await Clipboard.setStringAsync(number);
        Alert.alert("Success", "Phone number copied to clipboard!");
    };

    const selectContact = (number) => {
        if (!number) {
            Alert.alert("No Number", "This contact has no phone number.");
            return;
        }

        updateSurvey({ contact: number });
        Alert.alert("Success", "Contact linked to survey draft!");
        router.push("/(drawer)/(tabs)/survey");
    };

    const renderItem = ({ item }) => {
        const phone =
            item.phoneNumbers?.length > 0
                ? item.phoneNumbers[0].number
                : null;

        return (
            <View style={styles.card}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {item.name ? item.name.charAt(0).toUpperCase() : "?"}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>

                    <Text style={styles.phone}>
                        {phone ? phone : "No Number"}
                    </Text>
                </View>

                {phone && (
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Pressable
                            style={styles.copyButton}
                            onPress={() => selectContact(phone)}
                        >
                            <Text style={styles.copyText}>Link</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.copyButton, { backgroundColor: colors.icon }]}
                            onPress={() => copyNumber(phone)}
                        >
                            <Text style={styles.copyText}>Copy</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Contacts</Text>

            <Pressable style={styles.button} onPress={getContacts}>
                <Text style={styles.buttonText}>Get Contacts</Text>
            </Pressable>

            <Text style={styles.counter}>
                Total Contacts : {filteredContacts.length}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Search Contacts..."
                placeholderTextColor={colors.textSecondary}
                value={search}
                onChangeText={handleSearch}
            />

            {loading && <ActivityIndicator size="large" color={colors.primary} />}

            {!loading && filteredContacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Contacts Found</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }
                />
            )}
        </View>
    );
};

export default ContactsScreen;

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },

    heading: {
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 15,
        color: colors.text,
    },

    button: {
        backgroundColor: colors.primary,
        padding: 13,
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

    counter: {
        marginVertical: 15,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        color: colors.textSecondary,
    },

    input: {
        borderWidth: 1,
        borderColor: colors.inputBorder,
        borderRadius: 14,
        padding: 12,
        marginBottom: 15,
        backgroundColor: colors.inputBg,
        color: colors.text,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        padding: 14,
        marginBottom: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    avatarText: {
        color: colors.buttonText,
        fontSize: 20,
        fontWeight: "700",
    },

    name: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.text,
    },

    phone: {
        color: colors.textSecondary,
        marginTop: 5,
    },

    copyButton: {
        backgroundColor: colors.success,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },

    copyText: {
        color: colors.buttonText,
        fontWeight: "700",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 18,
        color: colors.textSecondary,
    },
});