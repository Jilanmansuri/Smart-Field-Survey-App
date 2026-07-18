import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Field Survey App</Text>
      </View>

      {/* Welcome */}
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.name}>Jilan Mansuri</Text>

      {/* Student Details */}
      <View style={styles.studentCard}>
        <Text style={styles.studentText}>Enrollment : 24CE001</Text>
        <Text style={styles.studentText}>Course : Computer Engineering</Text>
        <Text style={styles.studentText}>Semester : 1</Text>
      </View>

      {/* Survey Count */}
      <View style={styles.countCard}>
        <Text style={styles.count}>12</Text>
        <Text style={styles.cardText}>Today's Survey</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.heading}>Quick Actions</Text>

      <View style={styles.grid}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/(tabs)/survey")}
        >
          <Text style={styles.cardText}>New Survey</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/camera")}
        >
          <Text style={styles.cardText}>Camera</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/location")}
        >
          <Text style={styles.cardText}>Location</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/contacts")}
        >
          <Text style={styles.cardText}>Contacts</Text>
        </Pressable>
      </View>

      {/* Recent Survey */}
      <Text style={styles.heading}>Recent Survey</Text>

      <View style={styles.recentCard}>
        <Text style={styles.recentText}>
          Site : ABC Construction
        </Text>

        <Text style={styles.recentText}>
          Client : Reliance Ltd.
        </Text>

        <Text style={styles.recentText}>
          Priority : High
        </Text>

        <Text style={styles.recentText}>
          Date : 18/07/2026
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    paddingHorizontal: 16,
  },

  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
    elevation: 6,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  welcome: {
    color: "#A5B4FC",
    fontSize: 15,
    marginBottom: 4,
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
  },

  studentCard: {
    backgroundColor: "#161B22",
    borderRadius: 15,
    padding: 15,
    marginBottom: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#2A2F38",
  },

  studentText: {
    color: "#E5E7EB",
    fontSize: 15,
    marginBottom: 6,
  },

  countCard: {
    backgroundColor: "#22C55E",
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },

  count: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  heading: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    height: 90,
    backgroundColor: "#161B22",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#2A2F38",
    elevation: 4,
  },

  cardText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  recentCard: {
    backgroundColor: "#161B22",
    borderRadius: 15,
    padding: 15,
    marginTop: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#2A2F38",
    elevation: 4,
  },

  recentText: {
    color: "#E5E7EB",
    fontSize: 15,
    marginBottom: 7,
  },
});