import { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View, TextInput, ScrollView, useColorScheme, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../../constants/theme";
import { useSurveyContext } from "../../../contexts/survey-context";

export default function Profile() {
  const { profile, updateProfile, history } = useSurveyContext();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [employeeId, setEmployeeId] = useState(profile.employeeId);
  const [department, setDepartment] = useState(profile.department);
  const [photo, setPhoto] = useState(profile.photo);

  // Sync state with loaded profile draft
  useEffect(() => {
    setName(profile.name);
    setRole(profile.role);
    setEmployeeId(profile.employeeId);
    setDepartment(profile.department);
    setPhoto(profile.photo);
  }, [profile]);

  const handleSave = () => {
    updateProfile({ name, role, employeeId, department, photo });
    setIsEditing(false);
  };

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required to select a photo.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image from library:", error);
      Alert.alert("Error", "Failed to select photo.");
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera permission is required to capture a photo.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo with camera:", error);
      Alert.alert("Error", "Failed to capture photo.");
    }
  };

  const selectImage = () => {
    Alert.alert(
      "Profile Photo",
      "Choose an option to update your profile photo",
      [
        {
          text: "Take Photo",
          onPress: takePhotoWithCamera,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImageFromLibrary,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
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
      <Pressable 
        onPress={isEditing ? selectImage : null} 
        style={({ pressed }) => [
          styles.imageContainer,
          isEditing && pressed && { opacity: 0.8 }
        ]}
        disabled={!isEditing}
      >
        <Image
          source={{ uri: photo || "https://i.pravatar.cc/150?img=12" }}
          style={styles.image}
        />
        {isEditing && (
          <View style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={18} color="#ffffff" />
          </View>
        )}
      </Pressable>

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
          placeholder="Role"
          placeholderTextColor={colors.textSecondary}
          value={role}
          onChangeText={setRole}
        />
      ) : (
        <Text style={styles.course}>{profile.role || "Lead Surveyor"}</Text>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>Employee ID</Text>
        {isEditing ? (
          <TextInput
            style={styles.cardInput}
            placeholder="Employee ID"
            placeholderTextColor={colors.textSecondary}
            value={employeeId}
            onChangeText={setEmployeeId}
          />
        ) : (
          <Text style={styles.value}>{profile.employeeId || "EMP-2026-042"}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Department</Text>
        {isEditing ? (
          <TextInput
            style={styles.cardInput}
            placeholder="Department"
            placeholderTextColor={colors.textSecondary}
            value={department}
            onChangeText={setDepartment}
          />
        ) : (
          <Text style={styles.value}>{profile.department || "Field Operations"}</Text>
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

  imageContainer: {
    position: "relative",
    marginTop: 20,
    marginBottom: 18,
  },

  image: {
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.background,
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