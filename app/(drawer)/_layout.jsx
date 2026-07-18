import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#007AFF",
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