import React, { useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View, } from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";

const ContactsScreen = () => {
    const [contactsList, setContactsList] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");

    const getContacts = async () => {
        setLoading(true);

        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Permission Denied", "Contacts permission required.");
            setLoading(false);
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });

        setContactsList(data);
        setFilteredContacts(data);
        setLoading(false);
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

    const copyNumber = async (number) => {
        if (!number) {
            Alert.alert("No Number", "This contact has no phone number.");
            return;
        }

        await Clipboard.setStringAsync(number);
        Alert.alert("Success", "Phone number copied!");
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
                    <Pressable
                        style={styles.copyButton}
                        onPress={() => copyNumber(phone)}
                    >
                        <Text style={styles.copyText}>Copy</Text>
                    </Pressable>
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
                value={search}
                onChangeText={handleSearch}
            />

            {loading && <ActivityIndicator size="large" />}

            {!loading && filteredContacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Contacts Found</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
        </View>
    );
};

export default ContactsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },

    heading: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },

    button: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    counter: {
        marginVertical: 15,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    avatarText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
    },

    phone: {
        color: "gray",
        marginTop: 5,
    },

    copyButton: {
        backgroundColor: "green",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },

    copyText: {
        color: "#fff",
        fontWeight: "bold",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 20,
        color: "gray",
    },
});