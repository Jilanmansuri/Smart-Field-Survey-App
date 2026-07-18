import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

export default function History() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [surveys, setSurveys] = useState([
    {
      id: "1",
      site: "ABC Construction",
      client: "Reliance Ltd.",
      priority: "High",
    },
    {
      id: "2",
      site: "XYZ Builders",
      client: "Tata Projects",
      priority: "Medium",
    },
    {
      id: "3",
      site: "Metro Station",
      client: "L&T",
      priority: "Low",
    },
    {
      id: "4",
      site: "Smart City",
      client: "Adani",
      priority: "High",
    },
  ]);

  const filteredData = surveys.filter((item) => {
    const matchSearch =
      item.site.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.priority === filter;

    return matchSearch && matchFilter;
  });

  const deleteSurvey = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setSurveys(surveys.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const viewSurvey = (item) => {
    Alert.alert(
      "Survey Details",
      `Site : ${item.site}
Client : ${item.client}
Priority : ${item.priority}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Survey History</Text>

      <TextInput
        placeholder="Search Survey..."
        placeholderTextColor="#999"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterContainer}>
        {["All", "High", "Medium", "Low"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text style={styles.filterText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.site}>{item.site}</Text>

            <Text style={styles.text}>
              Client : {item.client}
            </Text>

            <Text style={styles.text}>
              Priority : {item.priority}
            </Text>

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.viewBtn}
                onPress={() => viewSurvey(item)}
              >
                <Text style={styles.btnText}>View</Text>
              </Pressable>

              <Pressable
                style={styles.deleteBtn}
                onPress={() => deleteSurvey(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    padding: 15,
  },

  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  search: {
    backgroundColor: "#161B22",
    color: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  filterButton: {
    backgroundColor: "#1F2937",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  activeFilter: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#161B22",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  site: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  text: {
    color: "#ddd",
    fontSize: 15,
    marginBottom: 4,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  viewBtn: {
    backgroundColor: "#2563EB",
    width: "48%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteBtn: {
    backgroundColor: "#DC2626",
    width: "48%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});