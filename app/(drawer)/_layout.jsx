import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";

export default function DrawerLayout() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerLabelStyle: {
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      {/* Bottom Tabs */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="camera"
        options={{
          title: "Camera",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="location"
        options={{
          title: "Location",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="contacts"
        options={{
          title: "Contacts",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="clipboard"
        options={{
          title: "Clipboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="copy" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="preview"
        options={{
          title: "Preview",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="eye" size={size} color={color} />
          ),
        }}
      />

    </Drawer>
  );
}