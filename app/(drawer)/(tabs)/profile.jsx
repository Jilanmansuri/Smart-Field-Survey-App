import { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View, TextInput, ScrollView, useColorScheme } from "react-native";
import { Colors } from "../../../constants/theme";
import { useSurveyContext } from "../../../contexts/survey-context";

export default function Profile() {
  const { profile, updateProfile, history } = useSurveyContext();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [course, setCourse] = useState(profile.course);
  const [enrollment, setEnrollment] = useState(profile.enrollment);
  const [semester, setSemester] = useState(profile.semester);

  // Sync state with loaded profile draft
  useEffect(() => {
    setName(profile.name);
    setCourse(profile.course);
    setEnrollment(profile.enrollment);
    setSemester(profile.semester);
  }, [profile]);

  const handleSave = () => {
    updateProfile({ name, course, enrollment, semester });
    setIsEditing(false);
  };

  const getTodayString = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const todayStr = getTodayString();
  const todaysCount = history.filter((item) => item.date === todayStr).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.image}
      />

      {isEditing ? (
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.name}>{profile.name || "Jilan Mansuri"}</Text>
      )}

      {isEditing ? (
        <TextInput
          style={[styles.input, { fontWeight: "normal", fontSize: 16 }]}
          placeholder="Course"
          placeholderTextColor={colors.textSecondary}
          value={course}
          onChangeText={setCourse}
        />
      ) : (
        <Text style={styles.course}>{profile.course || "Computer Engineering"}</Text>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Enrollment</Text>
        {isEditing ? (
          <TextInput
            style={styles.cardInput}
            placeholder="Enrollment"
            placeholderTextColor={colors.textSecondary}
            value={enrollment}
            onChangeText={setEnrollment}
          />
        ) : (
          <Text style={styles.value}>{profile.enrollment || "24CE001"}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Semester</Text>
        {isEditing ? (
          <TextInput
            style={styles.cardInput}
            placeholder="Semester"
            placeholderTextColor={colors.textSecondary}
            value={semester}
            onChangeText={setSemester}
          />
        ) : (
          <Text style={styles.value}>{profile.semester || "1"}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Today&apos;s Surveys</Text>
        <Text style={styles.value}>{todaysCount}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 50,
    backgroundColor: colors.background,
    minHeight: "100%",
  },

  image: {
    width: 126,
    height: 126,
    borderRadius: 63,
    marginTop: 20,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },

  course: {
    color: colors.primary,
    fontSize: 16,
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.inputBg,
    color: colors.text,
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "800",
  },

  cardInput: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.inputBg,
    color: colors.text,
    width: "100%",
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    width: "100%",
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
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
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },

  button: {
    width: "100%",
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: colors.buttonText,
    fontSize: 17,
    fontWeight: "700",
  },
});