import { router } from "expo-router";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Survey {
  siteName: string;
  clientName: string;
  description: string;
  priority: string;
  date: string;
  photo: string | null;
  contact: string;
  location: string;
  notes: string;
}

export interface SurveyHistoryItem {
  id: string;
  site: string;
  client: string;
  description: string;
  priority: string;
  date: string;
  photo: string | null;
  contact: string;
  location: string;
  notes: string;
  submittedAt: string;
}

export interface UserProfile {
  name: string;
  course: string;
  enrollment: string;
  semester: string;
}

export interface SurveyContextType {
  survey: Survey;
  history: SurveyHistoryItem[];
  profile: UserProfile;
  updateSurvey: (updates: Partial<Survey>) => void;
  clearSurvey: () => Promise<void>;
  saveSurveyToHistory: () => boolean;
  submitSurvey: () => void;
  deleteSurveyFromHistory: (id: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const initialSurvey: Survey = {
  siteName: "",
  clientName: "",
  description: "",
  priority: "",
  date: "",
  photo: null,
  contact: "",
  location: "",
  notes: "",
};

const defaultProfile: UserProfile = {
  name: "Jilan Mansuri",
  course: "Computer Engineering",
  enrollment: "24CE001",
  semester: "1",
};

const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [survey, setSurvey] = useState<Survey>(initialSurvey);
  const [history, setHistory] = useState<SurveyHistoryItem[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("survey_history");
        const storedDraft = await AsyncStorage.getItem("survey_draft");
        const storedProfile = await AsyncStorage.getItem("user_profile");

        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
        if (storedDraft) {
          setSurvey(JSON.parse(storedDraft));
        }
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error("Error loading persisted survey data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPersistedData();
  }, []);

  const updateSurvey = (updates: Partial<Survey>) => {
    setSurvey((prev) => {
      const next = { ...prev, ...updates };
      AsyncStorage.setItem("survey_draft", JSON.stringify(next)).catch(console.error);
      return next;
    });
  };

  const clearSurvey = async () => {
    setSurvey(initialSurvey);
    await AsyncStorage.removeItem("survey_draft");
  };

  const saveSurveyToHistory = () => {
    if (
      !survey.siteName.trim() ||
      !survey.clientName.trim() ||
      !survey.priority.trim()
    ) {
      Alert.alert("Error", "Please fill all required fields.");
      return false;
    }

    const newSurvey: SurveyHistoryItem = {
      id: `${Date.now()}`,
      site: survey.siteName,
      client: survey.clientName,
      description: survey.description,
      priority: survey.priority,
      date: survey.date || new Date().toLocaleDateString(),
      photo: survey.photo,
      contact: survey.contact,
      location: survey.location,
      notes: survey.notes,
      submittedAt: new Date().toLocaleString(),
    };

    setHistory((prev) => {
      const next = [newSurvey, ...prev];
      AsyncStorage.setItem("survey_history", JSON.stringify(next)).catch(console.error);
      return next;
    });
    clearSurvey();
    return true;
  };

  const submitSurvey = () => {
    if (!saveSurveyToHistory()) {
      return;
    }

    Alert.alert("Success", "Survey Submitted Successfully");
    router.push("/(drawer)/(tabs)/history");
  };

  const deleteSurveyFromHistory = (id: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.id !== id);
      AsyncStorage.setItem("survey_history", JSON.stringify(next)).catch(console.error);
      return next;
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      AsyncStorage.setItem("user_profile", JSON.stringify(next)).catch(console.error);
      return next;
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#090d16" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SurveyContext.Provider
      value={{
        survey,
        history,
        profile,
        updateSurvey,
        clearSurvey,
        saveSurveyToHistory,
        submitSurvey,
        deleteSurveyFromHistory,
        updateProfile,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurveyContext must be used within a SurveyProvider");
  }
  return context;
};
