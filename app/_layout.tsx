import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { SurveyProvider } from "../contexts/survey-context";
import { Colors } from "../constants/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === "android") {
      const theme = colorScheme ?? "light";
      const colors = Colors[theme];
      // Set the system navigation bar background color to match the theme background
      NavigationBar.setBackgroundColorAsync(colors.background).catch((err) => {
        console.warn("Failed to set navigation bar background color:", err);
      });
      // Set the button icons to contrast properly with the background
      NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark").catch((err) => {
        console.warn("Failed to set navigation bar button style:", err);
      });
    }
  }, [colorScheme]);

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <SurveyProvider>
        <StatusBar style="auto" />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(drawer)"
            options={{ headerShown: false }}
          />
        </Stack>
      </SurveyProvider>
    </ThemeProvider>
  );
}