import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Alert, Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";
import { useSurveyContext } from "../../contexts/survey-context";

function CustomDrawerContent(props) {
  const { profile } = useSurveyContext();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  const activeRouteName = props.state.routes[props.state.index].name;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* Header Profile Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: profile.photo || "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{profile.name || "Jilan Mansuri"}</Text>
          <Text style={styles.role}>{profile.role || "Lead Surveyor"}</Text>
          <Text style={styles.empId}>{profile.employeeId || "EMP-2026-042"}</Text>
        </View>
      </View>

      {/* Group 1: Main Menu */}
      <Text style={styles.sectionHeader}>MAIN MENU</Text>
      
      <DrawerItem
        label="Dashboard"
        focused={activeRouteName === "(tabs)"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        activeBackgroundColor={colors.primary + "15"}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("(tabs)")}
      />

      <DrawerItem
        label="Survey Preview"
        focused={activeRouteName === "preview"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        activeBackgroundColor={colors.primary + "15"}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="eye" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("preview")}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Group 2: Field Captures */}
      <Text style={styles.sectionHeader}>FIELD CAPTURES</Text>

      <DrawerItem
        label="Camera"
        focused={activeRouteName === "camera"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        activeBackgroundColor={colors.primary + "15"}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="camera" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("camera")}
      />

      <DrawerItem
        label="GPS Location"
        focused={activeRouteName === "location"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        activeBackgroundColor={colors.primary + "15"}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="location" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("location")}
      />

      <DrawerItem
        label="Site Contacts"
        focused={activeRouteName === "contacts"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        activeBackgroundColor={colors.primary + "15"}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("contacts")}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Group 3: Utilities */}
      <Text style={styles.sectionHeader}>UTILITIES</Text>

      <DrawerItem
        label="Field Clipboard"
        focused={activeRouteName === "clipboard"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        activeBackgroundColor={colors.primary + "15"}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="copy" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("clipboard")}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Group 4: Operations (New Section) */}
      <Text style={styles.sectionHeader}>OPERATIONS</Text>

      <DrawerItem
        label="Sync Offline Logs"
        focused={false}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="cloud-upload" size={size} color={color} />
        )}
        onPress={() => {
          Alert.alert("Sync Success", "All local survey drafts and logs synced to servers successfully.");
        }}
      />

      <DrawerItem
        label="Help & Support"
        focused={false}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textSecondary}
        labelStyle={styles.labelStyle}
        icon={({ color, size }) => (
          <Ionicons name="help-circle" size={size} color={color} />
        )}
        onPress={() => {
          Alert.alert("Help & Support", "For support, email: support@smartfield.com\nPhone: +1 (800) 555-0199");
        }}
      />

      {/* Footer Details */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Smart Field Survey</Text>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
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
      {/* Drawer screens configurations */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="camera"
        options={{
          title: "Camera Capture",
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          title: "GPS Location",
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          title: "Contacts Link",
        }}
      />
      <Drawer.Screen
        name="clipboard"
        options={{
          title: "Clipboard Notes",
        }}
      />
      <Drawer.Screen
        name="preview"
        options={{
          title: "Survey Preview",
        }}
      />
    </Drawer>
  );
}

const getStyles = (colors) => StyleSheet.create({
  drawerContainer: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  role: {
    color: "#ffffffd0",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 1,
  },
  empId: {
    color: "#ffffff80",
    fontSize: 10,
    fontWeight: "500",
    marginTop: 1,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.textSecondary,
    marginLeft: 18,
    marginTop: 15,
    marginBottom: 5,
    letterSpacing: 1,
  },
  labelStyle: {
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 18,
    marginVertical: 10,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
    marginHorizontal: 18,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  versionText: {
    fontSize: 10,
    color: colors.textSecondary + "90",
    marginTop: 3,
  },
});