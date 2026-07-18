import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/theme";
import { useSurveyContext } from "../../../contexts/survey-context";

export default function Dashboard() {
  const { history, profile } = useSurveyContext();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  // Get today's date string in DD-MM-YYYY format
  const getTodayString = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const todayStr = getTodayString();
  const todaysCount = history.filter((item) => item.date === todayStr).length;
  const recentSurvey = history.length > 0 ? history[0] : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Header Profile Row */}
      <View style={styles.profileRow}>
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.name}>{profile.name || "Jilan Mansuri"}</Text>
        </View>
        <Pressable onPress={() => router.push("/(drawer)/(tabs)/profile")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatarImage}
          />
        </Pressable>
      </View>

      {/* Main Brand Banner */}
      <View style={styles.brandHeader}>
        <Ionicons name="shield-checkmark" size={32} color={colors.buttonText} />
        <Text style={styles.headerTitle}>Smart Field Survey</Text>
        <Text style={styles.headerSubtitle}>Real-time site auditing & logs</Text>
      </View>

      {/* Stats Widget Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.success }]}>
          <Ionicons name="checkmark-done-circle" size={28} color={colors.buttonText} />
          <Text style={styles.statCount}>{todaysCount}</Text>
          <Text style={styles.statLabel}>Today&apos;s Surveys</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
          <Ionicons name="folder-open" size={28} color={colors.buttonText} />
          <Text style={styles.statCount}>{history.length}</Text>
          <Text style={styles.statLabel}>Total Saved</Text>
        </View>
      </View>

      {/* Student Details Card */}
      <Text style={styles.sectionHeading}>Auditor Profile</Text>
      <View style={styles.studentCard}>
        <View style={styles.infoRow}>
          <Ionicons name="card" size={20} color={colors.primary} />
          <Text style={styles.studentText}>Enrollment: {profile.enrollment || "24CE001"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="school" size={20} color={colors.primary} />
          <Text style={styles.studentText}>Course: {profile.course || "Computer Engineering"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color={colors.primary} />
          <Text style={styles.studentText}>Semester: Semester {profile.semester || "1"}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionHeading}>Quick Actions</Text>
      <View style={styles.grid}>
        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/(tabs)/survey")}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
            <Ionicons name="document-text" size={24} color={colors.primary} />
          </View>
          <Text style={styles.cardText}>New Survey</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/camera")}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.warning + "15" }]}>
            <Ionicons name="camera" size={24} color={colors.warning} />
          </View>
          <Text style={styles.cardText}>Camera</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/location")}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.success + "15" }]}>
            <Ionicons name="location" size={24} color={colors.success} />
          </View>
          <Text style={styles.cardText}>Location</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/(drawer)/contacts")}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.error + "15" }]}>
            <Ionicons name="people" size={24} color={colors.error} />
          </View>
          <Text style={styles.cardText}>Contacts</Text>
        </Pressable>
      </View>

      {/* Recent Survey */}
      <Text style={styles.sectionHeading}>Recent Activity</Text>
      <View style={styles.recentCard}>
        {recentSurvey ? (
          <View>
            <View style={styles.recentHeader}>
              <Text style={styles.recentSiteTitle}>{recentSurvey.site}</Text>
              <View
                style={[
                  styles.badge,
                  recentSurvey.priority === "High" && { backgroundColor: colors.error + "15" },
                  recentSurvey.priority === "Medium" && { backgroundColor: colors.warning + "15" },
                  recentSurvey.priority === "Low" && { backgroundColor: colors.success + "15" },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    recentSurvey.priority === "High" && { color: colors.error },
                    recentSurvey.priority === "Medium" && { color: colors.warning },
                    recentSurvey.priority === "Low" && { color: colors.success },
                  ]}
                >
                  {recentSurvey.priority}
                </Text>
              </View>
            </View>

            <Text style={styles.recentMetaText}>Client: {recentSurvey.client}</Text>
            <Text style={styles.recentMetaText}>Submitted: {recentSurvey.submittedAt || recentSurvey.date}</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>
            No surveys submitted yet. Tap &apos;New Survey&apos; to start auditing.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 18,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 35, // Requested 35px padding at the bottom
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  welcome: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 2,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  brandHeader: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  headerTitle: {
    color: colors.buttonText,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: colors.buttonText + "b0",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCount: {
    color: colors.buttonText,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 6,
  },
  statLabel: {
    color: colors.buttonText + "d0",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  sectionHeading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    marginTop: 6,
  },
  studentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  studentText: {
    color: colors.text,
    fontSize: 14,
    marginLeft: 12,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  recentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recentSiteTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  recentMetaText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginVertical: 2,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
});